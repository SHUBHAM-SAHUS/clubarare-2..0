import { FormInput as Input, FormTextArea as TextArea } from 'design-systems/Molecules/Forms/Form'

export const images = [
  {
    description: 'We recommend you use square format at least 300 x 300px. (jpg, png, gif, svg)',
    error: '',
    name: 'profileImage',
    title: 'PROFILE IMAGE*',
  },
  {
    description: 'We recommend you use square format at least 1440 x 270px. (jpg, png, gif, svg)',
    error: '',
    name: 'bannerImage',
    title: 'BANNER IMAGE*',
  },
]

export const inputs = [
  {
    InputField: Input,
    label: 'Display Name',
    name: 'displayName',
    placeholder: 'Add display name',
    required: true,
    rules: {
      maxLength: { message: 'name must not be greater than 40 Characters long', value: 40 },
      minLength: { message: 'name must be greater than 2 Characters long', value: 2 },
      required: { message: 'name can not be empty', value: true },
    },
  },
  {
    InputField: Input,
    label: 'Symbol',
    name: 'symbol',
    placeholder: 'Add symbol',
    required: true,
    rules: {
      maxLength: { message: 'Symbol must not be greater than 10 Characters long', value: 10 },
      minLength: { message: 'Symbol must be greater than 1 Character', value: 1 },
      required: { message: 'symbol can not be empty', value: true },
    },
  },
  {
    InputField: TextArea,
    label: 'Description',
    name: 'description',
    placeholder: 'Add description',
    required: true,
    rows: 4,
    rules: {
      maxLength: { message: 'description must not be greater than 4000 Characters long', value: 4000 },
      minLength: { message: 'description must bet greater than 6 Characters long', value: 6 },
      required: { message: 'description can not be empty', value: true },
    },
  },
]
