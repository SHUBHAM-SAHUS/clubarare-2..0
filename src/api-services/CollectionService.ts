import { FieldValues } from 'react-hook-form'

import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS, camelToSnake, camelToSnakeWithout, getQueries } from 'utils'

class CollectionService {
  getAllCollections = async (query: CollectionListQuery) =>
    CoreAPIService.get<CollectionListResponse>(`${API_ENDPOINTS.PRIVATE.GET_ALL_COLLECTIONS}?${getQueries(query)}`)

  getCollection = async (payload: CollectionQuery) =>
    CoreAPIService.get<CollectionResponse>(API_ENDPOINTS.PUBLIC.GET_COLLECTION_DETAILS, payload)

  getNFT = async (query: NFTListQuery) => {
    return CoreAPIService.get<CollectionNFTListResponse>(
      `${API_ENDPOINTS.PUBLIC.GET_NFT_DETAILS_BY_COLLECTION_ADDRESS}?${getQueries(query)}`
    ).then(res => {
      return {
        data: res.data?.collectibles,
      }
    })
  }

  editCollection = async (payload: UpdateCollectionRequest) =>
    CoreAPIService.post<CollectionResponse>(API_ENDPOINTS.PRIVATE.EDIT_COLLECTION, payload)

  updateCollectionDetail = async (collectionId: string, payload: FieldValues | FormData) =>
    CoreAPIService.put<CollectionResponse>(`${API_ENDPOINTS.PRIVATE.UPDATE_COLLECTION_DETAIL}/${collectionId}`, payload)

  validateCustomURLCollection = async (query: ValidateCustomURLQuery) =>
    CoreAPIService.get(`${API_ENDPOINTS.PRIVATE.VALIDATE_CUSTOM_URL_COLLECTION}?${getQueries(query)}`)

  getUserNFT = async (query: ListQuery) =>
    CoreAPIService.get<UserNFTResponse>(`${API_ENDPOINTS.PRIVATE.GET_USER_NFT_LIST}?${getQueries(query)}`)

  changeCollectionOfNFT = async (payload: ChangeNFTCollectionQuery) =>
    CoreAPIService.post<CollectionResponse>(
      API_ENDPOINTS.PRIVATE.CHANGE_OFF_CHAIN_NFT_LOCATION_BY_ONE_TO_ANOTHER_COLLECTION,
      payload
    )

  // TODO: camelToSnake should be refactored with backend v2
  // create Collection create nft flow
  createCollection = async (payload: FormData | FieldValues) =>
    CoreAPIService.post<CreateCollectionResponse>(
      API_ENDPOINTS.PRIVATE.CREATE_COLLECTION,
      camelToSnakeWithout(payload, ['displayName'])
    )

  // TODO: camelToSnake should be refactored with backend v2
  // update Collection create nft flow for on chain during create collection
  updateCollection = async (payload: UpdateCollectionQuery) =>
    CoreAPIService.post<CreateCollectionResponse>(API_ENDPOINTS.PRIVATE.UPDATE_COLLECTION, camelToSnake(payload))
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CollectionService()
