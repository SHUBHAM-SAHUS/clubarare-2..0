import { PhygitalIcon, AuthenticationIcon, DigitalIcon } from '../Icons'

import { BadgeVariant, BadgeSize } from './interface'

export const getBadgeType = (variant: BadgeVariant) => {
  switch (variant) {
    case 'sale-type':
      return 'text-neutral-600 px-4 py-1 bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-100'
    case 'phygital':
      return 'text-neutral-600 px-4 py-1 bg-secondary-800'
    case 'digital':
      return 'text-neutral-600 px-4 py-1 bg-warning-800'
    case 'authenticated':
      return 'text-neutral-100 dark:text-neutral-600'
    case 'failed':
      return 'text-error-800'
    default:
      throw 'Wrong Badge Type ' + variant
  }
}

export const getBadgeIconColor = (variant: BadgeVariant) => {
  switch (variant) {
    case 'sale-type':
      return 'bg-neutral-100 dark:bg-neutral-700'
    case 'phygital':
      return 'bg-secondary-800'
    case 'digital':
      return 'bg-warning-800'
    case 'authenticated':
    case 'failed':
      return ''
    default:
      return 'bg-neutral-100'
  }
}

export const getBadgeSize = (size: BadgeSize) => {
  switch (size) {
    case 'small':
      return 'text-sm leading-sm tracking-sm'
    case 'medium':
      return 'text-md leading-md tracking-md'
    case 'large':
      return 'text-lg leading-lg tracking-lg'
    default:
      return ''
  }
}

export const getIconSize = (size: BadgeSize) => {
  switch (size) {
    case 'small':
      return 'w-5 h-5'
    case 'medium':
      return 'w-6 h-6'
    case 'large':
      return 'w-7 h-7'
    default:
      return 'w-5 h-5'
  }
}

export const renderIcon = (variant: BadgeVariant) => {
  switch (variant) {
    case 'phygital':
      return PhygitalIcon
    case 'digital':
      return DigitalIcon
    case 'authenticated':
      return AuthenticationIcon
    default:
      return PhygitalIcon
  }
}
