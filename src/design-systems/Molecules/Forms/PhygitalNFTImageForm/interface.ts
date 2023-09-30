import { FieldValues } from 'react-hook-form'

export interface PhygitalNFTImageFormProps {
  additionalImages: AdditionalImages
  attachments?: File[]
  authFiles?: defaultImages
  categories: CategoryObject[]
  category?: CategoryObject
  onNext?: (values: FieldValues) => void
  onBack?: () => void
  onAddAuthImages?: (authFiles: defaultImages) => void
  onAddPhygitalAdditionalImages?: (additionalImages?: AdditionalImages) => void
  onAddPhygitalImage?: (attachments: File[]) => void
  onChangeBrand?: (brand: CollectionAssetObject) => void
  onSelectCategory?: (category: CategoryObject) => void
}

export interface AdditionalImages {
  [key: string]: File
}
export interface AuthenticateFormError {
  categoryError?: string
  nftError?: string
}
export interface defaultImages {
  [key: string]: File
}
