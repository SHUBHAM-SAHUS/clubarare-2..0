import { ComponentMeta, ComponentStory } from '@storybook/react'

import { UploadImageTab } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof UploadImageTab>>()({
  title: 'Organisms/Profile/Tabs/UploadImageTab',
  component: UploadImageTab,
  argTypes: {},
})

const Template: ComponentStory<typeof UploadImageTab> = props => (
  <div className="h-screen w-[375px]">
    <UploadImageTab {...props} />
  </div>
)

export const DefaultElementTab = Template.bind({})
DefaultElementTab.args = {}
