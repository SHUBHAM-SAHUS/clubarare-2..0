import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS } from 'utils'

class MetaService {
  getProductMeta = async (productId: string) => {
    return CoreAPIService.get<MetaResponse>(`${API_ENDPOINTS.PUBLIC.META.PRODUCT}?productId=${productId}`)
  }

  getProfileMeta = async (address: string) => {
    return CoreAPIService.get<MetaResponse>(`${API_ENDPOINTS.PUBLIC.META.PROFILE}?wallet=${address}`)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new MetaService()
