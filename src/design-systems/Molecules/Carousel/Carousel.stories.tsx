import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NFTCard } from '../Cards/NFTCard'

import { CardCarousel } from '.'

import { is } from 'utils'

const MOCK_USER = {
  id: 1,
  username: 'lazy-club',
  avatar:
    'https://i.seadn.io/gae/nukW3oqsqaxo5DyaVFJj2Ofv5vxv3ni9Fkc4reWGt9cUnSRV2fjWMhr40B2Rnpt9KsHxtVo5KqzHGxMPesHwoSnFq7ktpZD28UBZ?auto=format&w=1000',
  verified: true,
  address: '0x123',
}

const MOCK_PRODUCT = {
  src: 'https://i.seadn.io/gae/nukW3oqsqaxo5DyaVFJj2Ofv5vxv3ni9Fkc4reWGt9cUnSRV2fjWMhr40B2Rnpt9KsHxtVo5KqzHGxMPesHwoSnFq7ktpZD28UBZ?auto=format&w=1000',
  title: 'Lazy LEO #3932',
  file: {
    alt: 'lazy-leo',
    src: 'https://i.seadn.io/gae/nukW3oqsqaxo5DyaVFJj2Ofv5vxv3ni9Fkc4reWGt9cUnSRV2fjWMhr40B2Rnpt9KsHxtVo5KqzHGxMPesHwoSnFq7ktpZD28UBZ?auto=format&w=1000',
    type: 'image/webp',
  },
}

export default is<ComponentMeta<typeof CardCarousel>>()({
  title: 'Molecules/Carousel',
  component: CardCarousel,
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4],
      defaultValue: 4,
    },
    withArrows: {
      control: 'boolean',
      defaultValue: true,
    },
    withIndicators: {
      control: 'boolean',
      defaultValue: true,
    },
    className: {
      table: {
        disabled: true,
      },
    },
  },
})

const Template: ComponentStory<typeof CardCarousel> = props => <CardCarousel {...props}>Click Me</CardCarousel>

export const CarouselSlider = Template.bind({})
CarouselSlider.args = {
  cols: 4,
  elements: [
    <NFTCard id={'1'} key={1} product={MOCK_PRODUCT} size="large" status="listed" user={MOCK_USER} />,
    <NFTCard id={'2'} key={2} product={MOCK_PRODUCT} size="large" status="listed" user={MOCK_USER} />,
    <NFTCard id={'3'} key={3} product={MOCK_PRODUCT} size="large" status="listed" user={MOCK_USER} />,
    <NFTCard id={'4'} key={4} product={MOCK_PRODUCT} size="large" status="listed" user={MOCK_USER} />,
    <NFTCard id={'5'} key={5} product={MOCK_PRODUCT} size="large" status="listed" user={MOCK_USER} />,
  ],
}
