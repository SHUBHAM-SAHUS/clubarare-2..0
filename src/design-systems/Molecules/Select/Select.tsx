import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'

import { SelectProps } from './interface'

import { ArrowDownIcon } from 'design-systems/Atoms/Icons'
import { Typography } from 'design-systems/Atoms/Typography'

export const Select: React.FC<SelectProps> = ({ className, value, options = [], setSelectedCollectionAsset }) => {
  return (
    <div className={className}>
      <Listbox value={value} onChange={setSelectedCollectionAsset}>
        <div className="relative mt-1">
          <Listbox.Button className="relative flex w-full cursor-default items-center border-b border-neutral-600 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:ring-offset-2 sm:text-sm">
            {value ? (
              <span className="block truncate">{value?.displayName}</span>
            ) : (
              <Typography className="text-neutral-600" size="body" variant="condensed">
                Select collection
              </Typography>
            )}
            <span className="options-center pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ArrowDownIcon aria-hidden="true" className="h-5 w-5 stroke-neutral-600" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className=" absolute z-10 mt-1 max-h-60 w-full overflow-auto border-none bg-neutral-700 py-1 text-base shadow-lg focus:outline-none sm:text-sm">
              {options?.map((item, itemIdx) => (
                <Listbox.Option
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-neutral-300 text-neutral-800' : 'text-neutral-100'
                    }`
                  }
                  key={itemIdx}
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {item?.displayName}
                      </span>
                      {selected ? (
                        <span className="options-center absolute inset-y-0 left-0 flex pl-3 text-neutral-100">
                          <CheckIcon aria-hidden="true" className="h-5 w-5" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
