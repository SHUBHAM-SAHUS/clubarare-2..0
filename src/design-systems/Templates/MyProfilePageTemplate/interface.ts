export interface MyProfilePageTemplateProps {
  filterType: FilterType
  isLoadingUserAssets: boolean
  onlyPhygitalAsset: boolean
  userAssets: AssetObject[]
  userIdOrAddress: string
  userProfile?: ProfileObject
  onToggleOnlyPhygitalAsset: () => void
  onChangeFilterType: (filterType: FilterType) => void
  refetchUserAssets: AnyFunction
}

export enum FilterType {
  Space = 'on space',
  Sale = 'on sale',
  All = 'all',
}
