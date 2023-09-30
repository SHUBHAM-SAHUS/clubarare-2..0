interface NonceRequest {
  network_id: ClubRareNetworks
  wallet_address?: string
}

interface NonceResponse {
  code: number
  data: string
  message: string
  status: boolean
}

interface VerifySignatureRequest {
  network_id: ClubRareNetworks
  deviceToken?: string = ''
  nonce: string
  signature: string
  wallet_type: WalletTypes
  email?: string
}

interface verifyDataObject {
  token: string
  user: UserObject
}

interface VerifySignatureResponse {
  code: number
  data: verifyDataObject
  message: string
  status: boolean
}
