import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ListingForm as ListingFormComponent } from './ListingForm'

import { is } from 'utils'

export default is<ComponentMeta<typeof ListingFormComponent>>()({
  title: 'Molecules/Forms/ListingForm',
  component: ListingFormComponent,
  argTypes: {},
})

const Template: ComponentStory<typeof ListingFormComponent> = props => (
  <div className="sm:w-[375px]">
    <ListingFormComponent {...props} />
  </div>
)

export const ListingForm = Template.bind({})
ListingForm.args = {}
