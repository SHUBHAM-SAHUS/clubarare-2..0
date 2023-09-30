import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { WalletInfo } from '../WalletInfo'

import { WalletDropdownProps } from './interface'
import { getClassNames, getDropdownOptionClasses, getSelectedOption } from './utils'

import { TickIcon } from 'design-systems/Atoms/Icons'

export const WalletDropdown: React.FC<WalletDropdownProps> = ({
  className,
  options,
  value,
  direction = 'right',
  placeholder,
  onChange,
}) => {
  const selectedOption = getSelectedOption(options, value)
  return (
    <Menu as="div" className="relative inline-block w-72 text-left">
      <div>
        <Menu.Button className={getClassNames(className)}>
          {direction === 'left' && <ChevronDownIcon aria-hidden="true" className="-ml-1 h-6 w-6" />}
          {selectedOption ? (
            <WalletInfo
              chain={selectedOption.chain}
              className="text-left"
              wallet={selectedOption.wallet}
              walletAddress={selectedOption.walletAddress}
            ></WalletInfo>
          ) : (
            placeholder
          )}
          {direction === 'right' && <ChevronDownIcon aria-hidden="true" className="-mr-1 h-6 w-6" />}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-10 flex origin-top-right flex-col gap-1 rounded-xs bg-neutral-600 bg-white p-2 focus:outline-none dark:bg-neutral-100 ">
          {options?.map((option, index) => (
            <div
              className="cursor-pointer whitespace-nowrap rounded text-base "
              key={index}
              onClick={() => onChange(option)}
            >
              <Menu.Item>
                <div className={getDropdownOptionClasses(selectedOption, option.walletAddress)}>
                  <WalletInfo
                    chain={option.chain}
                    wallet={option.wallet as WalletTypes}
                    walletAddress={option.walletAddress}
                  ></WalletInfo>
                  {selectedOption &&
                  option.walletAddress.toLowerCase() == selectedOption.walletAddress.toLowerCase() ? (
                    <TickIcon />
                  ) : (
                    ''
                  )}
                </div>
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
