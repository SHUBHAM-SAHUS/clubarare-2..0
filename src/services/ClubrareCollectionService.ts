import { Signer, ContractTransaction } from 'ethers'

import { SupportedChainIds } from '../utils'
import ABIs from '../abis'

import ContractChainService from './ContractChainService'

// type AddressString = `0x${string}`

class ClubrareCollectionService extends ContractChainService {
  constructor(
    chainId: SupportedChainIds,
    activatingConnector: WalletTypes | undefined,
    address: string,
    signer: Signer,
    operator: string | any
  ) {
    super(chainId, activatingConnector, address, ABIs.ERC721ABI, signer, operator)
  }

  // TODO add smart contract functions

  // View functions

  async getApproved(tokenId: string): Promise<string> {
    return this.isKlaytnNetwork()
      ? this.getMethods().getApproved(tokenId).call()
      : this.getMethods().getApproved(tokenId)
  }

  // Write functions
  async approve(address: string, tokenId: string): Promise<ContractTransaction> {
    return this.isKlaytnNetwork()
      ? this.getMethods().approve(address, tokenId).send({ from: this.operator, gas: null })
      : this.getMethods().approve(address, tokenId)
  }

  balanceOf = (address: string) => {
    return this.isKlaytnNetwork() ? this.getMethods().balanceOf(address).call() : this.getMethods().balanceOf(address)
  }
}

export default ClubrareCollectionService
