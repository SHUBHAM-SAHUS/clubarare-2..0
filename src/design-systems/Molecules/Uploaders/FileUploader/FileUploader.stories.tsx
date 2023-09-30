import { ComponentMeta, ComponentStory } from '@storybook/react'

import { FileUploader } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof FileUploader>>()({
  title: 'Molecules/Uploaders/FileUploader',
  component: FileUploader,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
    uploading: {
      control: 'boolean',
      defaultValue: false,
    },
  },
})

const Template: ComponentStory<typeof FileUploader> = props => (
  <div className="bg-neutral-800 p-10 dark:bg-neutral-100">
    <FileUploader {...props} />
  </div>
)

export const Normal = Template.bind({})
Normal.args = {
  label: 'Upload COA',
  error: '',
}

export const Uploading = Template.bind({})
Uploading.args = {
  uploading: true,
  error: '',
}

export const Error = Template.bind({})
Error.args = {
  error: 'This file type is not supported',
}
