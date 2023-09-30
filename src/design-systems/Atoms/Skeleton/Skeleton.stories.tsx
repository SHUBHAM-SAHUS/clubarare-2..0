import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Skeleton } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof Skeleton>>()({
  title: 'Atoms/Skeleton',
  component: Skeleton,
})

const Template: ComponentStory<typeof Skeleton> = props => (
  <div className="h-52 w-52">
    <Skeleton {...props} />
  </div>
)
export const SkeletonExample = Template.bind({})
SkeletonExample.args = {}
