import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SupportTicketOverlay as SupportTicketOverlayComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof SupportTicketOverlayComponent>>()({
  title: 'Organisms/Overlays/SupportTicketOverlay',
  component: SupportTicketOverlayComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof SupportTicketOverlayComponent> = props => (
  <SupportTicketOverlayComponent {...props}></SupportTicketOverlayComponent>
)

export const MenuOverlay = Template.bind({})
MenuOverlay.args = {}
