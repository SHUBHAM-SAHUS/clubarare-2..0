import { ComponentMeta, ComponentStory } from '@storybook/react'

import { BidForm as BidFormComponent } from './BidForm'

import { is } from 'utils'

export default is<ComponentMeta<typeof BidFormComponent>>()({
  title: 'Molecules/Forms/BidForm',
  component: BidFormComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof BidFormComponent> = props => (
  <div className="w-[375px]">
    <BidFormComponent {...props} />
  </div>
)

export const BidForm = Template.bind({})
BidForm.args = {}
