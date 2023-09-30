import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { RewardForm as RewardFormComponent } from './RewardForm'

import { is } from 'utils'

export default is<ComponentMeta<typeof RewardFormComponent>>()({
  title: 'Molecules/Forms/RewardForm',
  component: RewardFormComponent,
  argTypes: {
    className: {
      control: 'text',
      defaultValue: '',
    },
  },
})

const Template: ComponentStory<typeof RewardFormComponent> = props => (
  <div className="w-[375px]">
    <RewardFormComponent {...props}></RewardFormComponent>
  </div>
)

export const RewardForm = Template.bind({})
RewardForm.args = {}
