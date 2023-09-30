interface BuyObject {
  id: string
  collectionAddress: AddressString
  tokenId: string | number
  seller: AddressString
  buyer: AddressString
  amount: string | number
  time: string | UTCString
  erc20Address?: AddressString
  hash: AddressString
  usdAmount: number
}
