import type { PropsWithChildren } from 'react'

export interface OverlayProps extends PropsWithChildren {
  className?: string
  headerProps?: React.ReactElement
  withHeader?: boolean
  showBackDrop?: boolean
}
