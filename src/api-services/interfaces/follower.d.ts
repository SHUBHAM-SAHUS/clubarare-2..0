interface FollowerListQuery extends WithPaginationRequest {
  wallet_address?: string
  network_id?: ClubRareNetworks
}

interface FollowerQuery {
  user_id?: string
  page_number?: number
  page_size?: number
}

interface CheckFollowQuery {
  userId?: string
}

interface FollowObject {
  follower: FollowerData[]
  following: FollowerData[]
}

interface FollowerListResponse {
  status: boolean
  message: string
  code: number
  data: FollowObject
}

interface FollowResponse {
  status: boolean
  message: string
  code: number
  data: {}
}

interface CheckFollow {
  isFollow?: boolean
}

interface CheckFollowResponse {
  status: boolean
  message: string
  code: number
  data: CheckFollow
}

interface FollowBody {
  user_id?: string
}
