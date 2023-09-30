import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ClubRareImage } from './ClubRareImage'

import { hideControl, is } from 'utils'
import KittyImage from 'assets/images/kitty.png'
const LEO_IMAGE_LINK =
  'https://i.seadn.io/gae/nukW3oqsqaxo5DyaVFJj2Ofv5vxv3ni9Fkc4reWGt9cUnSRV2fjWMhr40B2Rnpt9KsHxtVo5KqzHGxMPesHwoSnFq7ktpZD28UBZ?auto=format&w=1000'

export default is<ComponentMeta<typeof ClubRareImage>>()({
  title: 'Atoms/ClubRareImage',
  component: ClubRareImage,
  argTypes: {
    alt: {
      control: 'text',
      defaultValue: 'image',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    className: hideControl,
    src: hideControl,
    styles: hideControl,
    onClick: hideControl,
  },
})

const Template: ComponentStory<typeof ClubRareImage> = props => (
  <div className="h-350 w-200">
    <ClubRareImage {...props} styles={{ objectFit: 'cover' }} />
  </div>
)
export const ImageFromStaticLink = Template.bind({})

ImageFromStaticLink.args = {
  alt: '50-50-image',
  src: LEO_IMAGE_LINK,
}

export const ImportedImage = Template.bind({})
ImportedImage.args = {
  alt: '100-100-image',
  src: KittyImage,
}
