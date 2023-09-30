export type IconButtonVariant = 'black' | 'gray' | 'transparent'

export type IconButtonProps = Modify<
  React.HTMLProps<HTMLButtonElement>,
  {
    className?: string
    variant?: IconButtonVariant
  }
>
