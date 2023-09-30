import type { FieldValues } from 'react-hook-form'

export interface CreateCollectionFormProps {
  onNext?: (values: FieldValues) => void
  onBack?: () => void
  onCreateNewCollection?: (values: FieldValues) => void
}
