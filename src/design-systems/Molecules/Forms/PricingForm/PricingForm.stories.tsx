import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PricingForm as PricingFormComponent } from './PricingForm'

import { is } from 'utils'

export default is<ComponentMeta<typeof PricingFormComponent>>()({
  title: 'Molecules/Forms/PricingForm',
  component: PricingFormComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof PricingFormComponent> = props => (
  <div className="sm:w-[375px]">
    <PricingFormComponent {...props} />
  </div>
)

export const PricingForm = Template.bind({})
PricingForm.args = {}
