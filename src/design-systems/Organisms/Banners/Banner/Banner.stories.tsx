import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Banner } from './Banner'

import { is } from 'utils'
import { Button } from 'design-systems/Atoms/Button'
import bannerImage from 'assets/images/banner-img.png'

export default is<ComponentMeta<typeof Banner>>()({
  title: 'Organisms/Banners/Banner',
  component: Banner,
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      defaultVaule: 'center',
    },
    className: {
      control: 'text',
      defaultValue: '',
    },
    title: {
      control: 'text',
      defaultValue: 'Welcome To ClubRare',
    },
    description: {
      control: 'text',
      defaultValue: 'Trade real-world collectibles',
    },
  },
})

const Template: ComponentStory<typeof Banner> = props => (
  <Banner {...props}>
    <Button className="w-full md:w-auto" color="neon" variant="solid">
      Explore
    </Button>
    <Button
      className="w-full border-2 border-neutral-700 text-md text-neutral-700 dark:!border-neutral-100 dark:!text-neutral-100 md:w-auto"
      color="primary"
      variant="outlined"
    >
      My Profile
    </Button>
  </Banner>
)

export const NoImageBanner = Template.bind({})
NoImageBanner.args = {
  align: 'center',
}

export const ImageBanner = Template.bind({})
ImageBanner.args = {
  bannerImage,
}
