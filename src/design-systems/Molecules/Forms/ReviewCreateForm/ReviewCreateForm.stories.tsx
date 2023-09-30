import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReviewCreateForm as ReviewCreateFormComponent } from '.'

import { CurrencyType, NetworkType } from 'design-systems/Organisms/Managers/NFTCreationManager'
import { is, CLUBRARE_NETWORKS } from 'utils'

export default is<ComponentMeta<typeof ReviewCreateFormComponent>>()({
  title: 'Molecules/Forms/ReviewCreateForm',
  component: ReviewCreateFormComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof ReviewCreateFormComponent> = props => (
  <div className="w-[440px]">
    <ReviewCreateFormComponent {...props}></ReviewCreateFormComponent>
  </div>
)

export const ReviewCreateForm = Template.bind({})
ReviewCreateForm.args = {
  title: 'Title of Item',
  name: 'Name of creator here',
  price: 1.25,
  currency: CurrencyType.ETH,
  startDate: new Date('12/01/2023'),
  endDate: new Date('12/02/2023'),
  category: { name: 'Fashion' },
  collection: {
    displayName: 'default collection',
    avatar: '',
    bannerImage: '',
    collectibleType: 'clubrare',
    collectionAbiPath: '',
    collectionAddress: '0x123',
    collectionStatus: 'regular',
    createdOn: '',
    description: '',
    factoryAddress: '0x123',
    id: '',
    imageId: '',
    isActive: '',
    order: '',
    symbol: '',
    transactionHash: '',
    walletAddress: '0x123',
    chain: 'off',
    networkId: CLUBRARE_NETWORKS.ETHEREUM,
    customUrl: '',
  },
  network: NetworkType.ETHEREUM,
}
