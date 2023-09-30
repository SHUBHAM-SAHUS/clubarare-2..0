import { ComponentMeta, ComponentStory } from '@storybook/react'

import { BuyForm as BuyFormComponent } from './BuyForm'

import { is } from 'utils'

export default is<ComponentMeta<typeof BuyFormComponent>>()({
  title: 'Molecules/Forms/BuyForm',
  component: BuyFormComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof BuyFormComponent> = props => (
  <div className="w-[375px]">
    <BuyFormComponent {...props} />
  </div>
)

export const BuyForm = Template.bind({})
BuyForm.args = {}
