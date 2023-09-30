/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'
import Caver from 'caver-js'

import { useKaikasState } from './store/useKaikasState'

import { DEFAULT_KLAYTN_CHAIN_ID, convertToHex } from 'utils'

const initialState = {
  provider: undefined,
  account: '',
  network: undefined,
}

export const useKaikas = () => {
  const { setState, ...state } = useKaikasState()

  // Connect Kaikas wallet
  const handleConnect = useCallback(async () => {
    if (typeof window === 'undefined') throw new Error('Window not found')
    if (!DEFAULT_KLAYTN_CHAIN_ID) throw new Error('Chain not found')

    if ((window as any).klaytn.networkVersion !== DEFAULT_KLAYTN_CHAIN_ID) {
      const chainId = convertToHex(DEFAULT_KLAYTN_CHAIN_ID)
      try {
        await (window as any).klaytn.request({
          method: 'wallet_switchKlaytnChain',
          params: [
            {
              chainId: chainId,
            },
          ],
        })
      } catch (error) {
        throw new Error('Kaikas - Unsupported network')
      }
    }

    const accounts = await (window as any).klaytn.enable()
    if (!accounts?.length) {
      throw new Error('Kaikas - No account')
    }

    const account = accounts[0]
    const provider = new Caver((window as any).klaytn)
    const network = DEFAULT_KLAYTN_CHAIN_ID
    setState({
      provider,
      account,
      network,
    })

    return { account, provider, network }
  }, [])

  // Sign with Kaikas wallet
  const handleSign = useCallback(
    async ({ provider, message, account }: { provider: Caver; message: string; account: string }) => {
      if (!provider?.klay) {
        throw new Error('Kaikas - No provider')
      }
      return provider.klay.sign(message, account)
    },
    []
  )

  const handleDisconnect = useCallback(() => {
    setState(initialState)
  }, [])

  return {
    state,
    onConnect: handleConnect,
    onSign: handleSign,
    onDisconnect: handleDisconnect,
  }
}
