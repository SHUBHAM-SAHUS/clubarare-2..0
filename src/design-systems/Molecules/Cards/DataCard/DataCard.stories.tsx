import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DataCard as DataCardComponent } from '.'

import { is } from 'utils'
import { ChartLineUpIcon } from 'design-systems/Atoms/Icons'
import { Typography } from 'design-systems/Atoms/Typography'

export default is<ComponentMeta<typeof DataCardComponent>>()({
  title: 'Molecules/Cards/DataCard',
  component: DataCardComponent,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
    initialShowContent: {
      control: 'boolean',
      defaultValue: false,
    },
    icon: {
      table: {
        disabled: true,
      },
    },
    label: {
      control: 'text',
      defaultValue: 'PRICE HISTORY',
    },
  },
})

const Template: ComponentStory<typeof DataCardComponent> = props => (
  <DataCardComponent {...props} icon={<ChartLineUpIcon className="stroke-neutral-100 dark:stroke-neutral-800" />}>
    <Typography>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
      type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
      remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
      Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
      of Lorem Ipsum.
    </Typography>
  </DataCardComponent>
)

export const DataCard = Template.bind({})
DataCard.args = {}
