import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ShadowModal as ShadowModalComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof ShadowModalComponent>>()({
  title: 'Molecules/Modals/ShadowModal',
  component: ShadowModalComponent,
  argTypes: {
    classNames: {
      control: 'text',
      defaultValue: '',
    },
  },
})

const Template: ComponentStory<typeof ShadowModalComponent> = props => (
  <ShadowModalComponent {...props}></ShadowModalComponent>
)

export const ShadowModal = Template.bind({})
ShadowModal.args = {}
