import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useArgs } from '@storybook/client-api'

import { Overlay } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof Overlay>>()({
  title: 'Organisms/Overlays/Overlay',
  component: Overlay,
  args: {},
})

export const ExampleOverlay: ComponentStory<typeof Overlay> = ({ ...args }) => {
  return <Overlay />
}
