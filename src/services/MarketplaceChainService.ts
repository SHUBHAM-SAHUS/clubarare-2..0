import { Signer, BigNumberish, BigNumber, ContractTransaction, Bytes } from 'ethers'

import ContractChainService from './ContractChainService'

import { NULL_TOKEN_ADDRESS, SupportedChainIds } from 'utils'

interface ExtendedContractTransaction extends ContractTransaction {
  transactionHash?: string
}

class MarketplaceChainService extends ContractChainService {
  constructor(
    chainId: SupportedChainIds,
    activatingConnector: WalletTypes | undefined,
    address: string,
    abi: any,
    signer: Signer,
    operator: AddressString | any
  ) {
    super(chainId, activatingConnector, address, abi, signer, operator)
  }

  // TODO add smart contract functions

  async getCurrentOrderNonce(address: string): Promise<BigNumber> {
    return this.isKlaytnNetwork()
      ? await this.getMethods().getCurrentOrderNonce(address).call()
      : await this.getMethods().getCurrentOrderNonce(address)
  }

  async hashOrder(OrderTuple: OrderTuple): Promise<any> {
    return this.isKlaytnNetwork()
      ? await this.getMethods().hashOrder(OrderTuple).call()
      : await this.getMethods().hashOrder(OrderTuple)
  }

  async cancelledOrFinalized(signature: string): Promise<boolean> {
    return this.isKlaytnNetwork()
      ? await this.getMethods().cancelledOrFinalized(signature).call()
      : await this.getMethods().cancelledOrFinalized(signature)
  }

  // Write functions

  acceptOffer = (order: OrderTuple, bid: BidTuple, buyer: AddressString, amount: BigNumberish) => {
    return this.isKlaytnNetwork()
      ? this.getMethods().acceptOffer(order, bid, buyer, amount).send({ from: this.operator, gas: null })
      : this.getMethods().acceptOffer(order, bid, buyer, amount)
  }

  async bid(order: OrderTuple, amount: BigNumberish): Promise<ExtendedContractTransaction | Web3Transaction> {
    if (order.paymentToken === NULL_TOKEN_ADDRESS) {
      return this.isKlaytnNetwork()
        ? this.getMethods().bidding(order, amount).send({ from: this.operator, gas: null, value: amount })
        : this.getMethods().bidding(order, amount, { value: amount })
    } else {
      return this.isKlaytnNetwork()
        ? this.getMethods().bidding(order, amount).send({ from: this.operator, gas: null })
        : this.getMethods().bidding(order, amount)
    }
  }

  async buy(
    tokenAddress: AddressString,
    tokenId: BigNumberish,
    amount: BigNumberish,
    order: OrderTuple
  ): Promise<ExtendedContractTransaction | Web3Transaction> {
    if (order.paymentToken === NULL_TOKEN_ADDRESS) {
      return this.isKlaytnNetwork()
        ? this.getMethods()
            .buy(tokenAddress, tokenId, amount, order)
            .send({ from: this.operator, gas: null, value: amount })
        : this.getMethods().buy(tokenAddress, tokenId, amount, order, { value: amount })
    } else {
      return this.isKlaytnNetwork()
        ? this.getMethods().buy(tokenAddress, tokenId, amount, order).send({ from: this.operator, gas: null })
        : this.getMethods().buy(tokenAddress, tokenId, amount, order)
    }
  }

  async claim(order: OrderTuple): Promise<ExtendedContractTransaction | Web3Transaction> {
    return this.isKlaytnNetwork()
      ? this.getMethods().claim(order).send({ from: this.operator, gas: null })
      : this.getMethods().claim(order)
  }

  async invalidateSignedOrder(order: OrderTuple): Promise<ExtendedContractTransaction | Web3Transaction> {
    return this.isKlaytnNetwork()
      ? this.getMethods().invalidateSignedOrder(order).send({ from: this.operator, gas: null })
      : this.getMethods().invalidateSignedOrder(order)
  }

  invalidateSignedBulkOrder = (orders: OrderTuple[]) => {
    return this.isKlaytnNetwork()
      ? this.getMethods().invalidateSignedBulkOrder(orders).send({ from: this.operator, gas: null })
      : this.getMethods().invalidateSignedBulkOrder(orders)
  }
}

export default MarketplaceChainService
