import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AuthenticateForm as AuthenticateFormComponent } from './AuthenticateForm'
import { categories } from './utils'

import { is } from 'utils'

export default is<ComponentMeta<typeof AuthenticateFormComponent>>()({
  title: 'Molecules/Forms/AuthenticateForm',
  component: AuthenticateFormComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof AuthenticateFormComponent> = props => (
  <div className="md:w-[568px]">
    <AuthenticateFormComponent {...props} />
  </div>
)

export const AuthenticateForm = Template.bind({})
AuthenticateForm.args = {}
