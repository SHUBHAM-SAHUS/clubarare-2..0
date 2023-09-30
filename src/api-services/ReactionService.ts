import CoreAPIService from './CoreAPIService'
import { ReactionQuery, ReactionResponse, GetReactionQuery, GetReactionResponse } from './interfaces/reaction'

import { API_ENDPOINTS } from 'utils'

/**
 * Service for handling profile reactions
 */
class ReactionService {
  /**
   * Add a new reaction for the given payload
   * @param {ReactionQuery} payload - The payload for the new reaction
   * @returns {Promise<ReactionResponse>} - A promise that resolves with the response data
   */
  addReaction = async (payload: ReactionQuery) =>
    CoreAPIService.post<ReactionResponse>(API_ENDPOINTS.PUBLIC.PROFILE_REACTION, payload)

  /**
   * Get a reaction for the given payload
   * @param {GetReactionQuery} payload - The payload for the reaction to retrieve
   * @returns {Promise<GetReactionResponse>} - A promise that resolves with the response data
   */
  getReaction = async (payload: GetReactionQuery) =>
    CoreAPIService.get<GetReactionResponse>(API_ENDPOINTS.PUBLIC.PROFILE_REACTION, payload)

  /**
   * Add a like to a content.
   * @param {CollectibleIdQuery} payload - The payload containing the ID of the content to like
   * @returns {Promise<LikeResponse>} - A promise that resolves with the response data
   */
  addLike = async (payload: CollectibleIdQuery) =>
    CoreAPIService.post<LikeResponse>(API_ENDPOINTS.PRIVATE.ADD_LIKE, payload)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ReactionService()
