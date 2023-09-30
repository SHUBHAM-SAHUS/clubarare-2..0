import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DisplayPlaceholder } from './DisplayPlaceholder'

import { is } from 'utils'

export default is<ComponentMeta<typeof DisplayPlaceholder>>()({
  title: 'Molecules/DisplayPlaceholder',
  component: DisplayPlaceholder,
  argTypes: {},
})

const Template: ComponentStory<typeof DisplayPlaceholder> = props => <DisplayPlaceholder {...props} />

export const DefaultDisplayPlaceholder = Template.bind({})
DefaultDisplayPlaceholder.args = {}
