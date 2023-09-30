import { Fragment, useMemo } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { DropdownProps } from './interface'

import { classNames } from 'utils/class-names'
import { compareStringsInsentively } from 'utils'

export function Dropdown({
  options,
  value = '',
  placeholder,
  direction,
  onChange,
  className = '',
  dropdownClass = '',
  disabled = false,
}: DropdownProps) {
  const mainClasses = classNames(
    'relative inline-flex w-full items-center justify-center rounded-full px-6 py-2 text-base font-normal text-neutral-100 hover:text-neutral-400 dark:text-neutral-600 truncate',
    className
  )

  const selectedOption = useMemo(() => options.find(option => compareStringsInsentively(option.value, value)), [value])

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="relative flex">
        <Menu.Button className={mainClasses} disabled={disabled}>
          {direction === 'left' && <ChevronDownIcon aria-hidden="true" className="-ml-1 h-6 w-6" />}
          {selectedOption?.icon && <>{selectedOption.icon}</>}
          {value ? selectedOption?.title : placeholder}
          {selectedOption?.badge !== undefined && (
            <span className="absolute right-12 top-2">{selectedOption.badge}</span>
          )}
          {direction === 'right' && <ChevronDownIcon aria-hidden="true" className="-mr-1 h-6 w-6" />}
        </Menu.Button>
      </div>

      {options && options.length > 0 && (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`absolute right-0 z-[99999] flex origin-top-right flex-col gap-1 rounded-xs bg-neutral-600 bg-white p-2 focus:outline-none dark:bg-neutral-100 ${dropdownClass}`}
          >
            {options?.map((option, index) => (
              <Menu.Item key={index}>
                <div
                  className="menu_item relative flex cursor-pointer items-center gap-2 whitespace-nowrap rounded px-3 py-1 text-base hover:bg-neutral-700 dark:hover:bg-neutral-500 dark:hover:text-neutral-100"
                  id={`${index}`}
                  onClick={() => onChange(option)}
                >
                  {option.icon && <>{option.icon}</>}
                  {option.title}
                  {option.badge !== undefined && <span className="absolute right-6 top-2">{option.badge}</span>}
                </div>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  )
}
