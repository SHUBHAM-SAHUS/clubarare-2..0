interface UserProfileQuery {
  user_address: string
}

interface ProfileObject {
  bio: string
  coverBackgroundPosition: string
  created_on: string
  customUrl: string
  deviceTokens: Array
  email: string
  image: string
  isAgreementSigned: boolean
  isBlock: boolean
  isLlcAdmin: boolean
  isPresaleAdmin: boolean
  isStakeAdmin: boolean
  isSuperAdmin: boolean
  isWhiteListedSeller: boolean
  lastLoginTime: string
  name: string
  networkId: string
  nonce: string
  originalImage: string
  role: string
  walletAddress: string
  id: string
  isEmptySpace: boolean
  spaceImage: string
}

interface UserProfileResponse {
  status: boolean
  message: string
  code: number
  data: ProfileObject
}
