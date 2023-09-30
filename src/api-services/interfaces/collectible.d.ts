interface CreateCollectibleResponseData {
  _id: string
  ipfs_external_url: string
  IpfsHash: string
}

interface CreateCollectibleResponse {
  status: boolean
  message: string
  code: number
  data: CollectibleResponseData
}

interface HideCollectibleResponse {
  status: boolean
  message: string
  code: number
  data: CollectibleResponseData
}

interface CreateCollectibleViewRequest {
  _id: string
}

interface CreateCollectibleViewObject {
  viewCount: number
}

interface CreateCollectibleViewResponse {
  status: boolean
  message: string
  code: number
  data: CreateCollectibleViewObject
}
interface AuthenticationCreditResponse {
  status: boolean
  message: string
  code: number
  data: number
}
