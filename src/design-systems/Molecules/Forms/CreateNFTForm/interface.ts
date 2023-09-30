import type { FieldValues } from 'react-hook-form'

import { ProductType, FlowType } from 'design-systems/Organisms/Managers/NFTCreationManager'
export interface CreateNFTFormProps {
  description?: string
  email?: string
  flowType?: FlowType
  initial: { name?: string; email?: string }
  name?: string
  productType?: ProductType
  title?: string
  onNext?: (values: FieldValues) => void
  onSelectFlowType?: (flowType: FlowType) => void
  onSelectProductType?: (productType: ProductType) => void
}
