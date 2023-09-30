import { ButtonGroupVariant } from './interface'

export const getButtonGroupBgStyles = (variant: ButtonGroupVariant) => {
  switch (variant) {
    case 'primary':
      return 'bg-neutral-800 dark:bg-transparent'
    case 'secondary':
      return 'bg-neutral-700 dark:bg-neutral-400'
    default:
      throw 'Wrong ButtonGroup Variant ' + variant
  }
}

export const MOCK_BUTTONS = [
  {
    id: 'button-1',
    title: 'BUTTON 1',
  },
  {
    id: 'button-2',
    title: 'BUTTON 2',
  },
  {
    id: 'button-3',
    title: 'BUTTON 3',
  },
]
