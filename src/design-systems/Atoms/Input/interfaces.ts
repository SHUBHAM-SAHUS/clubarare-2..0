/**
 * `primary` is squared & only bottom bordered input
 * `secondary` is rounded & bordered input
 * `fill` is rounded & bordered & backgrounded input
 */
export type InputVariant = 'primary' | 'secondary' | 'fill'

export type InputProps = Modify<
  React.HTMLProps<HTMLInputElement>,
  {
    label?: string
    className?: string

    error?: string

    icon?: React.ReactElement
    iconClassName?: string

    action?: React.ReactElement

    variant?: InputVariant

    required?: boolean

    onAction?: () => void

    labelClassName?: string

    inputClassName?: string
  }
>
