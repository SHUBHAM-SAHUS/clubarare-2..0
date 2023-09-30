import { ComponentMeta, ComponentStory } from '@storybook/react'

import { is } from 'utils'
import { ReceiveMyItemForm as ReceiveMyItemComponent } from './ReceiveMyItemForm'

export default is<ComponentMeta<typeof ReceiveMyItemComponent>>()({
  title: 'Molecules/Forms/ReceiveMyItemForm',
  component: ReceiveMyItemComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof ReceiveMyItemComponent> = props => (
  <div className="w-[375px]">
    <ReceiveMyItemComponent {...props} />
  </div>
)

export const ReceiveMyItemForm = Template.bind({})
ReceiveMyItemForm.args = {}
