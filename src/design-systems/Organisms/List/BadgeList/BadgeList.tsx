import React, { useCallback, useState } from 'react'

import { BadgeListProps } from './interfaces'

import { classNames } from 'utils'

export const BadgeList = <T extends string>({
  className = '',
  options,
  initialSelectedOption,
  deselectable = false,
  onSelectOption,
}: BadgeListProps<T>) => {
  const [selectedOption, setSelectedOption] = useState<T | undefined>(initialSelectedOption)

  const getButtonStyle = useCallback(
    (option: T) => {
      const commonStyles =
        'border border-neutral-500 text-neutral-500 py-1 px-3 typography-caption rounded-2xl cursor-pointer disabled:border-neutral-800 disabled:text-neutral-800'

      if (selectedOption === option) {
        return classNames(commonStyles, '!bg-neutral-100 !text-neutral-600 dark:!bg-neutral-700 dark:!text-neutral-100')
      }

      return commonStyles
    },
    [selectedOption]
  )

  const handleSelectOption = useCallback(
    (option: T) => () => {
      let value
      if (!deselectable) {
        value = option
      } else if (option !== selectedOption) {
        value = option
      }

      setSelectedOption(value)
      onSelectOption(value)
    },
    [onSelectOption, selectedOption, deselectable]
  )

  return (
    <div className={classNames('flex w-full flex-wrap items-center gap-2', className)}>
      {options.map(option => (
        <button
          className={getButtonStyle(option.value)}
          key={option.value}
          type="button"
          onClick={handleSelectOption(option.value)}
        >
          {option.title}
        </button>
      ))}
    </div>
  )
}
