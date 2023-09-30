import { Signer, providers } from 'ethers'
import { RequestProvider } from 'caver-js'

import { KLAYTN_NETWORKS, RPC_ENDPOINTS, SupportedChainIds } from 'utils'

class CoreChainService {
  provider: providers.Provider | providers.JsonRpcProvider | RequestProvider
  chainId: SupportedChainIds
  activatingConnector: WalletTypes
  signer: Signer | null

  constructor(chainId: SupportedChainIds, activatingConnector: WalletTypes, signer: Signer | null) {
    this.chainId = chainId
    this.activatingConnector = activatingConnector
    this.signer = signer
    this.provider = signer?.provider ?? this.getPublicProvider()
  }

  getProvider() {
    return this.getPublicProvider()
    // return this.activatingConnector === 'KAIKAS' ? this.getCaverProvider() : this.getEthProvider()
  }

  getPublicProvider() {
    return new providers.JsonRpcProvider(RPC_ENDPOINTS[this.chainId], this.chainId)
  }

  getCaverProvider() {
    if (!window?.klaytn) return this.getPublicProvider()
    return new providers.Web3Provider((window as any).klaytn)
  }

  getEthProvider() {
    if (!window?.ethereum) return this.getPublicProvider()
    return new providers.Web3Provider((window as any).ethereum)
  }

  isKlaytnNetwork = () => KLAYTN_NETWORKS.includes(this.chainId) && this.activatingConnector === 'KAIKAS'
}

export default CoreChainService
