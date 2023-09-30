interface CollectionListQuery {
  wallet_address?: string
  network_id?: ClubRareNetworks
}

interface CollectionAssetObject {
  bannerImage: string
  chain: 'on' | 'off'
  collectibleType: 'clubrare'
  collectionAbiPath: string
  collectionAddress?: AddressString
  collectionStatus: 'regular'
  createdOn: string
  description: string
  displayName: string
  factoryAddress: AddressString
  id: string
  imageId: string
  isActive: string
  networkId: ClubRareNetworks
  // TODO adjust correct type
  order: string
  symbol: string
  transactionHash: string
  walletAddress: AddressString
  avatar: string | Blob | StaticImageData
  customUrl: string
}

interface CollectionListResponse {
  chain: string
  code: number
  customUrl: string
  data: CollectionAssetObject[]
  description: string
  displayName: string
  factoryAddress: string
  id: string
  imageId: string
  isActive: string
  message: string
  networkId: ClubRareNetworks
  order: string | number
  ownerVerified: boolean
  status: boolean
  symbol: string
  totalView: number
  transactionHash: string
  walletAddress: string
}

interface CollectionInfoObject extends CollectionAssetObject {
  totalView: number
  /* Array of NFT ids */
  nfts: string[]
  /* Collection creator verification status */
  ownerVerified: boolean
}

interface CollectionObject {
  floorPrice: number
  items: number
  owners: number
  totalView: number
  collectionsInfo: CollectionInfoObject
}

interface CollectionResponse {
  status: boolean
  message: string
  code: number
  data: CollectionObject
}

interface CollectionQuery {
  collection_address?: string
}

interface NFTListQuery extends WithPaginationRequest {
  wallet_address?: string
  network_id?: ClubRareNetworks
  type?: string
  redeemable?: boolean
}

interface NFTAssetObject {
  collectibleList: AssetObject
  createdItemCount?: number
  pendingItemCount?: number
  saleItemCount?: number
}
interface CollectionNFTListResponse {
  status: boolean
  message: string
  code: number
  data: any
}
interface UserNFTResponse {
  status: boolean
  message: string
  code: number
  data?: any
}
interface ValidateCustomURLQuery {
  custom_url?: string
  id?: string
}

interface ListQuery {
  collection_address?: string
}
interface ChangeNFTCollectionQuery {
  id?: string
  nfts?: Array<string>
}
interface CreateCollection {
  displayName: string
  networkId?: ClubRareNetworks
  description?: string
  banner_image?: string
  image_id?: string
  chain?: string
  wallet_address?: string
  collectible_type?: string
  order?: string
  collection_abi_path?: string
  is_active?: boolean
  collection_status?: string
  custom_url?: string
  nfts?: Array<string>
  id: string
  created_on?: string
  __v?: string
  ipfsHash: string
  symbol: string
}

interface CreateCollectionResponse {
  data: CreateCollection
}

interface UpdateCollectionQuery {
  id: string
  collectionAddress: string
  transactionHash: string
}

/**
 * @deprecated Try use UpdateCollectionDetailRequest
 */
interface UpdateCollectionRequest {
  _id: string
  custom_url: string
  display_name: string
  banner_image: string
  description: string
}

interface UpdateCollectionDetailRequest {
  displayName: string
  description: string
  bannerImage?: string | Blob
  avatar?: string | Blob
  customUrl: string
}
