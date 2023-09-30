import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Tabs } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof Tabs>>()({
  title: 'Atoms/Tabs',
  component: Tabs,
  argTypes: {},
})

const Template: ComponentStory<typeof Tabs> = props => <Tabs {...props} />

export const Default = Template.bind({})
Default.args = {
  tabs: ['Item 1', 'Item 2', 'Item 3'],
  currentTab: 0,
}
