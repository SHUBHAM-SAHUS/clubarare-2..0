import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Header } from '.'

import { is, MOCK_IMAGES } from 'utils'

export default is<ComponentMeta<typeof Header>>()({
  title: 'Organisms/Profile/Tabs/Header',
  component: Header,
  argTypes: {},
})

const Template: ComponentStory<typeof Header> = props => (
  <div className="h-screen w-[70px]">
    <Header {...props} />
  </div>
)

export const DefaultHeader = Template.bind({})
DefaultHeader.args = {}
