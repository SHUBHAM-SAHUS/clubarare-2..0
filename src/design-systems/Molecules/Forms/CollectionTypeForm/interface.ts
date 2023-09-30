import { FieldValues } from 'react-hook-form'

import { CollectionType } from 'design-systems/Organisms/Managers/NFTCreationManager'

export interface CollectionTypeFormProps {
  collectionType?: CollectionType
  onNext?: (values: FieldValues) => void
  onBack?: () => void
  onSelectCollectionType?: (collectionType: CollectionType) => void
}
