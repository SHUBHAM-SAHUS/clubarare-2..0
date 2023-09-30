import { BannerAlignment } from './interface'

export const getBannerHeight = (align: BannerAlignment) => {
  switch (align) {
    case 'left':
      return 'h-[228px]'
    case 'right':
      return ''
    case 'center':
      return ''
    default:
      throw 'Wrong Banner Image Alignment' + align
  }
}

export const getAlignmentStyles = (align: BannerAlignment) => {
  switch (align) {
    case 'left':
      return 'md:flex-row flex-col'
    case 'right':
      return 'md:flex-row-reverse flex-col-reverse'
    case 'center':
      return 'flex-col'
    default:
      throw 'Wrong Banner Image Alignment' + align
  }
}
