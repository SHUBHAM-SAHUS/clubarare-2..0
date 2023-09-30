import { IconButtonVariant } from './interface'

export const getBackgroundStyles = (variant: IconButtonVariant) => {
  switch (variant) {
    case 'black':
      return 'bg-neutral-100'
    case 'gray':
      return 'bg-transparent hover:bg-neutral-700 active:bg-neutral-700 dark:hover:bg-neutral-400 dark:active:bg-neutral-500'
    case 'transparent':
      return 'bg-transparent'
    default:
      throw 'Wrong IconButton variant ' + variant
  }
}
