import { ReactElement } from 'react'

export interface AlertProps {
  alertTime?: number
  alertType?: 'warning' | 'success' | 'error' | 'banner'
  buttonColor?: 'white' | 'neon'
  className?: string
  icon?: ReactElement
  isShowAlert?: boolean
  isShowButton?: boolean
  message?: string | ReactElement
  onClose?: () => void
}
