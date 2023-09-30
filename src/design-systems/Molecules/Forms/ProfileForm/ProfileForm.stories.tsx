import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileForm as ProfileFormComponent } from './ProfileForm'

import { is } from 'utils'

export default is<ComponentMeta<typeof ProfileFormComponent>>()({
  title: 'Molecules/Forms/ProfileForm',
  component: ProfileFormComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof ProfileFormComponent> = props => (
  <div className="w-[375px]">
    <ProfileFormComponent />
  </div>
)

export const ProfileForm = Template.bind({})
ProfileForm.args = {}
