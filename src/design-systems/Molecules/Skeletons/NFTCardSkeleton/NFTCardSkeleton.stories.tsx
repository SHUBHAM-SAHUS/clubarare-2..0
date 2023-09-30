import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NFTCardSkeleton } from './NFTCardSkeleton'

import { is } from 'utils'

export default is<ComponentMeta<typeof NFTCardSkeleton>>()({
  title: 'Molecules/Skeletons/NFTCardSkeleton',
  component: NFTCardSkeleton,
})

const Template: ComponentStory<typeof NFTCardSkeleton> = props => (
  <div className="w-48 md:w-96">
    <NFTCardSkeleton {...props} />
  </div>
)
export const NFTCard = Template.bind({})
NFTCard.args = {}
