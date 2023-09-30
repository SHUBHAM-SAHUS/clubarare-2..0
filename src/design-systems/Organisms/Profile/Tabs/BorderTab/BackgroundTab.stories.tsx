import { ComponentMeta, ComponentStory } from '@storybook/react'

import { BorderTab } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof BorderTab>>()({
  title: 'Organisms/Profile/Tabs/BorderTab',
  component: BorderTab,
  argTypes: {},
})

const Template: ComponentStory<typeof BorderTab> = props => (
  <div className="h-screen w-[289px]">
    <BorderTab {...props} />
  </div>
)

export const DefaultBorderTab = Template.bind({})
DefaultBorderTab.args = {}
