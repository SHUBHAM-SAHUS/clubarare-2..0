export interface BuyFormProps {
  asset: AssetObject
  onClose: () => void
}

export interface DeliverFormProps {
  name: string
  email: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
}

export interface DeliverTypesProps {
  ADDRESS: string
  VAULT: string
}
