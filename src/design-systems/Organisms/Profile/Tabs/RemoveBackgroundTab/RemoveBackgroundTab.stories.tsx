import { ComponentMeta, ComponentStory } from '@storybook/react'

import { RemoveBackgroundTab } from '.'

import { is, MOCK_IMAGES } from 'utils'

export default is<ComponentMeta<typeof RemoveBackgroundTab>>()({
  title: 'Organisms/Profile/Tabs/RemoveBackgroundTab',
  component: RemoveBackgroundTab,
  argTypes: {},
})

const Template: ComponentStory<typeof RemoveBackgroundTab> = props => (
  <div className="h-screen w-[375px]">
    <RemoveBackgroundTab {...props} />
  </div>
)

export const DefaultElementTab = Template.bind({})
DefaultElementTab.args = {}
