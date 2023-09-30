import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SupportTicketForm as SupportTicketFormComponent } from './SupportTicketForm'

import { is } from 'utils'

export default is<ComponentMeta<typeof SupportTicketFormComponent>>()({
  title: 'Molecules/Forms/SupportTicketForm',
  component: SupportTicketFormComponent,
  argTypes: {
    className: {
      control: 'text',
      defaultValue: '',
    },
  },
})

const Template: ComponentStory<typeof SupportTicketFormComponent> = props => (
  <div className="w-[375px]">
    <SupportTicketFormComponent {...props}></SupportTicketFormComponent>
  </div>
)

export const SupportTicketForm = Template.bind({})
SupportTicketForm.args = {}
