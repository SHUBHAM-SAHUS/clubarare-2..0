import { FieldValues } from 'react-hook-form'

export interface DigitalNFTImageFormProps {
  attachments?: File[]
  onNext?: (values: FieldValues) => void
  onBack?: () => void
  onAddDigitalImage?: (attachments: File[]) => void
}
