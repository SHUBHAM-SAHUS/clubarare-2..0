import { BigNumberish, Signer, ContractTransaction } from 'ethers'

import ContractChainService from './ContractChainService'

import { SupportedChainIds } from 'utils'
import ABIS from 'abis'

class TokenChainService extends ContractChainService {
  constructor(
    chainId: SupportedChainIds,
    activatingConnector: WalletTypes | undefined,
    address: string,
    signer: Signer | null,
    operator: AddressString | any
  ) {
    super(chainId, activatingConnector, address, ABIS.ERC20ABI, signer, operator)
  }

  async allowance(owner: string, spender: string): Promise<BigNumberish> {
    return this.isKlaytnNetwork()
      ? this.getMethods().allowance(owner, spender).call()
      : this.getMethods().allowance(owner, spender)
  }

  async balanceOf(owner: string): Promise<BigNumberish> {
    return this.isKlaytnNetwork()
      ? await this.getMethods().balanceOf(owner).call()
      : await this.getMethods().balanceOf(owner)
  }

  // write method

  async approve(address: string, price: string): Promise<ContractTransaction> {
    return this.isKlaytnNetwork()
      ? await this.getMethods().approve(address, price).send({ from: this.operator, gas: null })
      : await this.getMethods().approve(address, price)
  }
}

export default TokenChainService
