import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ColorsList } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof ColorsList>>()({
  title: 'Organisms/Profile/ColorsList',
  component: ColorsList,
  argTypes: {},
})

const Template: ComponentStory<typeof ColorsList> = props => (
  <div className="w-[289px]">
    <ColorsList {...props} />
  </div>
)

export const DefaultColorsList = Template.bind({})
DefaultColorsList.args = {}
