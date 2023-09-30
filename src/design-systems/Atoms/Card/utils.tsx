import { CardVariant } from '.'

export const getVariantStyle = (variant: CardVariant) => {
  switch (variant) {
    case 'small':
      return 'p-sm'
    case 'medium':
      return 'p-md'
    case 'large':
      return 'p-lg'
    case 'x-large':
      return 'p-xl'
    case '2x-large':
      return 'p-2xl'
    default:
      throw 'Wrong Card Variant ' + variant
  }
}
