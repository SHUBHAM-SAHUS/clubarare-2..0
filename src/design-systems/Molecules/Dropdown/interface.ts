export type DropdownSize = 'extra small' | 'small' | 'medium' | 'large'

export interface DropdownOption {
  title: string
  value: string
  icon?: React.ReactNode
  badge?: string | React.ReactNode
}

export interface DropdownProps {
  options: DropdownOption[]
  value?: string
  placeholder?: string | React.ReactElement
  direction?: 'left' | 'right'
  onChange: (val: DropdownOption) => void
  className?: string
  dropdownClass?: string
  disabled?: boolean
}
