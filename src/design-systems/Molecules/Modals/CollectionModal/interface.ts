import { StaticImageData } from 'next/image'
export interface CollectionModalNFT {
  banner_image: StaticImageData | string
  displayName?: string
  checkBox?: boolean
}
export interface CollectionModalProps {
  onClose?: () => void
  height?: number
  width?: number
  modal?: boolean
  collectionId?: string
  NFTDetails?: AssetObject[]
  changeNFT: (data: any) => Promise<void>
}
