import { ComponentMeta, ComponentStory } from '@storybook/react'
import type { ComponentType } from 'react'

import { Typography } from '../Typography'

import { IconProps } from './interface'

import * as IconComponents from './'

import { is } from 'utils'

export default is<ComponentMeta<any>>()({
  title: 'Atoms/Icons/All Resources',
  argTypes: {
    className: {
      defaultValue: 'w-8 h-8',
      table: {
        disabled: true,
      },
    },
  },
})

interface ComponentProps extends IconProps {
  Icon: ComponentType<IconProps>
}

const Template: ComponentStory<React.FC<ComponentProps>> = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.keys(IconComponents).map(key => {
        const IconComponent = (IconComponents as any)[key]
        return (
          <div className="mb-2 flex items-center gap-4" key={key}>
            <Typography>{`<${key} />`}</Typography>
            <IconComponent className="h-8 w-8 stroke-neutral-100 dark:stroke-neutral-800" />
          </div>
        )
      })}
    </div>
  )
}

export const AllResources = Template.bind({})
AllResources.args = {}
