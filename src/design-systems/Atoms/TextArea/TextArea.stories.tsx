import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TextArea as TextAreaComponent } from './'

import { is } from 'utils'

export default is<ComponentMeta<typeof TextAreaComponent>>()({
  title: 'Atoms/TextArea',
  component: TextAreaComponent,
  argTypes: {
    id: {
      control: 'text',
      defaultValue: 'form-textarea',
    },
    name: {
      control: 'text',
      defaultValue: 'form-name',
    },
    label: {
      control: 'text',
      defaultValue: 'Description',
    },
    value: {
      control: 'text',
      defaultValue: '',
    },
    placeholder: {
      control: 'text',
      defaultValue: 'Welcome to ClubRare',
    },
    autoFocus: {
      control: 'boolean',
      defaultValue: false,
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
})

const Template: ComponentStory<typeof TextAreaComponent> = props => (
  <div className="w-[500px] bg-neutral-800 p-10 dark:bg-neutral-200">
    <TextAreaComponent {...props} />
  </div>
)

export const TextArea = Template.bind({})
TextArea.args = {
  rows: 5,
}
