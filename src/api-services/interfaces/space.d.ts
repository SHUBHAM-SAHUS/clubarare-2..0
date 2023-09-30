interface APIBaseResponse {
  status: boolean
  message: string
  code: number
}

interface ColorObject {
  id: string
  color: string
}

interface ImageObject {
  id: string
  imageUrl: string
  thumbnailImage: string
  originalMedia: string
  fileType: string
  tokenId: string
  tokenAddress: string
}

interface AIImageObject {
  id: string
  prompt: string
  createdOn: string
  imageUrl: string
  images: ImageObject[]
}

interface SpaceColorResponse extends APIBaseResponse {
  data: Array<ColorObject>
}

interface AIImageResponse extends APIBaseResponse {
  data: AIImageObject
}

interface GeneratedAIImageResponse extends APIBaseResponse {
  data: {
    rows: AIImageObject[]
  }
}

interface SpaceImageResponse extends APIBaseResponse {
  data: Array<ImageObject>
}

interface SpaceQuery {
  to_user: string
  reaction: string
  status: string
}

interface GetSpaceQuery {
  wallet_address?: string
}

interface GetSpaceServicesObject {
  spaceUrl: string
  id: string
  userId: string
  v: number
  walletAddress: string
}

interface GetSpaceServicesResponse {
  code: number
  data: GetSpaceServicesObject
  message: string
  status: boolean
}

interface SpaceObject {
  id: string
  spaceImage: string
  users: {
    name: string
    image: string
    walletAddress: string
  }
}
interface BestSpacesObject {
  count: number
  rows: SpaceObject[]
}

interface GetBestSpacesResponse {
  code: number
  data: BestSpacesObject
  message: string
  status: boolean
}

interface GetLatestSpacesResponse {
  code: number
  data: SpaceObject[]
  message: string
  status: boolean
}

interface UploadImageObject {
  status: boolean
  url?: string
}

interface UploadImageResponse {
  code: number
  data: UploadImageObject
  message: string
  status: boolean
}
