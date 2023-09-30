import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Video as VideoComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof VideoComponent>>()({
  title: 'Atoms/Video',
  component: VideoComponent,
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
    src: {
      table: {
        disabled: true,
      },
    },
  },
})

const Template: ComponentStory<typeof VideoComponent> = props => <VideoComponent {...props} />

export const Video = Template.bind({})
Video.args = {
  src: 'https://d1gqvtt7oelrdv.cloudfront.net/nftdata/compressed_1673358879632_sample_mp4_file.mp4',
  type: 'video/mp4',
}
