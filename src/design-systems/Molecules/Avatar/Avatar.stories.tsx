import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Avatar } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof Avatar>>()({
  title: 'Molecules/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['extra small', 'small', 'medium', 'large'],
      defaultValue: 'medium',
    },
    className: {
      table: {
        disabled: true,
      },
    },
    verified: {
      control: 'boolean',
    },
  },
})

const Template: ComponentStory<typeof Avatar> = props => <Avatar {...props}>Click Me</Avatar>

export const ExtraSmallAvatar = Template.bind({})
ExtraSmallAvatar.args = {
  size: 'extra small',
}

export const SmallAvatar = Template.bind({})
SmallAvatar.args = {
  size: 'small',
}

export const MediumAvatar = Template.bind({})
MediumAvatar.args = {
  size: 'medium',
}

export const LargeAvatar = Template.bind({})
LargeAvatar.args = {
  size: 'large',
}

export const DynamicAvatar = Template.bind({})
DynamicAvatar.args = {
  size: 'large',
  src: 'https://i.seadn.io/gae/nukW3oqsqaxo5DyaVFJj2Ofv5vxv3ni9Fkc4reWGt9cUnSRV2fjWMhr40B2Rnpt9KsHxtVo5KqzHGxMPesHwoSnFq7ktpZD28UBZ?auto=format&w=1000',
}
