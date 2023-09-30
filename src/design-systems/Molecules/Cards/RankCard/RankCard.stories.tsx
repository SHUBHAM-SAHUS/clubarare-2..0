import { ComponentMeta, ComponentStory } from '@storybook/react'

import { RankCard as RankCardComponent } from './RankCard'

import { is } from 'utils'

export default is<ComponentMeta<typeof RankCardComponent>>()({
  title: 'Molecules/Cards/RankCard',
  component: RankCardComponent,
})

const Template: ComponentStory<typeof RankCardComponent> = props => (
  <div className="w-[410px]">
    <RankCardComponent {...props} />
  </div>
)

export const RankCard = Template.bind({})
RankCard.args = {}
