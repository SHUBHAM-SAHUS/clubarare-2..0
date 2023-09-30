import { ComponentMeta, ComponentStory } from '@storybook/react'

import { mockEmotionCounts } from './utils'

import { EmojiButtonGroup as EmojiButtonGroupComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof EmojiButtonGroupComponent>>()({
  title: 'Molecules/ButtonGroups/EmojiButtonGroup',
  component: EmojiButtonGroupComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof EmojiButtonGroupComponent> = () => (
  <EmojiButtonGroupComponent initialCount={mockEmotionCounts} isSigned={false} userProfileId="1" walletAddress="" />
)

export const EmojiButtonGroup = Template.bind({})
EmojiButtonGroup.args = {}
