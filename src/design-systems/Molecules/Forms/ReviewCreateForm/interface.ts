import { FieldValues } from 'react-hook-form'

import { CurrencyType, ListingType, NetworkType } from 'design-systems/Organisms/Managers/NFTCreationManager'

export interface ReviewCreateFormProps {
  agreement?: boolean
  attachments?: File[]
  category?: CategoryObject
  collection?: CollectionAssetObject
  currency?: CurrencyType
  endDate?: Date
  listingType?: ListingType
  name?: string
  network?: NetworkType
  price?: number
  startDate?: Date
  title?: string
  onNext?: (values: FieldValues) => void
  onBack?: (values: { stepId: number } | {}) => void
  onUserAgreement: (checked: boolean) => void
  onCreateCollectible: (nonce: BigNumber) => {}
}

export interface ListItemProps {
  label: string
  value: string
}

export interface AgreementState {
  checked: boolean
  error: boolean
}
