enum OrderTypes {
  Digital = 0,
  Physical = 1,
  Escrow = 2,
}

interface OrderTuple {
  /* Order maker address. */
  seller: AddressString
  /* contract Address */
  contractAddress: AddressString
  /* Collection Royalty Fee. */
  royaltyFee: BigNumberish
  /* Royalty receiver once order is completed */
  royaltyReceiver: AddressString
  /* Token used to pay for the order. Only WETH for now */
  paymentToken: AddressString
  /* Base price of the order (in paymentTokens). */
  basePrice: BigNumberish
  /* Listing timestamp. */
  listingTime: BigNumberish
  /* Expiration timestamp - 0 for no expiry. */
  expirationTime: BigNumberish
  /* Order nonce, used to prevent duplicate. */
  nonce: BigNumberish
  /* Token Id */
  tokenId: BigNumberish
  /* Order type Physical or Digital */
  orderType: OrderTypes
  /* Signature */
  signature: string
  /* metadata URI for Minting*/
  uri: string
  /* Obj Id for internal mapping */
  objId: string
  /* isTokenGated  to enable token gate */
  isTokenGated: boolean
  /* TokenGateAddress for contract address for gating */
  tokenGateAddress: AddressString

  /* isEscrow for physical items */ //TODO: need to check escrow here
  // isEscrow: boolean

  /* isMetamask for physical items */
  // isMetamask: boolean
}

interface BidTuple {
  /* Order Seller address. */
  seller: AddressString
  /* Order Buyer address. */
  bidder: AddressString
  /* contract Address */
  contractAddress: AddressString
  /* Token used to pay for the order. Only WETH for now */
  paymentToken: AddressString
  /* Base price of the order (in paymentTokens). */
  bidAmount: BigNumberish
  /* Listing timestamp. */
  bidTime: BigNumberish
  /* Expiration timestamp - 0 for no expiry. */
  expirationTime: BigNumberish
  /* Order nonce, used to prevent duplicate. */
  nonce: BigNumberish
  /* Token Id */
  tokenId: BigNumberish
  /*signature*/
  signature: string
  /* Obj Id for internal mapping */
  objId: string
  /* Bid Id for internal mapping */
  bidId: string
}

interface FeeSplit {
  /* address of fee receive*/
  payee: AddressString
  /*percentage of fee spilt*/
  share: BigNumberish
}

interface Auction {
  highestBidder: AddressString
  lastOwner: AddressString
  currentBid: BigNumberish
  closingTime: BigNumberish
  buyer: boolean
}

interface ListingSignPayload {
  seller: AddressString
  contractAddress: AddressString
  royaltyFee: BigNumber
  royaltyReceiver: AddressString
  paymentToken: AddressString
  basePrice: BigNumber
  listingTime: BigNumber
  expirationTime: BigNumber
  nonce: BigNumber
  tokenId: BigNumber
  orderType: number
  uri: string
  objId: string
  isTokenGated: boolean
  tokenGateAddress: AddressString
}
