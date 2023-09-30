import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS, getQueries } from 'utils'

class AssetService {
  getAssets = async (filters: ExploreAssetsQuery) =>
    CoreAPIService.get<ExploreAssetsResponse>(`${API_ENDPOINTS.PUBLIC.EXPLORE}?${getQueries(filters)}`)

  getAsset = async (filters: GetSingleAssetQuery) =>
    CoreAPIService.get<SingleAssetResponse>(`${API_ENDPOINTS.PUBLIC.GET_SINGLE_NFT}?${getQueries(filters)}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AssetService()
