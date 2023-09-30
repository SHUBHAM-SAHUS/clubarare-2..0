import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ElementTab } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof ElementTab>>()({
  title: 'Organisms/Profile/Tabs/ElementTab',
  component: ElementTab,
  argTypes: {},
})

const Template: ComponentStory<typeof ElementTab> = props => (
  <div className="h-screen w-[289px]">
    <ElementTab {...props} />
  </div>
)

export const DefaultElementTab = Template.bind({})
DefaultElementTab.args = {}
