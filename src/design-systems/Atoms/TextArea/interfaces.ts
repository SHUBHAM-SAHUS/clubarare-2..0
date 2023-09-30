export type TextAreaProps = Modify<
  React.HTMLProps<HTMLTextAreaElement>,
  {
    label?: string
    className?: string
    required?: boolean
  }
>
