import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProductCard as ProductCardComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof ProductCardComponent>>()({
  title: 'Molecules/Cards/ProductCard',
  component: ProductCardComponent,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
    avatar: {
      control: 'text',
      defaultValue:
        'https://i.seadn.io/gae/nukW3oqsqaxo5DyaVFJj2Ofv5vxv3ni9Fkc4reWGt9cUnSRV2fjWMhr40B2Rnpt9KsHxtVo5KqzHGxMPesHwoSnFq7ktpZD28UBZ?auto=format&w=1000',
    },
    creatorName: {
      control: 'text',
      defaultValue: 'lazy-roy',
    },
    verified: {
      control: 'boolean',
      defaultValue: true,
    },
    type: {
      control: 'select',
      options: ['phygital', 'digital'],
      defaultValue: 'phygital',
    },
    title: {
      control: 'text',
      defaultValue: 'NIKE AIR JORDAN “ALL-STAR” BUDWEISER SNEAKERS',
    },
    status: {
      control: 'select',
      options: ['placeBid', 'buyNow', 'sold', 'owner'],
      defaultValue: 'placeBid',
    },
    description: {
      control: 'text',
      defaultValue:
        '10% of token pool reserved for rewards, and stake LP NFTs for 180% APR. 10% of token pool reserved for rewards, and stake LP NFTs for 180% APR. 10% of token pool reserved for rewards, and stake LP NFTs for 180% APR. 10% of token pool reserved for rewards, and stake LP NFTs for 180% APR. 10% of token pool reserved for rewards, and stake LP NFTs for 180% APR. 10% of token pool reserved for rewards, and stake LP NFTs for 180% APR. 10% of token pool reserved for rewards, and stake LP NFTs for 180% APR. 10% of token pool reserved for rewards, and stake LP NFTs for 180% APR. 10% of token pool reserved for rewards, and stake LP NFTs for 180% APR. 10% of token pool reserved for rewards, and stake LP NFTs for 180% AP...',
    },
    isAuthenticated: {
      control: 'boolean',
      defaultValue: true,
    },
  },
})

const Template: ComponentStory<typeof ProductCardComponent> = props => <ProductCardComponent {...props} />

export const ProductCard = Template.bind({})
ProductCard.args = {}
