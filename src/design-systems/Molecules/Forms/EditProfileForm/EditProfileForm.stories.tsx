import * as React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { EditProfileForm as EditProfileFormComponent } from './EditProfileForm'

import { is } from 'utils'

export default is<ComponentMeta<typeof EditProfileFormComponent>>()({
  title: 'Molecules/Forms/EditProfileForm',
  component: EditProfileFormComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof EditProfileFormComponent> = props => (
  <div>
    <EditProfileFormComponent {...props} />
  </div>
)

export const EditProfileForm = Template.bind({})
EditProfileForm.args = {}
