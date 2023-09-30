import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileCard } from '.'

import { is } from 'utils'

const MOCK_BIO =
  '10% of token pool reserved for rewards, and stake LP NFTs for 180% APR. 10% of token pool reserved for rewards, and stake LP NFTs for 180% APR. 10% of token pool reserved for rewards, and stake LP NFTs for 180% APR. 10% of token pool reserved for rewards, and stake LP NFTs for 180% APR. 10% of token pool reserved for rewards, and stake LP NFTs for 180% AP...'

export default is<ComponentMeta<typeof ProfileCard>>()({
  title: 'Molecules/Cards/ProfileCard',
  component: ProfileCard,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
    initialShowBio: {
      control: 'boolean',
      defaultValue: false,
    },
    avatar: {
      control: 'text',
      defaultValue:
        'https://i.seadn.io/gae/nukW3oqsqaxo5DyaVFJj2Ofv5vxv3ni9Fkc4reWGt9cUnSRV2fjWMhr40B2Rnpt9KsHxtVo5KqzHGxMPesHwoSnFq7ktpZD28UBZ?auto=format&w=1000',
    },
    username: {
      control: 'text',
      defaultValue: 'lazy-andy',
    },
    bio: {
      control: 'text',
      defaultValue: MOCK_BIO,
    },
    verified: {
      control: 'boolean',
      defaultValue: true,
    },
    editable: {
      control: 'boolean',
      defaultValue: true,
    },
    instagram: {
      control: 'text',
      defaultValue: 'https://instagram.com',
    },
    twitter: {
      control: 'text',
      defaultValue: 'https://twitter.com',
    },
    youtube: {
      control: 'text',
      defaultValue: 'https://youtube.com',
    },
    views: {
      control: 'number',
      defaultValue: 7345,
    },
  },
})

const Template: ComponentStory<typeof ProfileCard> = props => <ProfileCard {...props} />

export const EditableProfileCard = Template.bind({})
EditableProfileCard.args = {
  editable: true,
}

export const NonEditableProfileCard = Template.bind({})
NonEditableProfileCard.args = {
  editable: false,
}
