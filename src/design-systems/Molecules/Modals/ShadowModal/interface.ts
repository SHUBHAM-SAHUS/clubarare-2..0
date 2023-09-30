export interface ShowModalProps {
  classNames?: string
  handleShadowModal: () => void
}

export interface CustomILayer {
  applyFilters?: () => void
  filters?: any[] // add filters property as optional
}
