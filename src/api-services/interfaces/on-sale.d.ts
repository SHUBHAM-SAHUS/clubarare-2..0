interface OnSaleObject {
  collectionAddress: AddressString
  tokenId: string | number
  seller: AddressString
  auctionType: AuctionTypes
  amount: string | number
  time: string | UTCString
  ERC20Address: AddressString
  id: string
  usdAmount: number
}

interface PutOnSaleResponse {
  status: boolean
  message: string
  code: number
  data: null
}

interface PutOnSaleObject {
  _id: string
  auctionType: string
  amount: string
  erc20_address: string
  nonce: string
  signature: string
  startingTime: number
  closingTime: number
  isTokenGated: boolean
  tokenGateAddress: string
}

interface ListingObject {
  auctionType: AuctionTypes
  collectibleOwner: AddressString
  contractAddress: AddressString
  creatorAddress: AddressString
  endTime: number
  isTokenGated: boolean
  objId: string
  orderType: number
  paymentTokenType: AddressString
  price: string
  royalty: number
  startTime: number
  tokenGateAddress: AddressString
  tokenId: number
  uri: string
}

interface SaveEventByTransactionRequest {
  transaction_hash: string
  contract_address: string
  network_id: string
}

interface SaveEventByTransactionResponse {
  status: boolean
  message: string
  code: number
  data: null
}

interface EscrowWithClaimRequest {
  transaction_hash: string
  collectible_id: string
  auction_detail_id: string
}

interface CreateEscrowOrderRequest {
  collectible_id: string
  auction_id: string
  amount: string
  network_id: string
  currency: string
  delivery_type: string
  full_name: string
  email: string
  address: string
  state: string
  country: string
  zip_code: string
  city: string
  phone_number: string
  transaction_hash: string
  isEscrow: boolean
}

interface EscrowBidDetailRequest {
  collectible_id: string
  auction_detail_id: string
  bid_amount: string
  network_id: string
  currency: string
  delivery_type: string
  full_name: string
  email: string
  address: string
  state: string
  country: string
  zip_code: string
  city: string
  phone_number: string
  bid_transaction_hash: string
  isEscrow: boolean
}

interface EscrowReceivedItemRequest {
  collectible_id: string
  network_id: string
  full_name: string
  email: string
  address: string
  city: string
  state: string
  zip_code: string
  country: string
  phone_number: string
}
