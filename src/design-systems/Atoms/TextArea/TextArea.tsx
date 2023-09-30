import { Typography } from '../Typography'

import { TextAreaProps } from '.'

export const TextArea: React.FC<TextAreaProps> = ({
  id,
  name,
  className = '',
  label = '',
  rows = 1,
  value = '',
  autoFocus = false,
  placeholder = '',
  onChange,
  onBlur,
  required = false,
}) => {
  const inputClassNames = [
    'outline-none w-full',
    'bg-neutral-800 dark:bg-neutral-200',
    'border-b border-b-neutral-600 dark:border-b-neutral-400 active:border-b-neutral-100 dark:active:border-b-neutral-800',
    'text-neutral-100 dark:text-neutral-800',
    'placeholder:text-neutral-600 dark:placeholder:text-neutral-400',
    'hover:placeholder:text-neutral-100 dark:placeholder:text-neutral-800 resize-none',
  ].join(' ')

  return (
    <div className={className}>
      {label && (
        <Typography
          className="mb-1 font-semibold text-neutral-100 dark:text-neutral-700"
          size="caption"
          variant="condensed"
        >
          {label}
          {required && <span className="font-bold text-[#FF0000]">*</span>}
        </Typography>
      )}
      <textarea
        autoFocus={autoFocus}
        className={inputClassNames}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
    </div>
  )
}
