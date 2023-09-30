import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Space } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof Space>>()({
  title: 'Organisms/Profile/Space',
  component: Space,
  argTypes: {
    isConnected: {
      control: 'boolean',
      defaultValue: false,
    },
    isEmptySpace: {
      control: 'boolean',
      defaultValue: false,
    },
  },
})

const Template: ComponentStory<typeof Space> = props => <Space {...props}></Space>

export const SpaceComponent = Template.bind({})
SpaceComponent.args = {
  isConnected: false,
  isEmptySpace: true,
}
