import { useState } from 'react'

import { Modal } from './Modal'

export const useModal = (
  children: React.ReactNode,
  heading?: string | React.ReactElement,
  jsxElement?: JSX.Element
) => {
  const [opened, setOpened] = useState<boolean>(false)

  const open = () => {
    setOpened(true)
  }

  const close = () => {
    setOpened(false)
  }

  const Custom = () => (
    <Modal heading={heading} jsxElement={jsxElement} open={opened} onClose={close}>
      {children}
    </Modal>
  )

  return { Modal: Custom, open, close }
}
