export interface CollectionUserHeader {
  avatar?: string
  creatorName?: string
  verified?: boolean
}
export interface CollectionHeaderProps {
  id?: string
  user: CollectionUserHeader
  collectionName: string
  editable?: boolean
  viewCount?: number
  description?: string
  className?: string
  onEdit?: () => void
}
