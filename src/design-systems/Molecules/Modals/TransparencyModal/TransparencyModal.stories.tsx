import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TransparencyModal } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof TransparencyModal>>()({
  title: 'Molecules/Modals/TransparencyModal',
  component: TransparencyModal,
  argTypes: {
    classNames: {
      control: 'text',
      defaultValue: '',
    },
  },
})

const Template: ComponentStory<typeof TransparencyModal> = props => <TransparencyModal {...props}></TransparencyModal>

export const ShadowModal = Template.bind({})
ShadowModal.args = {}
