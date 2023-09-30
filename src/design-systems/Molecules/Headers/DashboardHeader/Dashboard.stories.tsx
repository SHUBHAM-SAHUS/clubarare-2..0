import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DashboardHeader as DashboardComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof DashboardComponent>>()({
  title: 'Molecules/Headers/DashboardHeader',
  component: DashboardComponent,
  argTypes: {
    className: {
      control: 'text',
      defaultValue: '',
    },
  },
})

const Template: ComponentStory<typeof DashboardComponent> = props => (
  <DashboardComponent {...props}></DashboardComponent>
)

const nftDetails = {
  totalSales: 76975.04,
  nftsListed: 145,
  nftsSold: 137,
  totalViews: 32576,
  collections: 12,
}

const userDeatil = {
  walletAddress: '0x2fb9a762ab5ff250c9a740a5a26a1a2411c3532b',
  profileName: 'NAEEM KHAN',
  profileDetails: 'Naeem Khan is an Indian-American fashion designer based in New York',
  verification: 'verified',
  followingCount: 267,
  followersCount: 3001,
  nftDetails: nftDetails,
}

export const dashboard = Template.bind({})
dashboard.args = {
  userDetails: userDeatil,
}
