import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileOverlay as ProfileOverlayComponent } from './ProfileOverlay'

import { is } from 'utils'

export default is<ComponentMeta<typeof ProfileOverlayComponent>>()({
  title: 'Organisms/Overlays/ProfileOverlay',
  component: ProfileOverlayComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof ProfileOverlayComponent> = props => <ProfileOverlayComponent {...props} />

export const Disconnected = Template.bind({})
Disconnected.args = {}
