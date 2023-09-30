import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CollectionCard } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof CollectionCard>>()({
  title: 'Molecules/Cards/CollectionCard',
  component: CollectionCard,
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    },
    user: {
      table: {
        disabled: true,
      },
    },
    product: {
      table: {
        disabled: true,
      },
    },
    status: {
      control: 'select',
      options: ['listed', 'sold'],
    },
    editable: {
      control: 'boolean',
      defaultValue: true,
    },
  },
})

const MOCK_USER = {
  id: 1,
  username: 'lazy-club',
  avatar:
    'https://i.seadn.io/gae/nukW3oqsqaxo5DyaVFJj2Ofv5vxv3ni9Fkc4reWGt9cUnSRV2fjWMhr40B2Rnpt9KsHxtVo5KqzHGxMPesHwoSnFq7ktpZD28UBZ?auto=format&w=1000',
  verified: true,
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

const Template: ComponentStory<typeof CollectionCard> = props => (
  <div className="w-[300px]">
    <CollectionCard {...props} product={MOCK_PRODUCT} user={MOCK_USER} />
  </div>
)

export const Small = Template.bind({})
Small.args = {
  size: 'small',
}

export const Medium = Template.bind({})
Medium.args = {
  size: 'medium',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
}
