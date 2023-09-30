interface UserObject {
  bio?: string
  coverBackgroundPosition?: string
  coverImage?: string
  createdOn: string
  customUrl?: string
  deviceTokens?: string
  email?: string
  id: string
  image?: string
  isAgreementSigned?: boolean
  isBlock?: boolean
  isLlcAdmin?: boolean
  isPresaleAdmin?: boolean
  isStakeAdmin?: boolean
  isSuperAdmin: boolean
  isWhiteListedSeller: boolean
  isWhiteListPopUpConfirm?: boolean
  lastLoginTime?: string
  name?: string
  networkId: ClubRareNetworks
  nonce?: string
  originalImage?: string
  role: string
  walletAddress: AddressString
}

interface OwnerObject {
  image: string
  name: string
  walletAddress: string
}

interface CustomFieldsObject {
  key: string
  value: string
  id: string
}

interface EditProfileQuery {
  _id: string
  wallet_address: string
  custom_url?: string
  name?: string
  email?: string
  bio?: string
  attachment?: string
}
interface EditProfileResponse {
  status: boolean
  code: number
  message: string
}
