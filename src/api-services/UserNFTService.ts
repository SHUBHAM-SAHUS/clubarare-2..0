import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS, getQueries } from 'utils'

/**
 * UserNFTService class handles all requests related to user's NFTs.
 */
class UserNFTService {
  /**
   * Retrieve all NFTs belonging to a user.
   * @param query - The query to filter NFTs by.
   * @returns A promise that resolves to a UserNFTListResponse object.
   */
  getAllUserNFT = async (query: UserNFTListQuery) =>
    CoreAPIService.get<UserNFTListResponse>(`${API_ENDPOINTS.PRIVATE.GET_USER_NFT}?${getQueries(query)}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserNFTService()
