interface AssetObject {
  additionalImages?: string[]
  auctionDetails?: auctionDetailsObject
  collectibleOwner: AddressString
  collectibleType: string
  collectionAddress: string
  collectionAddress: string
  collectionId?: string
  contractType: string // TODO: @Anil: Assign the tight contractType type
  createdBy: string
  createdOn: UTCString
  customFields: CustomFieldsObject[]
  description: string
  escrow?: EscrowObject
  file: string
  fileContentType: string
  history?: HistoryObject
  id: string
  ipfsHash: string
  isActive: boolean
  isAdded?: boolean
  isApprove?: boolean
  isApproved: boolean
  isAuthentic?: boolean
  isCoa?: boolean
  isHide: boolean
  isLike: boolean
  isLuxuryAuthReq?: boolean
  lastErc20Address: AddressString
  lastPrice: string | number
  luxuryStatus?: string
  networkId: ClubRareNetworks
  nftType: string // TODO: @Anil: Assign the tight nftType type
  onSale: boolean
  ownerObj: OwnerObject
  ownerVerified: boolean
  previewUrl: string
  redeemable: boolean
  redeemType: number // TODO: @Anil: Assign the tight redeemType type
  redeemVerified: boolean
  royalties: number
  s3Url: string
  title: string
  tokenId: string | number
  totalLike: number
  transactionHash: string
  urlCoa?: string
  usdAmount: number
  userObj: UserObject
  validatedOn?: Date
  viewCount: number
  WalletAddress(walletAddress: string | undefined, WalletAddress: any): unknown
  itemCurrentLocation?: string
}

interface ApiResponse {
  status: boolean
  message: string
  code: number
  data: null
}

interface EscrowObject {
  buyerWalletAddress: string
  escrowStatus: string
  id: string
  orderStatus: string
  sellerWalletAddress: string
}

interface ExploreAssetsResponse extends ApiResponse {
  data: AssetObject[]
}

interface CollectibleIdQuery {
  collectible_id: string
}

interface ExploreAssetsQuery {
  wallet_address?: AddressString
  search?: string
  network_id?: ClubRareNetworks
  category?: string
  collection_address?: AddressString
  sale_type?: SaleType
  token?: string
  min_price?: string
  max_price?: string
  page_number: number
  page_size: number
}

interface SingleAssetObject extends AssetObject {
  imageRules: ImageRuleObject[]
  auctionDetails: AuctionObject
}

interface SingleAssetResponse extends ApiResponse {
  data: SingleAssetObject
}

interface GetSingleAssetQuery extends CollectibleIdQuery {
  wallet_address?: string
}

interface GetSingleActivityQuery extends CollectibleIdQuery {
  walletAddress?: AddressString
}
interface SingleActivityResponse extends ApiResponse {
  data: []
}

interface LikeResponseObject {
  isLike: boolean
  totalLike: number
}

interface LikeResponse extends ApiResponse {
  data: LikeResponseObject
}

interface HideStatusObject {
  _id: AddressString | string
}

interface VaultItemStatusObject {
  id: string
  collectibleId: string
  orderStatus: string
  receiverWalletAddress: string
}

interface VaultItemStatusResponse extends ApiResponse {
  data: VaultItemStatusObject
}
