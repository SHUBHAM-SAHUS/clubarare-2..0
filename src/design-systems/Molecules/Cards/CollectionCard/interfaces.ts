export interface CollectionProduct {
  title: string
  price?: CollectionPriceObject
  file: AssetFile
  networkId?: ClubRareNetworks
}
export interface CollectionPriceObject {
  token?: string
  label?: string
  amount?: string | number
}

export type CollectionStatus = 'listed' | 'sold' | 'ended' | ''

export type CollectionCardSize = 'small' | 'medium' | 'large'

export interface CollectionUser {
  avatar?: string
  username: string
  verified?: boolean
}

export interface CollectionCardProps {
  id: string
  product: CollectionProduct
  user: CollectionUser
  status?: CollectionStatus
  size?: CollectionCardSize
  editable?: boolean
  auctionDetails?: AuctionObject
}
