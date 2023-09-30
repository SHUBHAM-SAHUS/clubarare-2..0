interface UserNFTListQuery extends WithPaginationRequest {
  wallet_address?: string
  type?: string
  redeemable?: boolean
}

interface UserNFTListResponse {
  status: boolean
  message: string
  code: number
  data: AssetObject[]
}
