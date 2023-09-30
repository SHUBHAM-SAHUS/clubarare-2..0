export const IMAGE_WIDTH = 80
export const IMAGE_HEIGHT = 80

export const calculatePrice = (price: number, feePercent: number) => {
  const fee = Number(((price * feePercent) / 100).toFixed(6))
  const total = Number(price.toFixed(6))

  return { fee, total }
}

export const initialFormState = {
  address: '',
  bidAmount: '',
  city: '',
  country: '',
  email: '',
  name: '',
  phone: '',
  state: '',
  zip: '',
}
