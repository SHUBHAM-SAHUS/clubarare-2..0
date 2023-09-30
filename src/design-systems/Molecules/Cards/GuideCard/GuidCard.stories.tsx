import { ComponentMeta, ComponentStory } from '@storybook/react'

import { GuideCard as GuideCardComponent } from './GuideCard'

import { is } from 'utils'

export default is<ComponentMeta<typeof GuideCardComponent>>()({
  title: 'Molecules/Cards/GuideCard',
  component: GuideCardComponent,
  argTypes: {
    title: {
      control: 'text',
      defaultValue: 'BUYER GUIDE',
    },
    href: {
      control: 'text',
      defaultValue: 'https://google.com',
    },
    className: {
      table: {
        disabled: true,
      },
    },
  },
})

const Template: ComponentStory<typeof GuideCardComponent> = props => (
  <div className="w-[410px]">
    <GuideCardComponent {...props} />
  </div>
)

export const GuideCard = Template.bind({})
GuideCard.args = {}
