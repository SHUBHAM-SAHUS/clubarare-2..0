/* eslint-disable react-hooks/exhaustive-deps */
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import Caver from 'caver-js'
import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { useAccount, useConnect, useDisconnect, useNetwork, useSignMessage, useSigner, useSwitchNetwork } from 'wagmi'

import {
  CLUBRARE_NETWORKS,
  DEFAULT_CHAIN_IDS,
  DEFAULT_ETHEREUM_CHAIN_ID,
  DEFAULT_KLAYTN_CHAIN_ID,
  IS_SOCIAL_AUTH_ENABLED,
  checkAccessToken,
  checkOpenloginEmail,
  logInfo,
  parseJwt,
  saveAccessToken,
} from 'utils'
import { VerifySignaturePayload, useAuthentication } from 'hooks/api/useAuthentication'
import { getGlobalStore, useGlobalState } from 'hooks/store/useGlobalState'
import { useKaikas } from 'hooks/useKaikas'
import { useToggle } from 'hooks/useToggle'

export interface ConnectorContextState {
  connect: (connectorName: WalletTypes) => void
  disconnect: () => Promise<void>
  changeChain: (chainId: SupportedChainIds) => Promise<void>

  chainId: SupportedChainIds
  address: string
  unsupportedChain: boolean

  provider: JsonRpcProvider | Caver
  signer: JsonRpcSigner

  isReady: boolean
  isLocked: boolean
  isSigned: boolean
  isEthereum: boolean
}

export const ConnectorContext = createContext<ConnectorContextState>({} as ConnectorContextState)

export const useConnector = () => useContext(ConnectorContext)

export const ConnectorProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isReady, , , ready, unReady] = useToggle(false)
  const [isLocked, , , lock, unlock] = useToggle(false)

  const { data: signer_ } = useSigner() as Modify<ReturnType<typeof useSigner>, { data?: JsonRpcSigner }>
  const { connectors, connectAsync } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const { signMessageAsync } = useSignMessage()
  const { chain: { id: chainId_, unsupported: unsupportedChain = false } = {} } = useNetwork()
  const { address: address_ } = useAccount()
  const { switchNetworkAsync } = useSwitchNetwork()
  const {
    state: kaikasState,
    onConnect: connectKaikasWallet,
    onSign: signKaikasWallet,
    onDisconnect: disconnectKaikasWallet,
  } = useKaikas()

  const { getWalletNonceAsync, verifySignatureAsync } = useAuthentication()
  const { connector, setConnector, authUser, setAuthUser, setAccessToken, clear } = useGlobalState()

  const ref = useRef(
    {} as {
      authUser: UserObject
      klaytn: {
        address: string
        provider: Caver
        chainId: SupportedChainIds
      }
      metamask: {
        address: string
        provider?: JsonRpcProvider
        chainId: SupportedChainIds
        switchNetworkAsync: typeof switchNetworkAsync
      }
      connector: WalletTypes
      signer: typeof signer_
    }
  )

  ref.current.connector = connector as WalletTypes
  ref.current.authUser = authUser as UserObject
  ref.current.signer = signer_
  ref.current.klaytn = {
    address: kaikasState.account!,
    chainId: kaikasState.network! ?? DEFAULT_KLAYTN_CHAIN_ID,
    provider: kaikasState.provider!,
  }
  ref.current.metamask = {
    address: address_!,
    chainId: (chainId_ as SupportedChainIds) ?? DEFAULT_ETHEREUM_CHAIN_ID,
    provider: undefined,
    switchNetworkAsync,
  }

  const isEthereum = useMemo(() => chainId_ === DEFAULT_ETHEREUM_CHAIN_ID, [chainId_])

  const connect = useCallback(async (connector_: WalletTypes) => {
    try {
      lock()
      await activateConnector(connector_)
      await signMessage(connector_)
    } catch (error) {
      console.error('Connecting wallet error: ', error)
    } finally {
      unlock()
    }
  }, [])

  const disconnect = useCallback(async () => {
    try {
      reset()
      switch (ref.current.connector) {
        case 'KAIKAS':
          disconnectKaikasWallet()
          break
        default:
          await disconnectAsync()
          break
      }
    } catch (error) {
      console.error('Disconnecting connector failed', error)
    }
  }, [])

  const activateConnector = useCallback(
    async (connector_: WalletTypes) => {
      const _chainId = DEFAULT_CHAIN_IDS[connector_]
      logInfo('App', `Activating connector ${connector_} on chain ${_chainId}`)

      try {
        switch (connector_) {
          case 'KAIKAS': {
            const res = await connectKaikasWallet()
            ref.current.klaytn.chainId = _chainId
            ref.current.klaytn.address = res.account
            ref.current.klaytn.provider = res.provider
            break
          }
          default: {
            const _connector = connector_ === 'WEB3-AUTH' ? connectors[1] : connectors[0]

            const resp = await connectAsync({
              chainId: _chainId,
              connector: _connector,
            })

            ref.current.metamask.chainId = _chainId
            ref.current.metamask.address = resp.account
            ref.current.metamask.provider = resp.provider as JsonRpcProvider
            break
          }
        }
      } catch (error) {
        console.error('Activating connector error: ', error)
        logInfo('Already Connected')
      }

      setConnector(connector_)
      ref.current.connector = connector_
    },
    [connectors]
  )

  const signWithWallet = useCallback((connector: WalletTypes, message: string) => {
    if (connector === 'KAIKAS') {
      return signKaikasWallet({ account: ref.current.klaytn.address, message, provider: ref.current.klaytn.provider })
    }
    return signMessageAsync({ message })
  }, [])

  const signMessage = useCallback(async (connector: WalletTypes) => {
    const networkId = getNetworkId(connector)

    const walletAddress = connector === 'KAIKAS' ? ref.current.klaytn.address : ref.current.metamask.address
    if (!walletAddress) throw 'Wallet is not provided'

    const { status, data: nonce } = await getWalletNonceAsync({
      networkId,
      walletAddress,
    })
    if (!status) throw `Unable to get nonce for "${walletAddress}"`

    const signature = await signWithWallet(connector, nonce)
    if (!signature) throw `Unable to get signature`

    const payload: VerifySignaturePayload = {
      networkId,
      nonce,
      signature,
      wallet_type: getConnectorName(connector),
    }

    if (connector === 'WEB3-AUTH') {
      payload.email = checkOpenloginEmail()
    }

    const { status: authStatus, data: auth } = await verifySignatureAsync(payload)
    if (!authStatus || !auth?.token) throw `Invalid signature`

    setAuthUser(auth.user)
    setAccessToken(auth.token)
    saveAccessToken(auth.token)
  }, [])

  const changeChain = useCallback(async (chainId: SupportedChainIds) => {
    try {
      lock()
      await ref.current.metamask.switchNetworkAsync?.(chainId)
    } catch (error) {
      console.error('Changing network error: ', error)
    } finally {
      unlock()
    }
  }, [])

  const reset = useCallback(() => {
    unReady()
    clear()
  }, [])

  const bootstrapConnector = useCallback(
    (connector_: WalletTypes) =>
      new Promise<void>(async (resolve, reject) => {
        try {
          await activateConnector(connector_)
          return resolve()
        } catch (error) {
          return reject('Bootstrapping connector failed')
        }
      }),
    []
  )

  const bootstrapSignature = useCallback(
    (connector_: WalletTypes) =>
      new Promise<void>(async (resolve, reject) => {
        try {
          const authUser_ = ref.current.authUser
          if (authUser_) {
            return resolve()
          }

          await signMessage(connector_)
        } catch (error) {
          return reject('Bootstrapping signer failed')
        }
      }),
    []
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (!IS_SOCIAL_AUTH_ENABLED && !window.ethereum && !window.klaytn) {
      logInfo('App', 'No wallet extensions')
      return
    }
    const { connector: connector_ } = getGlobalStore()

    if (!connector_ || !validateConnector(connector_)) {
      logInfo('App', 'User needs to connect wallet on UI')
      return
    }

    const accessToken = checkAccessToken()
    // const accessToken = getGlobalStore().accessToken
    if (!accessToken) return

    const payload = parseJwt(accessToken)
    const expiredAt = Number(payload.exp) * 1000
    // if access token is expired, then force to disconnect wallet
    if (expiredAt < Date.now()) disconnect()

    Promise.resolve()
      .then(() => logInfo('App', 'bootstrapping...'))
      .then(() => bootstrapConnector(connector_))
      .then(() => bootstrapSignature(connector_))
      .catch(console.error)
      .finally(() => {
        logInfo('App', 'bootstrap finished ✔')
        ready()
      })
  }, [])

  useEffect(() => {
    const ethereum = (window as any)?.ethereum
    if (typeof ethereum === 'undefined') return
    ethereum.on('accountsChanged', reset)
  }, [])

  useEffect(() => {
    const klaytn = (window as any)?.klaytn
    if (typeof klaytn === 'undefined') return
    klaytn.on('accountsChanged', reset)
  }, [])

  const values = useMemo(() => {
    return getConnectorState(ref.current.connector, {
      klaytn: ref.current.klaytn,
      metamask: ref.current.metamask,
    })
  }, [ref.current.connector, ref.current.klaytn, ref.current.metamask])

  return (
    <ConnectorContext.Provider
      value={{
        address: values.address,
        chainId: values.chainId,
        changeChain,
        connect,
        disconnect,
        isLocked,
        isReady,
        isSigned: !!authUser,
        provider: values.provider!,
        signer: signer_!,
        unsupportedChain,
        isEthereum,
      }}
    >
      {children}
    </ConnectorContext.Provider>
  )
}

const validateConnector = (connector: string): boolean => {
  return !!connector && ['METAMASK', 'KAIKAS', 'METAMASK-KAIKAS', 'WEB3-AUTH'].includes(connector)
}

const getNetworkId = (connector: WalletTypes) => {
  switch (connector) {
    case 'KAIKAS':
    case 'METAMASK-KAIKAS':
      return CLUBRARE_NETWORKS.KLAYTN

    default:
      return CLUBRARE_NETWORKS.ETHEREUM
  }
}

const getConnectorState = (connector: WalletTypes, { klaytn, metamask }: AnyObject) => {
  switch (connector) {
    case 'KAIKAS':
      return klaytn
    default:
      return metamask
  }
}

const getConnectorName = (connector: WalletTypes) => {
  switch (connector) {
    case 'KAIKAS':
      return 'KAIKAS'
    default:
      return 'METAMASK'
  }
}
