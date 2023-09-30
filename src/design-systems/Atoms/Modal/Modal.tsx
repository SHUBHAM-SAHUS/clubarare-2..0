import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { Typography } from '../Typography'
import { CloseIcon } from '../Icons'

import type { ModalProps } from './interface'

export const Modal: React.FC<ModalProps> = ({
  children,
  open = false,
  onClose,
  heading = 'Heading',
  className = '',
  jsxElement,
}) => {
  const handleClose = () => {
    onClose?.()
  }
  const modalClassName = ['bg-black/30 fixed inset-0 bg-transparent backdrop-blur-lg z-[2999]', className].join(' ')
  return (
    <Transition
      as={Fragment}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      show={open}
    >
      <Dialog className="bg-brand-500" onClose={() => {}}>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div aria-hidden="true" className={modalClassName} />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 z-[3000] flex items-center justify-center">
          <Dialog.Panel>
            <div className="h-screen w-screen border border-neutral-600 bg-neutral-800 uppercase dark:bg-neutral-200 sm:h-full sm:w-full sm:rounded-3xl">
              <div className="flex flex-row justify-between p-4">
                {typeof heading === 'string' ? (
                  <Typography size="subtitle" variant="condensed">
                    {heading}
                  </Typography>
                ) : (
                  <div>{heading}</div>
                )}
                {!heading && jsxElement && jsxElement}

                <button type="button" onClick={handleClose}>
                  <CloseIcon className="fill-neutral-500" />
                </button>
              </div>
              {children}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  )
}
