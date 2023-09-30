import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileData as ProfileDataComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof ProfileDataComponent>>()({
  title: 'Organisms/ProfileData',
  component: ProfileDataComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof ProfileDataComponent> = props => (
  <ProfileDataComponent {...props}></ProfileDataComponent>
)

export const ProfileData = Template.bind({})
ProfileData.args = {
  totalSales: 10000,
  listedNfts: 100,
  soldNfts: 234,
  totalViews: 827434,
  collections: 4,
}
