import { Controller } from 'react-hook-form'

import { RawTextArea } from './RawTextArea'
import type { FormTextAreaProps } from './interface'

export const FormTextArea: React.FC<FormTextAreaProps> = ({
  name = '',
  rows = 5,
  type = 'text',
  control,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, ...rest } }) => (
        <RawTextArea inputRef={ref} rows={rows} type={type} {...props} {...rest} />
      )}
    />
  )
}
