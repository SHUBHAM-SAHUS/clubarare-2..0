import { FieldValues } from 'react-hook-form'

export interface AttributeCollectionFormProps {
  attributes?: {
    [key: string]: string
  }
  collections?: CollectionAssetObject[]
  collection?: CollectionAssetObject
  onNext?: (values: FieldValues) => void
  onBack?: () => void
  onCreateCollection?: () => void
  onSelectCollection: (collection: CollectionAssetObject) => void
}
