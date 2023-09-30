interface FavoritesListQuery extends WithPaginationRequest {
  type?: number | string
  redeemable?: boolean
}
interface FavoritesObject {
  collectibleList: AssetObject[]
  createdItemCount?: number
  pendingItemCount?: number
  saleItemCount?: number
}
interface FavoritesListResponse {
  status: boolean
  message: string
  code: number
  data: FavoritesObject
}
