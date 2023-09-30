import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Alert } from '.'

import { is } from 'utils'
import { RightAnnouncementIcon } from 'design-systems/Atoms/Icons'

export default is<ComponentMeta<typeof Alert>>()({
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
  component: Alert,
  title: 'Molecules/Alert',
})
const Template: ComponentStory<typeof Alert> = props => <Alert {...props} />

export const AlertPopupWhite = Template.bind({})
AlertPopupWhite.args = {
  className:
    'bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-700 text-neutral-100 dark:border-neutral-700  border-neutral-100  border-2',
  icon: <RightAnnouncementIcon />,
  isShowButton: true,
  message:
    'Authentication Launch Promotion Valid Through July 15th - Receive your first Authentication for Free, a value of $30! Learn More',
}

export const AlertPopupNeon = Template.bind({})
AlertPopupNeon.args = {
  buttonColor: 'neon',
  className:
    'bg-brand-800 dark:bg-neutral-100 dark:text-brand-800 text-neutral-100 dark:border-brand-800  border-neutral-100  border-2',
  icon: (
    <RightAnnouncementIcon
      className="stroke-neutral-100 dark:stroke-brand-800"
      stroke="stroke-neutral-100 dark:stroke-brand-800"
    />
  ),
  isShowButton: true,
  message:
    'Authentication Launch Promotion Valid Through July 15th - Receive your first Authentication for Free, a value of $30! Learn More',
}

export const AlertPopupSuccess = Template.bind({})
AlertPopupSuccess.args = {
  alertType: 'success',
  className:
    'text-neutral-100 dark:bg-neutral-100 dark:text-mpwr-500 dark:border-mpwr-500  border-neutral-100  border-2',
  isShowButton: true,
  message:
    'Authentication Launch Promotion Valid Through July 15th - Receive your first Authentication for Free, a value of $30! Learn More',
}
