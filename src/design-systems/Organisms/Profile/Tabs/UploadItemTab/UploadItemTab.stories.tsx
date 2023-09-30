import { ComponentMeta, ComponentStory } from '@storybook/react'

import { UploadItemTab } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof UploadItemTab>>()({
  title: 'Organisms/Profile/Tabs/UploadItemTab',
  component: UploadItemTab,
  argTypes: {},
})

const Template: ComponentStory<typeof UploadItemTab> = props => (
  <div className="h-screen w-[375px]">
    <UploadItemTab {...props} />
  </div>
)

export const DefaultElementTab = Template.bind({})
DefaultElementTab.args = {}
