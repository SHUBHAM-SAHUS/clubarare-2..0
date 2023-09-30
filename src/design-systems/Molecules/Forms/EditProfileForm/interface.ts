export type DataType = {
  id: string
  walletAddress: string
  name?: string
  customUrl?: string
  email?: string
  bio?: string
  image?: string
}

export interface EditProfileFormProps {
  userIdOrAddress: string
}
