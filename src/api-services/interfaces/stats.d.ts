interface statsObject {
  totalSale: number
  nftListed: number
  nftSold: number
  totalView: number
  totalCollections: number
}
interface DashboardStatsResponse {
  status: boolean
  message: string
  code: number
  data: statsObject
}
