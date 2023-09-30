import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ToolBoxOverlay as ToolBoxOverlayComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof ToolBoxOverlayComponent>>()({
  title: 'Organisms/Overlays/ToolBoxOverlay',
  component: ToolBoxOverlayComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof ToolBoxOverlayComponent> = props => (
  <ToolBoxOverlayComponent {...props}></ToolBoxOverlayComponent>
)

export const ToolBoxOverlay = Template.bind({})
ToolBoxOverlay.args = {}
