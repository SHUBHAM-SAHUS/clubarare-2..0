import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Hero as HeroComponent } from '.'

import { is } from 'utils'
import { Image } from 'design-systems/Atoms/Image'
const MOCK_PRODUCT_1 = {
  src: 'https://i.seadn.io/gae/nukW3oqsqaxo5DyaVFJj2Ofv5vxv3ni9Fkc4reWGt9cUnSRV2fjWMhr40B2Rnpt9KsHxtVo5KqzHGxMPesHwoSnFq7ktpZD28UBZ?auto=format&w=1000',
  title: 'Lazy LEO #3932',
}
export default is<ComponentMeta<typeof HeroComponent>>()({
  title: 'Organisms/Hero',
  component: HeroComponent,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
})

const Template: ComponentStory<typeof HeroComponent> = props => <HeroComponent {...props}></HeroComponent>

export const Hero = Template.bind({})
Hero.args = {
  elements: [
    <Image
      alt={MOCK_PRODUCT_1.title}
      className="h-auto w-auto object-cover object-center"
      key={1}
      src={MOCK_PRODUCT_1.src}
    />,
    <Image
      alt={MOCK_PRODUCT_1.title}
      className="h-auto w-auto object-cover object-center"
      key={2}
      src={MOCK_PRODUCT_1.src}
    />,
    <Image
      alt={MOCK_PRODUCT_1.title}
      className="h-auto w-auto object-cover object-center"
      key={3}
      src={MOCK_PRODUCT_1.src}
    />,
    <Image
      alt={MOCK_PRODUCT_1.title}
      className="h-auto w-auto object-cover object-center"
      key={4}
      src={MOCK_PRODUCT_1.src}
    />,
  ],
}
