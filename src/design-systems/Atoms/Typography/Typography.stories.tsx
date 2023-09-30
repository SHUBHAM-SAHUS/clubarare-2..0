import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Typography } from '.'

import { is } from 'utils'

export default is<ComponentMeta<typeof Typography>>()({
  title: 'Atoms/Typography',
  component: Typography,
  argTypes: {
    variant: {
      options: ['condensed', 'regular'],
      defaultValue: 'condensed',
    },
    size: {
      options: ['h1', 'h2', 'h3', 'h4', 'subtitle', 'paragraph', 'body', 'caption', 'small', 'sm', 'md', 'lg'],
      defaultValue: 'body',
    },
    className: {
      table: {
        disabled: true,
      },
    },
  },
})

const Template: ComponentStory<typeof Typography> = props => <Typography {...props}>ClubRare Marketplace</Typography>

export const H1 = Template.bind({})
H1.args = {
  variant: 'condensed',
  size: 'h1',
}

export const H2 = Template.bind({})
H2.args = {
  variant: 'condensed',
  size: 'h2',
}

export const H3 = Template.bind({})
H3.args = {
  variant: 'condensed',
  size: 'h3',
}

export const H4 = Template.bind({})
H4.args = {
  variant: 'condensed',
  size: 'h4',
}

export const Subtitle = Template.bind({})
Subtitle.args = {
  variant: 'condensed',
  size: 'subtitle',
}

export const Paragraph = Template.bind({})
Paragraph.args = {
  variant: 'condensed',
  size: 'paragraph',
}

export const Body = Template.bind({})
Body.args = {
  variant: 'condensed',
  size: 'body',
}

export const Caption = Template.bind({})
Caption.args = {
  variant: 'condensed',
  size: 'caption',
}

export const Small = Template.bind({})
Small.args = {
  variant: 'condensed',
  size: 'small',
}

export const RegularSmall = Template.bind({})
RegularSmall.args = {
  variant: 'regular',
  size: 'sm',
}

export const RegularMedium = Template.bind({})
RegularMedium.args = {
  variant: 'regular',
  size: 'md',
}

export const RegularLarge = Template.bind({})
RegularLarge.args = {
  variant: 'regular',
  size: 'lg',
}

export const ResponsiveText = Template.bind({})
ResponsiveText.args = {
  variant: undefined,
  size: undefined,
  className: 'lg:typography-h1 md:typography-paragraph typography-sm',
}
