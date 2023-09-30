import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CollectionBanner } from './CollectionBanner'

import { is } from 'utils'

export default is<ComponentMeta<typeof CollectionBanner>>()({
  title: 'Organisms/Banners/CollectionBanner',
  component: CollectionBanner,
  argTypes: {},
})

const Template: ComponentStory<typeof CollectionBanner> = props => <CollectionBanner {...props}></CollectionBanner>

export const NoImageCollectionBanner = Template.bind({})
NoImageCollectionBanner.args = {
  alt: 'collection banner image',
  collectionBannerImage: '',
}

export const ImageCollectionBanner = Template.bind({})
// ImageCollectionBanner.args = { collectionBannerImage }
