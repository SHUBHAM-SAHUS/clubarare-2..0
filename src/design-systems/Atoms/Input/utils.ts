import { InputVariant } from './interfaces'

export const getBackgroundStyles = (variant: InputVariant) => {
  switch (variant) {
    case 'primary':
      return 'bg-neutral-800 dark:bg-neutral-200'
    case 'secondary':
      return 'bg-neutral-800 dark:bg-neutral-300'
    case 'fill':
      return 'bg-neutral-700 dark:bg-neutral-400'
    default:
      throw 'Wrong Input variant ' + variant
  }
}

export const getBorderStyles = (variant: InputVariant) => {
  switch (variant) {
    case 'primary':
      return 'border-b'
    case 'secondary':
    case 'fill':
      return 'border rounded-xl'
    default:
      throw 'Wrong Input variant ' + variant
  }
}

export const getPaddingStyles = (variant: InputVariant, hasLeftIcon: boolean, hasAction: boolean) => {
  let className = ''
  if (hasLeftIcon) {
    className += ' pl-4xl'
  }

  if (hasAction) {
    className += ' pr-64'
  }

  switch (variant) {
    case 'primary':
      className += hasLeftIcon || hasAction ? ' py-2' : ' py-1'
      break
    case 'secondary':
    case 'fill':
      className += !hasLeftIcon && !hasAction ? ' px-4' : hasLeftIcon ? ' pr-4' : ' pl-4'
      className += ' py-2'
      break
  }

  return className
}

export const getPlaceholderStyles = (variant: InputVariant) => {
  switch (variant) {
    case 'primary':
      return 'placeholder:text-neutral-600 dark:placeholder:text-neutral-400'
    case 'secondary':
      return 'placeholder:text-neutral-500'
    case 'fill':
      return 'placeholder:text-neutral-600 dark:placeholder:text-neutral-500'
  }
}
