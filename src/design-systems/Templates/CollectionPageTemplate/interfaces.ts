export interface CollectionPageTemplateProps {
  collection: CollectionInfoObject
  creator: ProfileObject
  assets: AssetObject[]
  hasMoreAssets: boolean
  isLoadingAssets: boolean
  isFetchingMoreAssets: boolean
  onFetchMoreAssets: () => void
  onRefetchAssets: (saleType: SaleType) => void
  onListAssetsToCollection: (assetIds: string[]) => Promise<void>
  onRefetchCollectionDetail: () => void
  refetchCollectionAssets?: AnyFunction
}
