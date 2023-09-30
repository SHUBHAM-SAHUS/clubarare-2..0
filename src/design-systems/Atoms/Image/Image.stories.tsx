import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Image } from '.'

import { is } from 'utils'
import KittyImage from 'assets/images/kitty.png'

export default is<ComponentMeta<typeof Image>>()({
  title: 'Atoms/Image',
  component: Image,
  argTypes: {
    width: {
      control: 'number',
      defaultValue: 24,
    },
    height: {
      control: 'number',
      defaultValue: 24,
    },
    className: {
      control: 'text',
      defaultValue: '',
    },
    alt: {
      control: 'text',
      defaultValue: 'image-alt',
    },
    isLoading: {
      control: 'boolean',
      defaultValue: false,
    },
    src: {
      table: {
        disabled: true,
      },
    },
  },
})

const LEO_IMAGE_LINK =
  'https://i.seadn.io/gae/nukW3oqsqaxo5DyaVFJj2Ofv5vxv3ni9Fkc4reWGt9cUnSRV2fjWMhr40B2Rnpt9KsHxtVo5KqzHGxMPesHwoSnFq7ktpZD28UBZ?auto=format&w=1000'

const Template: ComponentStory<typeof Image> = props => <Image {...props} />

export const ImageFromStaticLink = Template.bind({})
ImageFromStaticLink.args = {
  width: 50,
  height: 50,
  alt: '50-50-image',
  src: LEO_IMAGE_LINK,
  isLoading: true,
}

export const ImportedImage = Template.bind({})
ImportedImage.args = {
  width: 100,
  height: 100,
  alt: '100-100-image',
  src: KittyImage,
  isLoading: true,
}
