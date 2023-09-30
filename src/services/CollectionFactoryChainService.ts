import { Signer, ContractTransaction } from 'ethers'

import ContractChainService from './ContractChainService'

import { SupportedChainIds } from 'utils'
import ABIs from 'abis'
interface ExtendedContractTransaction extends ContractTransaction {
  transactionHash?: string
}
class CollectionFactoryChainService extends ContractChainService {
  constructor(
    chainId: SupportedChainIds,
    activatingConnector: WalletTypes | undefined,
    address: string,
    signer: Signer,
    operator: AddressString | any
  ) {
    super(chainId, activatingConnector, address, ABIs.CollectionFactoryABI, signer, operator)
  }

  // below method of the contract
  async createCollection(
    displayName: string,
    symbol: string,
    IpfsHash: string
  ): Promise<ExtendedContractTransaction | Web3Transaction | any> {
    return this.isKlaytnNetwork()
      ? await this.getMethods()
          .createCollection(
            displayName,
            symbol,
            `https://clubrare2.mypinata.cloud/ipfs/${IpfsHash}`, // contract URI
            'https://clubrare2.mypinata.cloud/ipfs/' //tokenURI Prefix
          )
          .send({ from: this.operator, gas: null })
      : await this.getMethods().createCollection(
          displayName,
          symbol,
          `https://clubrare2.mypinata.cloud/ipfs/${IpfsHash}`, // contract URI
          'https://clubrare2.mypinata.cloud/ipfs/' //tokenURI Prefix
        )
  }
}

export default CollectionFactoryChainService
