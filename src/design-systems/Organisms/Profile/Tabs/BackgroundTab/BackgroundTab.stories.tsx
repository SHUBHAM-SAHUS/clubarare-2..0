import { ComponentMeta, ComponentStory } from '@storybook/react'

import { BackgroundTab } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof BackgroundTab>>()({
  title: 'Organisms/Profile/Tabs/BackgroundTab',
  component: BackgroundTab,
  argTypes: {},
})

const Template: ComponentStory<typeof BackgroundTab> = props => (
  <div className="h-screen w-[289px]">
    <BackgroundTab {...props} />
  </div>
)

export const DefaultBackgroundTab = Template.bind({})
DefaultBackgroundTab.args = {}
