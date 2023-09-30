import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CollectionHeader as CollectionComponent } from './CollectionHeader'

import { is } from 'utils'

export default is<ComponentMeta<typeof CollectionComponent>>()({
  title: 'Molecules/Headers/CollectionHeader',
  component: CollectionComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof CollectionComponent> = props => (
  <CollectionComponent {...props}></CollectionComponent>
)

const CollectionUser = {
  avatar: 'string',
  creatorName: 'clubrare',
  verified: true,
}

const CollectionProps = {
  user: CollectionUser,
  viewCount: 0,
  description:
    '10% of token pool reserved for rewards, and stake LP NFTs for 180% APR. 10% of token pool reserved for rewards, and stake LP NFTs for 180% APR. 10% of token pool reserved for rewards, and stake LP NFTs for 180% APR. 10% of token pool reserved for rewards, and stake LP NFTs for 180% APR. 10% of token pool reserved for rewards, and stake LP NFTs for 180% AP...',
  editable: true,
}

export const collection = Template.bind({})
collection.args = CollectionProps
