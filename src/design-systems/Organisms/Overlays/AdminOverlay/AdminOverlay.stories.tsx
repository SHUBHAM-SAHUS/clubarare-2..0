import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AdminOverlay as AdminOverlayComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof AdminOverlayComponent>>()({
  title: 'Organisms/Overlays/AdminOverlay',
  component: AdminOverlayComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof AdminOverlayComponent> = props => (
  <AdminOverlayComponent {...props}></AdminOverlayComponent>
)

export const AdminOverlay = Template.bind({})
AdminOverlay.args = {}
