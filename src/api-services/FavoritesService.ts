import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS, getQueries } from 'utils'

class FavoritesService {
  getFavorites = async (query: FavoritesListQuery) => {
    return CoreAPIService.get<FavoritesListResponse>(
      `${API_ENDPOINTS.PRIVATE.GET_FAVORITES}?${getQueries(query)}`
    ).then(res => {
      return {
        code: res.code,
        data: res.data?.collectibleList,
        message: res.message,
        status: res.status,
      }
    })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new FavoritesService()
