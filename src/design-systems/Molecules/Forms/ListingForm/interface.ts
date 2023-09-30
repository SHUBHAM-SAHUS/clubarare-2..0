import type { FieldValues } from 'react-hook-form'

import type { CurrencyType, ListingType, NetworkType } from 'design-systems/Organisms/Managers/NFTCreationManager'

export interface ListingFormProps {
  auctionType?: string
  burnable?: boolean
  endDate?: Date
  listingType?: ListingType
  network?: NetworkType
  price?: number
  royalties: number
  startDate?: Date
  isTokenGated: boolean
  onBack?: () => void
  onNext?: (values: FieldValues) => void
  onSelectBurnable?: (burnable: boolean) => void
  onSelectCurrency?: (currency: CurrencyType) => void
  onSelectListingType?: (listingType: ListingType) => void
  onSelectIsTokenGated?: (isTokenGated: boolean) => void
}
