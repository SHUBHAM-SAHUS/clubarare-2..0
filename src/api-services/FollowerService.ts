import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS, getQueries } from 'utils'

class FollowerService {
  getFollower = async (query: FollowerQuery) =>
    CoreAPIService.get<FollowerListResponse>(`${API_ENDPOINTS.PUBLIC.GET_FOLLOWER}?${getQueries(query)}`)

  followUser = async (body: FollowBody) =>
    CoreAPIService.post<FollowResponse>(`${API_ENDPOINTS.PRIVATE.POST_FOLLOW}`, body)

  unFollowUser = async (body: FollowBody) =>
    CoreAPIService.post<FollowResponse>(`${API_ENDPOINTS.PRIVATE.POST_UNFOLLOW}`, body)

  checkFollow = async (query: CheckFollowQuery) =>
    CoreAPIService.get<CheckFollowResponse>(`${API_ENDPOINTS.PRIVATE.POST_CHECK_FOLLOW}?${getQueries(query)}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new FollowerService()
