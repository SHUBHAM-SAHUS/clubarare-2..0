import type { FormTextAreaProps } from './interface'

import { Typography } from 'design-systems/Atoms/Typography'
import { classNames } from 'utils'

export const RawTextArea: React.FC<FormTextAreaProps> = ({
  id,
  name,
  className = '',
  innerClassName = '',
  label = '',
  rows = 1,
  value = '',
  autoFocus = false,
  placeholder = '',
  onChange,
  onBlur,
  inputRef,
  required = false,
  ...props
}) => {
  const inputClassNames = classNames(
    'outline-none w-full',
    'bg-neutral-800 dark:bg-neutral-200',
    'border-b border-b-neutral-600 dark:border-b-neutral-400 active:border-b-neutral-100 dark:active:border-b-neutral-800',
    'text-neutral-100 dark:text-neutral-800',
    'placeholder:text-neutral-600 dark:placeholder:text-neutral-400',
    'hover:placeholder:text-neutral-100 hover:dark:placeholder:text-neutral-800 resize-none',
    innerClassName
  )

  return (
    <div className={className}>
      {label && (
        <Typography className="mb-1 text-neutral-100 dark:text-neutral-700" size="caption" variant="condensed">
          {label}
          {required && <span className="font-bold text-[#FF0000]">*</span>}
        </Typography>
      )}
      <textarea
        autoFocus={autoFocus}
        className={inputClassNames}
        id={id || name}
        name={name}
        placeholder={placeholder}
        ref={inputRef}
        required={required}
        rows={rows}
        onBlur={onBlur}
        onChange={onChange}
        {...props}
      />
    </div>
  )
}
