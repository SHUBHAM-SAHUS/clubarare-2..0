import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AllDoneForm as AllDoneFormComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof AllDoneFormComponent>>()({
  title: 'Molecules/Forms/AllDoneForm',
  component: AllDoneFormComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof AllDoneFormComponent> = props => (
  <div className="max-w-[500px]">
    <AllDoneFormComponent {...props}></AllDoneFormComponent>
  </div>
)

export const AllDoneForm = Template.bind({})
AllDoneForm.args = {}
