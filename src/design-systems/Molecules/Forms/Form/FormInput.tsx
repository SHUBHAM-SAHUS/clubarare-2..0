import { Controller } from 'react-hook-form'

import { RawFormInput } from './RawInput'
import type { FormInputProps } from './interface'

export const FormInput: React.FC<FormInputProps> = ({
  name = '',
  variant = 'primary',
  type = 'text',
  rules,
  control,
  error,
  required,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, value, ...rest } }) => (
        <RawFormInput
          error={error}
          inputRef={ref}
          required={required}
          type={type}
          variant={variant}
          {...props}
          {...rest}
        />
      )}
      rules={rules}
    />
  )
}
