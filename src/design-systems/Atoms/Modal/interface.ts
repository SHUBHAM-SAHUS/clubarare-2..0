import { PropsWithChildren } from 'react'

export interface ModalProps extends PropsWithChildren {
  open?: boolean
  onClose?: () => void
  heading?: string | React.ReactElement
  jsxElement?: JSX.Element
  className?: string
}
