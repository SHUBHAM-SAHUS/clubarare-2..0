export interface ReceiveMyItemFormParamProps {
  asset: AssetObject
  onClose: () => void
  refetchVaultDetails: () => void
}

export interface ReceiveMyItemFormProps {
  full_name: string
  email: string
  address: string
  city: string
  state: string
  zip_code: string
  country: string
  phone_number: string
}
