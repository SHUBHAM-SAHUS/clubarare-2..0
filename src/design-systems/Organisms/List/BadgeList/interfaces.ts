export interface BadgeListProps<T extends string> {
  className?: string
  options: Array<{
    value: T
    title: string
  }>
  initialSelectedOption?: T
  deselectable?: boolean
  onSelectOption: (option?: T) => void
}
