import { DeliverFormProps } from '../BuyForm'

export interface BidFormProps {
  asset: AssetObject
  onClose: () => void
}

export interface InitialFormProps extends DeliverFormProps {
  bidAmount: string
}
