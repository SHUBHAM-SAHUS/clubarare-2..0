import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CopyIcon, InstagramIcon, SearchIcon } from '../Icons'
import { Button } from '../Button'

import { Input } from './'

import { is } from 'utils'

export default is<ComponentMeta<typeof Input>>()({
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    id: {
      control: 'text',
      defaultValue: 'form-input',
    },
    name: {
      control: 'text',
      defaultValue: 'value',
    },
    label: {
      control: 'text',
      defaultValue: 'FormInput',
    },
    value: {
      control: 'text',
      defaultValue: '',
    },
    placeholder: {
      control: 'text',
      defaultValue: 'Welcome to ClubRare',
    },
    error: {
      control: 'text',
      defaultValue: '',
    },
    type: {
      options: ['text', 'email', 'password', 'number'],
      defaultValue: 'text',
      table: {
        disable: true,
      },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'fill'],
      defaultValue: 'primary',
    },
    autoFocus: {
      control: 'boolean',
      defaultValue: false,
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
})

const Template: ComponentStory<typeof Input> = props => (
  <div className="w-[500px] bg-neutral-800 p-10 dark:bg-neutral-200">
    <Input {...props} />
  </div>
)

export const Text = Template.bind({})
Text.args = {
  type: 'text',
  rows: undefined,
}

export const TextWithError = Template.bind({})
TextWithError.args = {
  type: 'text',
  value: '',
  error: 'This is a required field.',
}

export const Number = Template.bind({})
Number.args = {
  type: 'number',
  value: 100,
}

export const InputWithLeftIcon = Template.bind({})
InputWithLeftIcon.args = {
  icon: <InstagramIcon className="h-30 w-30" fill="fill-neutral-800" />,
  type: 'text',
  label: '',
}

export const SecondaryTextInput = Template.bind({})
SecondaryTextInput.args = {
  variant: 'secondary',
  label: 'Amount',
}

export const FillTextInput = Template.bind({})
FillTextInput.args = {
  variant: 'fill',
  label: 'Amount',
}

export const SearchInput = Template.bind({})
SearchInput.args = {
  variant: 'secondary',
  action: <SearchIcon className="fill-neutral-100 dark:fill-neutral-800" />,
  label: 'Search',
  placeholder: 'Search NFTs...',
}

export const MaxInput = Template.bind({})
MaxInput.args = {
  variant: 'fill',
  placeholder: 'Enter amount',
  action: (
    <Button className="bg-neutral-800 !py-[2px] dark:bg-neutral-500" color="primary" size="small" variant="solid">
      MAX
    </Button>
  ),
}

export const AgovInput = Template.bind({})
AgovInput.args = {
  variant: 'fill',
  placeholder: 'Enter AGOV amount',
  label: '',
  action: (
    <span className="text-paragraph font-normal leading-paragraph tracking-paragraph text-neutral-100 dark:text-neutral-800">
      AGOV
    </span>
  ),
}

export const LinkInput = Template.bind({})
LinkInput.args = {
  variant: 'fill',
  placeholder: 'https://clubrare.xyz/0354asfdasas...',
  label: '',
  action: <CopyIcon className="h-6 w-6 stroke-neutral-500" />,
}
