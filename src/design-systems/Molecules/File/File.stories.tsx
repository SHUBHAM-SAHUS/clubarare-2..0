import { ComponentMeta, ComponentStory } from '@storybook/react'

import { File as FileComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof FileComponent>>()({
  title: 'Molecules/File',
  component: FileComponent,
  argTypes: {
    width: {
      control: 'number',
      defaultValue: 300,
    },
    height: {
      control: 'number',
      defaultValue: 300,
    },
    className: {
      control: 'text',
      defaultValue: '',
    },
    isLoading: {
      control: 'boolean',
      defaultValue: false,
    },
    src: {
      table: {
        disabled: true,
      },
    },
  },
})

const Template: ComponentStory<typeof FileComponent> = props => (
  <div className="h-[300px] w-[300px]">
    <FileComponent {...props} className="h-full w-full" />
  </div>
)

export const Video = Template.bind({})
Video.args = {
  src: 'https://d1gqvtt7oelrdv.cloudfront.net/nftdata/compressed_1673358879632_sample_mp4_file.mp4',
  type: 'video/mp4',
  isLoading: true,
}

export const Image = Template.bind({})
Image.args = {
  src: 'https://i.seadn.io/gae/nukW3oqsqaxo5DyaVFJj2Ofv5vxv3ni9Fkc4reWGt9cUnSRV2fjWMhr40B2Rnpt9KsHxtVo5KqzHGxMPesHwoSnFq7ktpZD28UBZ?auto=format&w=1000',
  type: 'image/jpg',
  isLoading: true,
}
