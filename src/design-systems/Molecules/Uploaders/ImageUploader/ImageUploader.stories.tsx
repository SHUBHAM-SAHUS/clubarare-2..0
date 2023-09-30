import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ImageUploader } from '.'

import { is } from 'utils'

const LEO_IMAGE_LINK =
  'https://i.seadn.io/gae/nukW3oqsqaxo5DyaVFJj2Ofv5vxv3ni9Fkc4reWGt9cUnSRV2fjWMhr40B2Rnpt9KsHxtVo5KqzHGxMPesHwoSnFq7ktpZD28UBZ?auto=format&w=1000'

export default is<ComponentMeta<typeof ImageUploader>>()({
  title: 'Molecules/Uploaders/ImageUploader',
  component: ImageUploader,
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

const Template: ComponentStory<typeof ImageUploader> = props => (
  <div className="bg-neutral-800 p-10 dark:bg-neutral-100">
    <ImageUploader {...props} />
  </div>
)

export const Normal = Template.bind({})
Normal.args = {}

export const Uploading = Template.bind({})
Uploading.args = {
  uploading: true,
}

export const Error = Template.bind({})
Error.args = {
  error: 'This file type is not supported',
}

export const Imported = Template.bind({})
Imported.args = {
  src: LEO_IMAGE_LINK,
}
