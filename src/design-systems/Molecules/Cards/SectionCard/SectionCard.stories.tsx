import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SectionCard as SectionCardComponent } from '.'

import { is } from 'utils'
import { PencilIcon } from 'design-systems/Atoms/Icons'

export default is<ComponentMeta<typeof SectionCardComponent>>()({
  title: 'Molecules/Cards/SectionCard',
  component: SectionCardComponent,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
    icon: {
      table: {
        disabled: true,
      },
    },
    title: {
      control: 'text',
      defaultValue: 'COLLECTOR',
    },
    description: {
      control: 'text',
      defaultValue: 'Collectors are buyers, traders, and users of unique, rare & limited-edition items',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
})

const Template: ComponentStory<typeof SectionCardComponent> = props => (
  <div className="bg-neutral-800 p-4xl dark:bg-neutral-100">
    <SectionCardComponent {...props} icon={<PencilIcon className="stroke-neutral-100 dark:stroke-neutral-800" />} />
  </div>
)

export const SectionCard = Template.bind({})
SectionCard.args = {}
