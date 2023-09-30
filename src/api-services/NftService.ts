import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS, getQueries } from 'utils'

class NFTService {
  getAllNFT = async (query: NFTListQuery) => {
    return CoreAPIService.get<NFTListResponse>(`${API_ENDPOINTS.PRIVATE.GET_DASHBOARD_NFT}?${getQueries(query)}`).then(
      res => {
        return {
          code: res.code,
          data: res.data,
          message: res.message,
          status: res.status,
        }
      }
    )
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new NFTService()
