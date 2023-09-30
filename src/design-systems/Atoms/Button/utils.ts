import { ButtonColor, ButtonSize, ButtonVariant } from './interface'

export const getButtonSize = (size: ButtonSize, loading: boolean, fullWidth: boolean) => {
  switch (size) {
    case 'small':
      return `${loading && !fullWidth ? 'w-70 h-30' : ''} px-lg py-sm text-sm leading-sm tracking-sm`
    case 'medium':
      return `${loading && !fullWidth ? 'w-100 h-9  ' : ''} px-2xl py-md text-md leading-md tracking-md`
    case 'large':
      return `${loading && !fullWidth ? 'w-133 h-51' : ''} px-3xl py-lg text-lg leading-lg tracking-lg`
    default:
      throw 'Wrong Button size ' + size
  }
}

export const getSolidButtonColors = (color: ButtonColor) => {
  switch (color) {
    case 'neon':
      return 'bg-brand-800 enabled:hover:bg-brand-500 enabled:active:bg-brand-hover enabled:active:border-brand-800 disabled:opacity-30 text-neutral-100'
    case 'primary':
      return 'bg-neutral-100 dark:bg-neutral-700 enabled:hover:bg-neutral-400 enabled:active:border-neutral-100 dark:enabled:hover:bg-neutral-600 enabled:active:bg-neutral-400 dark:enabled:active:bg-neutral-600 dark:enabled:active:border-neutral-700 text-neutral-700 dark:text-neutral-100 disabled:opacity-30'
    case 'secondary':
      return 'bg-transparent'
    default:
      throw 'Wrong Solid Button color ' + color
  }
}

export const getOutlineButtonColors = (color: ButtonColor) => {
  switch (color) {
    case 'neon':
      return 'bg-transparent border-brand-800 enabled:hover:bg-brand-800 enabled:hover:border-transparent enabled:active:bg-brand-800 enabled:active:border-brand-800 disabled:opacity-30 text-brand-800 enabled:active:text-neutral-100 enabled:hover:text-neutral-100'
    case 'primary':
      return 'bg-transparent border-neutral-100 dark:border-neutral-800 enabled:hover:bg-neutral-100 enabled:hover:border-transparent dark:enabled:hover:bg-neutral-700 enabled:active:bg-neutral-100 enabled:active:border-neutral-400 dark:enabled:active:bg-neutral-700 dark:enabled:active:border-neutral-600 disabled:opacity-30 text-neutral-100 dark:text-neutral-700 enabled:active:text-neutral-700 dark:enabled:active:text-neutral-100 enabled:hover:text-neutral-700 dark:enabled:hover:text-neutral-100'
    case 'secondary':
      return 'bg-transparent border-neutral-500 hover:border-neutral-400 dark:border-neutral-400 dark:hover:border-neutral-500'
    default:
      throw 'Wrong Outlined Button color ' + color
  }
}

export const getButtonColors = (color: ButtonColor, variant: ButtonVariant) => {
  switch (variant) {
    case 'solid':
      return getSolidButtonColors(color)
    case 'outlined':
      return getOutlineButtonColors(color)
    default:
      throw 'Wrong Button variant ' + variant
  }
}

export const getSolidButtonBorderStyles = (color: ButtonColor) => {
  switch (color) {
    case 'neon':
      return 'active:shadow-solid-brand-active'
    case 'primary':
      return 'active:shadow-solid-light-active dark:active:shadow-solid-dark-active'
    case 'secondary':
      return ''
    default:
      throw 'Wrong Solid Button color ' + color
  }
}

export const getOutlinedButtonBorderStyles = (color: ButtonColor) => {
  switch (color) {
    case 'neon':
      return 'shadow-outlined-brand-default active:shadow-outlined-brand-active disabled:shadow-outlined-brand-disabled'
    case 'primary':
      return 'shadow-outlined-light-default active:shadow-outlined-light-active disabled:shadow-outlined-light-disabled dark:shadow-outlined-dark-default dark:active:shadow-outlined-dark-active dark:disabled:shadow-outlined-dark-disabled'
    case 'secondary':
      return 'border'
    default:
      throw 'Wrong Solid Button color ' + color
  }
}

export const getBorderStyles = (color: ButtonColor, variant: ButtonVariant) => {
  switch (variant) {
    case 'solid':
      return getSolidButtonBorderStyles(color)
    case 'outlined':
      return getOutlinedButtonBorderStyles(color)
    default:
      throw 'Wrong Button variant ' + variant
  }
}

export const getSpinnerStokeColor = (color: ButtonColor, variant: ButtonVariant) => {
  switch (color) {
    case 'neon':
      return 'stroke-neutral-100 dark:stroke-neutral-800'
    case 'primary':
      return 'stroke-neutral-100 dark:stroke-neutral-800'
    case 'secondary':
      return 'stroke-neutral-200 dark:stroke-neutral-700'
    default:
      throw 'Wrong Solid Button color ' + color
  }
}

export const getSpinnerSize = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return 'w-4 h-4'
    case 'medium':
      return 'w-5 h-5'
    case 'large':
      return 'w-8 h-8'
    default:
      throw 'Wrong Button size ' + size
  }
}
