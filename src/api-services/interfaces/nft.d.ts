interface NFTListQuery extends WithPaginationRequest {
  wallet_address?: string
  network_id?: ClubRareNetworks
  type?: string
  redeemable?: boolean
}

interface NFTAssetObject {
  collectibleList: AssetObject[]
  createdItemCount?: number
  pendingItemCount?: number
  saleItemCount?: number
}
interface NFTListResponse {
  [x: string]: any
  status: boolean
  message: string
  code: number
  data: NFTAssetObject
}
