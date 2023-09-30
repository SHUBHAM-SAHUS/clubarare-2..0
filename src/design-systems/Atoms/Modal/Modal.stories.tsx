import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Modal } from './Modal'

import { is } from 'utils'

export default is<ComponentMeta<typeof Modal>>()({
  title: 'Atoms/Modal',
  component: Modal,
  argTypes: {
    open: {
      control: 'boolean',
      defaultValue: true,
    },
  },
})

const Template: ComponentStory<typeof Modal> = props => (
  <div className="h-screen w-screen">
    <Modal open>
      <div className="h-32 w-96 items-center bg-neutral-400 text-center">This is example modal</div>
    </Modal>
  </div>
)

export const BasicModal = Template.bind({})
BasicModal.args = {}
