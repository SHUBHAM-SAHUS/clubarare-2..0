import { providers } from 'ethers'
import { Bytes, getAddress, hexValue } from 'ethers/lib/utils'
import { Connector } from 'wagmi'

import { baobab, cypress } from './kaikas-chains'
import { ConnectorOptions, Kaikas } from './kaikas-types'

declare global {
  interface Window {
    klaytn: any
  }
}

export default class KaikasConnector extends Connector<Kaikas | undefined, ConnectorOptions, providers.JsonRpcSigner> {
  readonly id: string = 'kaikas'
  readonly name: string = 'Kaikas Wallet'
  readonly ready = typeof window != 'undefined' && window.klaytn

  provider?: Kaikas
  switchingChains?: boolean
  UNSTABLE_shimOnConnectSelectAccount: ConnectorOptions['UNSTABLE_shimOnConnectSelectAccount']

  async connect() {
    const provider = await this.getProvider()
    if (!provider) throw new Error('ConnectorNotFoundError: Connector not found')

    if (provider.on) {
      provider.on('accountsChanged', this.onAccountsChanged)
      provider.on('chainChanged', this.onChainChanged)
      provider.on('disconnect', this.onDisconnect)
    }

    this.emit('message', { type: 'connecting' })

    // Attempt to show wallet select prompt with `wallet_requestPermissions` when
    // `shimDisconnect` is active and account is in disconnected state (flag in storage)
    if (this.UNSTABLE_shimOnConnectSelectAccount && this.options?.shimDisconnect) {
      const accounts = await provider
        .request({
          method: 'klay_accounts',
        })
        .catch(() => [])
      const isConnected = !!accounts[0]
      if (isConnected)
        await provider.request({
          method: 'wallet_requestPermissions',
          params: [{ klay_accounts: {} }],
        })
    }

    const account = await this.getAccount()
    // Switch to chain if provided
    let id = await this.getChainId()

    let unsupported = this.isChainUnsupported(id)

    if (unsupported) {
      const chain = await this.switchNetwork(cypress.id)
      id = chain.id
      unsupported = this.isChainUnsupported(id)
    }

    return { account, chain: { id, unsupported }, provider }
  }

  async getProvider() {
    if (!this.provider) {
      this.provider = window.klaytn
    }
    return this.provider
  }

  protected onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) this.emit('disconnect')
    else this.emit('change', { account: getAddress(accounts[0] as string) })
  }

  protected onChainChanged = (chainId: number | string) => {
    const id = normalizeChainId(chainId)
    const unsupported = this.isChainUnsupported(id)
    this.emit('change', { chain: { id, unsupported } })
  }

  protected onDisconnect = () => {
    // We need this as Kaikas Ho can emit the "disconnect" event
    // upon switching chains. This workaround ensures that the
    // user currently isn't in the process of switching chains.
    if (this.options?.shimChainChangedDisconnect && this.switchingChains) {
      this.switchingChains = false
      return
    }
    this.emit('disconnect')
    // Remove shim signalling wallet is disconnected
  }

  async disconnect() {
    const provider = await this.getProvider()
    if (!provider?.removeListener) return

    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('chainChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)
  }

  async getAccount() {
    const provider = await this.getProvider()
    if (!provider) throw new Error('ConnectorNotFoundError: Connector not found')
    const accounts = await provider.request({
      method: 'klay_requestAccounts',
    })
    return getAddress(accounts[0] as string)
  }

  async getChainId() {
    const provider = await this.getProvider()
    if (!provider) throw new Error('ConnectorNotFoundError: Connector not found')
    return await provider.request({ method: 'klay_chainId' }).then(normalizeChainId)
  }

  async switchNetwork(chainId: number) {
    if (this.options?.shimChainChangedDisconnect) this.switchingChains = true

    const provider = await this.getProvider()
    if (!provider) throw new Error('ConnectorNotFoundError: Connector not found')
    const id = hexValue(chainId)

    try {
      await provider.request({
        method: 'wallet_switchKlaytnChain',
        params: [{ chainId: id }],
      })
      return (
        this.chains.find(x => x.id === chainId) ?? {
          id: chainId,
          name: `Chain ${id}`,
          network: `${id}`,
          rpcUrls: { default: '' },
        }
      )
    } catch (error) {
      const chain = this.chains.find(x => x.id === chainId)
      if (!chain) throw new Error('ConnectorNotFoundError: Connector not found')

      try {
        await provider.request({
          method: 'wallet_addKlaytnChain',
          params: [
            {
              blockExplorerUrls: this.getBlockExplorerUrls(chain),
              chainId: id,
              chainName: chain.name,
              nativeCurrency: chain.nativeCurrency,
              rpcUrls: [chain.rpcUrls.public.http?.[0] ?? chain.rpcUrls.default.http?.[0]],
            },
          ],
        })
        return chain
      } catch (e) {
        throw new Error('SwitchChainError')
      }
    }
  }

  /**
   *
   * Override method of signer and sign the message with EOT account
   *
   */
  signMessage =
    (chainId: number) =>
    async (message: Bytes | string): Promise<string> => {
      if (!window.klaytn) throw new Error('ConnectorNotFoundError: Connector not found')
      const provider = <Kaikas>window.klaytn
      const prefix = [baobab.id, cypress.id].includes(chainId) ? 'klay' : 'eth'

      const accounts = await provider.request({
        method: `${prefix}_requestAccounts`,
      })
      const account = getAddress(accounts[0] as string)

      const signature = await provider.request({
        method: `${prefix}_sign`,
        params: [account, message],
      })
      return signature
    }

  async getSigner({ chainId }: { chainId?: number } = {}) {
    const [provider, account] = await Promise.all([this.getProvider(), this.getAccount()])
    const signer = new providers.Web3Provider(provider as providers.ExternalProvider, chainId).getSigner(account)
    const id = await this.getChainId()

    // Override signMessage
    signer.signMessage = this.signMessage(id)
    return signer
  }

  async isAuthorized() {
    try {
      const provider = await this.getProvider()
      if (!provider) throw new Error('ConnectorNotFoundError: Connector not found')
      const accounts = await provider.request({
        method: 'klay_accounts',
      })
      const account = accounts[0]
      return !!account
    } catch {
      return false
    }
  }

  protected isChainUnsupported(chainId: number) {
    return !this.chains.some(x => x.id === chainId)
  }

  protected isUserRejectedRequestError(error: any) {
    return error?.code === 4001
  }
}

export function normalizeChainId(chainId: string | number | bigint) {
  if (typeof chainId === 'string') return Number.parseInt(chainId, chainId.trim().substring(0, 2) === '0x' ? 16 : 10)
  if (typeof chainId === 'bigint') return Number(chainId)
  return chainId
}
