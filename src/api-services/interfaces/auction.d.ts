interface AuctionAssetListQuery extends WithPaginationRequest {
  wallet_address?: string
}

interface MostViewedAssetListQuery extends WithPaginationRequest {
  wallet_address?: string
  days: 'all' | number | string
}

type PrevSaleAssetListQuery = WithPaginationRequest

interface AuctionObject {
  id: string
  collectionAddress: AddressString
  tokenId: string | number
  networkId: ClubRareNetworks
  contractAddress: AddressString
  nonce: string | number
  collectibleId: string
  signature: AddressString
  lastOwner: AddressString
  bidTime: string | UTCString
  currentBid: string | number
  highestBidder: AddressString
  auctionType: AuctionTypes
  startingPrice: string | number
  buyPrice: string | number
  buyer: AddressString
  collector: AddressString
  startingTime: string | UTCString
  closingTime: string | UTCString
  initialClosingTime: string | UTCString
  isTokenGated: boolean
  tokenGateAddress: AddressString
  erc20Token: AddressString
  isActive: boolean
}

interface AuctionAssetObject extends AssetObject {
  fileError?: boolean
  brand?: string
  fileHashCode: string
  ipfsHash: string
  // Todo @Anil: Assign the tight adminApproveStatus type
  adminApproveStatus: string | 'Approved'
  // Todo @Anil: Assign the tight collectibleType type
  collectibleType: string | 'clubrare'
  categoryId: string
  isLuxuryAuthReq: boolean
  customFields: []
  // Todo @Anil: Assign the tight collectionStatus type
  collectionStatus: string | 'regular'
  imageRules: ImageRuleObject[]
  previewUrl: string
  history: HistoryObject
  approvalDescription: string
  auctionDetails: AuctionObject
}

interface AuctionAssetListResponse {
  status: boolean
  message: string
  code: number
  data: AssetObject[]
}
