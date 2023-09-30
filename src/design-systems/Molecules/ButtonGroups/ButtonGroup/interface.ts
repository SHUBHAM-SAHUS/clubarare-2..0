import type { PropsWithChildren } from 'react'

import { ButtonSize } from 'design-systems/Atoms/Button'

export type ButtonGroupVariant = 'primary' | 'secondary'

export type ButtonOptionProps = {
  title: string
  icon?: React.ReactElement
}

export type ButtonOption = ButtonOptionProps & {
  id: string
}

export interface ButtonGroupProps extends PropsWithChildren {
  variant?: ButtonGroupVariant
  className?: string
  value?: string | number | undefined
  size?: ButtonSize
  disabled?: boolean
  buttons: ButtonOption[]
  clickHandler?: Function
  onClick?: (id: string) => void
}
