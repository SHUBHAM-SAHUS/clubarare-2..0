import { FieldValues } from 'react-hook-form'

export interface AuthenticateFormProps {
  authFiles?: DefaultImages
  brand?: CollectionAssetObject
  category?: CategoryObject
  credit?: number
  isLuxuryAuthReq?: boolean
  isWhiteListedSeller?: boolean
  onAddAuthImages?: (authFiles: DefaultImages) => void
  onBack?: () => void
  onChangeBrand?: (brand: CollectionAssetObject) => void
  onChangeIsLuxuryAuthReq?: (isLuxuryAuthReq: boolean) => void
  onNext?: (values: FieldValues) => void
  onSelectCategory?: (category: CategoryObject) => void
}

export interface AuthenticateFormError {
  categoryError?: string
  nftError?: string
}
export interface DefaultImages {
  [key: string]: File
}
