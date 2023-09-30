import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NftCarousel } from './NftCarousel'

import { is } from 'utils'
import kittyImg from 'assets/images/kitty.png'
import dummyImg from 'assets/images/image.png'
import musicIcon from 'assets/images/musicIcon.png'
import NFTImg from 'assets/images/NFTImage.png'

export default is<ComponentMeta<typeof NftCarousel>>()({
  title: 'Molecules/NftCarousel',
  component: NftCarousel,
  argTypes: {
    className: {
      table: {
        default: true,
      },
    },
  },
})

const Template: ComponentStory<typeof NftCarousel> = props => <NftCarousel {...props}></NftCarousel>

export const NftCarouselDefault = Template.bind({})
