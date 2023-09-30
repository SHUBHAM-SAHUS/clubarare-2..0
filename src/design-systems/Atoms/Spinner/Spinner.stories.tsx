import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Spinner as SpinnerComponent } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof SpinnerComponent>>()({
  title: 'Atoms/Spinner',
  component: SpinnerComponent,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
})

const Template: ComponentStory<typeof SpinnerComponent> = props => <SpinnerComponent {...props} />
export const Spinner = Template.bind({})
Spinner.args = {
  className: 'w-8 h-8 stroke-neutral-100 dark:stroke-neutral-800',
}
