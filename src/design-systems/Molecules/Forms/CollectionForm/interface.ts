export interface CollectionFormProps {
  floorPrice?: number
  items?: number
  owners?: number
  totalView?: number
  onClick?: () => void
  collection: CollectionAssetObject
  refetchCollection?: () => void
}
