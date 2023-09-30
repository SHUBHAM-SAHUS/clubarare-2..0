import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Accordion } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof Accordion>>()({
  title: 'Molecules/Accordion',
  component: Accordion,
  argTypes: {
    content: {
      name: 'text',
      value: 'text',
    },
  },
})

const Template: ComponentStory<typeof Accordion> = props => <Accordion {...props} />

export const DefaultAccordion = Template.bind({})
DefaultAccordion.args = {
  content: [
    {
      name: 'DROPDOWN 1',
      value:
        'One-Infortmation about shipping here. Infortmation about shipping here. Infortmation about shipping here. Infortmation about shipping here. Infortmation about shipping here. Infortmation about shipping here. Infortmation about shipping here. Infortmation about shipping here. Infortmation about shipping here. Infortmation about shipping here..!',
    },
    {
      name: 'DROPDOWN 2',
      value:
        'Two-This is the first item accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow.',
    },
    {
      name: 'DROPDOWN 3',
      value:
        'Three-Infortmation about shipping here. Infortmation about shipping here. Infortmation about shipping here. Infortmation about shipping here. Infortmation about shipping here. Infortmation about shipping here. Infortmation about shipping here. Infortmation about shipping here. Infortmation about shipping here. Infortmation about shipping here..!',
    },
  ],
}
