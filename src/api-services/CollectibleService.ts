import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS } from 'utils'

class CollectibleService {
  createCollectible = async (payload: FormData) =>
    CoreAPIService.post<CreateCollectibleResponse>(API_ENDPOINTS.PRIVATE.CREATE_COLLECTIBLE, payload)

  hideCollectible = async (body: HideStatusObject) =>
    CoreAPIService.post<HideCollectibleResponse>(`${API_ENDPOINTS.PRIVATE.NFT_HIDE_STATUS}`, body)

  createCollectibleView = async (body: CreateCollectibleViewRequest) =>
    CoreAPIService.post<CreateCollectibleViewResponse>(API_ENDPOINTS.PRIVATE.CREATE_COLLECTIBLE_VIEW, body)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CollectibleService()
