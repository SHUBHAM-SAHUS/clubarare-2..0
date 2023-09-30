import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useCallback } from 'react'

import { BuyModal as Content } from './BuyModal'
import { mockItem } from './utils'

import { Modal } from 'design-systems/Atoms/Modal'
import { Button } from 'design-systems/Atoms/Button'
import { useModal } from 'design-systems/Atoms/Modal'
import { is } from 'utils'

export default is<ComponentMeta<typeof Modal>>()({
  title: 'Molecules/Modals/BuyModal',
})

const Template: ComponentStory<typeof Modal> = props => {
  const onCloseBuyModal = useCallback(() => {
    closeBuyModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    Modal: BuyModal,
    open,
    close: closeBuyModal,
  } = useModal(<Content asset={mockItem} onClose={onCloseBuyModal} />, 'Buy Now')

  return (
    <div className="h-screen w-screen">
      <Button onClick={open}>Open Dialog</Button>
      <BuyModal />
    </div>
  )
}

export const Blank = Template.bind({})
Blank.args = {}
