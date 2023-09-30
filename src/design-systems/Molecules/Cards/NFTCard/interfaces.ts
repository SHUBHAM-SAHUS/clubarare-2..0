export interface NFTProduct {
  id?: string
  title: string
  price?: NFTPriceObject
  file: AssetFile
  networkId?: ClubRareNetworks
  onSale?: boolean
  collectibleOwner?: AddressString
  isHide?: boolean
  history?: HistoryObject
}
export interface NFTPriceObject {
  token?: string
  label?: string
  amount?: string | number
}

export type NFTStatus = 'future' | 'listed' | 'sold' | 'ended' | ''

export type NFTCardSize = 'small' | 'medium' | 'large'

export interface NFTUser {
  address: string
  avatar?: string
  username: string
  verified?: boolean
}

export interface NFTCardProps {
  id: string
  product: NFTProduct
  user: NFTUser
  status?: NFTStatus
  size?: NFTCardSize
  editable?: boolean
  auctionDetails?: AuctionObject
  refetchAssets?: AnyFunction
}
