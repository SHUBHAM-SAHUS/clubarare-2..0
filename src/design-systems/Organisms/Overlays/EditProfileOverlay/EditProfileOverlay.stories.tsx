import { ComponentMeta, ComponentStory } from '@storybook/react'

import { EditProfileOverlay as EditProfileOverlayComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof EditProfileOverlayComponent>>()({
  title: 'Organisms/Overlays/EditProfileOverlay',
  component: EditProfileOverlayComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof EditProfileOverlayComponent> = props => (
  <EditProfileOverlayComponent {...props}></EditProfileOverlayComponent>
)

export const EditProfileOverlay = Template.bind({})
EditProfileOverlay.args = {}
