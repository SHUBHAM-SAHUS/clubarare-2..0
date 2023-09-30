import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PutOnSaleModal as Content } from './PutOnSaleModal'

import { Modal } from 'design-systems/Atoms/Modal'
import { Button } from 'design-systems/Atoms/Button'
import { useModal } from 'design-systems/Atoms/Modal'
import { is } from 'utils'

export default is<ComponentMeta<typeof Modal>>()({
  title: 'Molecules/Modals/PutOnSaleModal',
})

const asset = {
  id: '',
  collectionAddress: '',
  networkId: '',
  isApproved: false,
  file: '',
  s3Url: '',
  fileContentType: '',
  redeemable: false,
  redeemVerified: false,
  redeemType: 33,
  nftType: '',
  contractType: '',
  transactionHash: '',
  collectibleOwner: '',
  title: '',
  description: '',
  royalties: 1,
  usdAmount: 2,
  onSale: false,
  isHide: false,
  createdBy: '',
  createdOn: '',
  isActive: false,
  previewUrl: '',
  viewCount: 1,
  tokenId: '',
  totalLike: 1,
  isLike: false,
  lastPrice: '',
  lastErc20Address: '',
  userObj: {},
  history: {},
  auctionDetails: {},
  ownerObj: {},
  ownerVerified: false,
  ipfsHash: '',
  customFields: {},
}

const Template: ComponentStory<typeof Modal> = props => {
  const { Modal: PutOnSaleModal, open } = useModal(
    <Content
      asset={asset}
      onClose={function () {
        throw new Error('Function not implemented.')
      }}
    />
  )

  return (
    <div className="h-screen w-screen">
      <Button onClick={open}>Open Dialog</Button>
      <PutOnSaleModal />
    </div>
  )
}

export const PutOnSale = Template.bind({})
PutOnSale.args = {}
