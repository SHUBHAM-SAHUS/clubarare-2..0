import { PriceCardSize } from './PriceCard'

export const getSizeStyles = (size: PriceCardSize) => {
  switch (size) {
    case 'small':
      return 'small'
    case 'medium':
      return 'paragraph'
    case 'large':
      return 'h4'
    default:
      throw 'Wrong PriceCard variant ' + size
  }
}

export const getPriceStyles = (size: PriceCardSize) => {
  switch (size) {
    case 'small':
      return ''
    case 'medium':
      return 'text-small font-normal leading-small tracking-small md:text-paragraph md:leading-paragraph md:tracking-paragraph md:font-medium'
    case 'large':
      return 'text-paragraph font-medium leading-paragraph tracking-paragraph md:text-h4 md:font-bold md:leading-h4 md:tracking-h4'
    default:
      throw 'Wrong PriceCard variant ' + size
  }
}
