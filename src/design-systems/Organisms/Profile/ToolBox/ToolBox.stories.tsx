import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ToolBox } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof ToolBox>>()({
  title: 'Organisms/Profile/ToolBox',
  component: ToolBox,
  argTypes: {},
})

const Template: ComponentStory<typeof ToolBox> = props => (
  <div className="h-screen w-[375px]">
    <ToolBox {...props} />
  </div>
)

export const DefaultToolBox = Template.bind({})
DefaultToolBox.args = {}
