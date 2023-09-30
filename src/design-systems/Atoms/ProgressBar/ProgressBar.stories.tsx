import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProgressBar } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof ProgressBar>>()({
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  argTypes: {
    value: {
      controls: 'number',
    },
  },
})

const Template: ComponentStory<typeof ProgressBar> = props => <ProgressBar {...props} />

export const Default = Template.bind({})
Default.args = {
  value: 35,
}
