export interface SelectProps {
  className?: string
  options?: CollectionAssetObject[]
  value?: CollectionAssetObject
  setSelectedCollectionAsset?: (value: CollectionAssetObject) => void
}
