export interface TabsProps {
  tabs?: Array<string>
  currentTab?: number
  onChangeTab?: (tab: number) => void
}

export interface TabProps {
  label?: string
  active?: boolean
  onClick?: () => void
}
