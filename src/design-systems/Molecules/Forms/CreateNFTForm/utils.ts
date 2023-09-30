import { FormInput as Input, FormTextArea as TextArea } from 'design-systems/Molecules/Forms/Form'
import { EMAIL_REGEX } from 'utils/regex'
export const networks = [
  {
    id: 'ethereum',
    title: 'ETHEREUM',
  },
  {
    id: 'klaytn',
    title: 'KLAYTN',
  },
]

export const inputs = [
  {
    name: 'email',
    label: 'Email address',
    placeholder: 'Add email',
    required: true,
    InputField: Input,
    rules: {
      required: { value: true, message: 'email can not be empty' },
      pattern: {
        value: EMAIL_REGEX,
        message: 'please enter correct email address',
      },
    },
  },
  {
    name: 'name',
    label: 'Creator name',
    placeholder: 'Add creator name',
    required: true,
    InputField: Input,
    rules: {
      required: { value: true, message: 'name can not be empty' },
      minLength: { value: 2, message: 'name must bet greater than 2 Characters long' },
      maxLength: { value: 40, message: 'name must not be greater than 40 Characters long' },
    },
  },
  {
    name: 'title',
    label: 'Title',
    placeholder: 'Name your NFT',
    required: true,
    InputField: Input,
    rules: {
      required: { value: true, message: 'title can not be empty' },
      minLength: { value: 2, message: 'title must bet greater than 2 Characters long' },
      maxLength: { value: 50, message: 'title must not be greater than 50 Characters long' },
    },
  },
  {
    name: 'description',
    label: 'Description',
    placeholder: 'Add description',
    required: true,
    rows: 4,
    InputField: TextArea,
    rules: {
      required: { value: true, message: 'description can not be empty' },
      minLength: { value: 6, message: 'description must bet greater than 6 Characters long' },
      maxLength: { value: 4000, message: 'description must not be greater than 4000 Characters long' },
    },
  },
]
