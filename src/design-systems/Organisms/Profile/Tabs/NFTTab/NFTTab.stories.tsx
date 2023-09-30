import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NFTTab } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof NFTTab>>()({
  title: 'Organisms/Profile/Tabs/NFTTab',
  component: NFTTab,
  argTypes: {},
})

const Template: ComponentStory<typeof NFTTab> = props => (
  <div className="h-screen w-[289px]">
    <NFTTab {...props} />
  </div>
)

export const DefaultNFTTab = Template.bind({})
DefaultNFTTab.args = {}
