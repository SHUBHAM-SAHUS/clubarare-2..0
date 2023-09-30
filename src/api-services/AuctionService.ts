import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS, getQueries } from 'utils'

class AuctionService {
  getRecentAuctions = async (query: AuctionAssetListQuery) =>
    CoreAPIService.get<AuctionAssetListResponse>(
      `${API_ENDPOINTS.PUBLIC.RECENT_AUCTIONS_NFT_LIST}?${getQueries(query)}`
    )

  getLiveAuctions = async (query: AuctionAssetListQuery) =>
    CoreAPIService.get<AuctionAssetListResponse>(`${API_ENDPOINTS.PUBLIC.LIVE_AUCTIONS_NFT_LIST}?${getQueries(query)}`)

  getMostViewedAuctions = async (query: MostViewedAssetListQuery) =>
    CoreAPIService.get<AuctionAssetListResponse>(`${API_ENDPOINTS.PUBLIC.MOST_VIEWED_NFT_LIST}?${getQueries(query)}`)

  getPrevSaleAuctions = async (query: PrevSaleAssetListQuery) =>
    CoreAPIService.get<AuctionAssetListResponse>(`${API_ENDPOINTS.PUBLIC.PREV_SALES_LIST}?${getQueries(query)}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuctionService()
