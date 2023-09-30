import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ImageList } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof ImageList>>()({
  title: 'Organisms/Profile/ImageList',
  component: ImageList,
  argTypes: {
    isLoading: {
      control: 'boolean',
      defaultValue: false,
    },
  },
})

const Template: ComponentStory<typeof ImageList> = props => (
  <div className="w-[289px]">
    <ImageList {...props} />
  </div>
)

export const DefaultImageList = Template.bind({})
DefaultImageList.args = {
  isLoading: true,
}
