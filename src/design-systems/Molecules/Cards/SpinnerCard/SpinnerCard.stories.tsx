import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SpinnerCard as SpinnerCardComponent } from './SpinnerCard'

import { is } from 'utils'

export default is<ComponentMeta<typeof SpinnerCardComponent>>()({
  title: 'Molecules/Cards/SpinnerCard',
  component: SpinnerCardComponent,
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

const Template: ComponentStory<typeof SpinnerCardComponent> = props => (
  <div className="w-[410px]">
    <SpinnerCardComponent {...props} />
  </div>
)

export const SpinnerCard = Template.bind({})
SpinnerCard.args = {}
