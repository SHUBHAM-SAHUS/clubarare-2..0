import { AvatarSize } from './interface'

export const getAvatarSize = (size: AvatarSize) => {
  switch (size) {
    case 'extra small':
      return 'w-6 h-6'
    case 'small':
      return 'w-10 h-10'
    case 'medium':
      return 'w-12 h-12'
    case 'large':
      return 'w-16 h-16'
    default:
      throw 'Wrong Avatar size ' + size
  }
}

export const getBadgeSize = (size: AvatarSize) => {
  switch (size) {
    case 'extra small':
      return 'w-2 h-2'
    case 'small':
      return 'w-3 h-3'
    case 'medium':
      return 'w-3 h-3'
    case 'large':
      return 'w-4 h-4'
    default:
      throw 'Wrong Avatar size ' + size
  }
}
