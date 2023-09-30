import { ComponentMeta, ComponentStory } from '@storybook/react'

import { EditControl } from './EditControl'

import { is } from 'utils'

export default is<ComponentMeta<typeof EditControl>>()({
  title: 'Molecules/EditControl',
  component: EditControl,
  argTypes: {},
})

const Template: ComponentStory<typeof EditControl> = () => <EditControl />

export const EditControlDefault = Template.bind({})
EditControlDefault.args = {}
