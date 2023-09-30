import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MenuOverlay as MenuOverlayComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof MenuOverlayComponent>>()({
  title: 'Organisms/Overlays/MenuOverlay',
  component: MenuOverlayComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof MenuOverlayComponent> = props => (
  <MenuOverlayComponent {...props}></MenuOverlayComponent>
)

export const MenuOverlay = Template.bind({})
MenuOverlay.args = {}
