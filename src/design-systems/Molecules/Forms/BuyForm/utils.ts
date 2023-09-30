import { DeliverTypesProps } from './interface'

export const IMAGE_WIDTH = 80
export const IMAGE_HEIGHT = 80

// export const mockBuyFormProps: BuyFormProps = {
//   price: 0.55,
//   fee: 2,
//   currency: 'ETH',
//   src: 'https://i.seadn.io/gae/nukW3oqsqaxo5DyaVFJj2Ofv5vxv3ni9Fkc4reWGt9cUnSRV2fjWMhr40B2Rnpt9KsHxtVo5KqzHGxMPesHwoSnFq7ktpZD28UBZ?auto=format&w=1000',
//   seller: 'From "Name of seller here"',
//   title: 'Title of item here',
//   networkId: CLUBRARE_NETWORKS.ETHEREUM,
// }

export const calculatePrice = (price: number, feePercent: number) => {
  const fee = Number(((price * feePercent) / 100).toFixed(6))
  const total = Number((price + fee).toFixed(6))

  return { fee, total }
}

export const DELIVERY_TYPE: DeliverTypesProps = {
  ADDRESS: 'address',
  VAULT: 'vault',
}
export const DELIVERY_TYPES = [
  {
    id: DELIVERY_TYPE.ADDRESS,
    title: 'TO ADDRESS',
  },
  {
    id: DELIVERY_TYPE.VAULT,
    title: 'TO VAULT',
  },
]

export const ETH_TOKEN_TYPES = {
  AGOV: 'AGOV',
  ETH: 'ETH',
  MPWR: 'MPWR',
  USDT: 'USDT',
  WETH: 'WETH',
}

export const KLAY_TOKEN_TYPES = {
  AGOV: 'AGOV',
  KLAY: 'KLAY',
  USDT: 'USDT',
}

export const initialFormState = {
  address: '',
  city: '',
  country: '',
  email: '',
  name: '',
  phone: '',
  state: '',
  zip: '',
}
