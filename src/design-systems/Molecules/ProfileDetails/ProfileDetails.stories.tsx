import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileDetailsOverlay as ProfileDetailsOverlayComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof ProfileDetailsOverlayComponent>>()({
  title: 'Molecules/ProfileDetails',
  component: ProfileDetailsOverlayComponent,
  argTypes: {
    className: {
      control: 'text',
      defaultValue: '',
    },
    mode: {
      control: 'select',
      options: ['Empty', 'Filled'],
      defaultValue: 'Filled',
    },
    view: {
      control: 'select',
      options: ['Owner', 'Visitor'],
      defaultValue: 'Owner',
    },
  },
})

const Template: ComponentStory<typeof ProfileDetailsOverlayComponent> = props => (
  <ProfileDetailsOverlayComponent {...props}></ProfileDetailsOverlayComponent>
)

const socialMediaLink = {
  instagram: 'https://www.instagram.com/clubrare/',
  twitter: 'https://twitter.com/clubrare_nft',
  youtube: 'https://www.youtube.com/clubrare',
}

const userDeatil = {
  walletAddress: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532b',
  profileName: 'NAEEM KHAN',
  profileDetails: 'Naeem Khan is an Indian-American fashion designer based in New York',
  verification: 'verified',
  followingCount: 856,
  followersCount: 3002,
  socialMediaLink: socialMediaLink,
}

export const ProfileDetails = Template.bind({})
ProfileDetails.args = {
  userDetails: userDeatil,
}
