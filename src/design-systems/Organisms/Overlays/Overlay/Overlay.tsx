import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { motion } from 'framer-motion'

import { OverlayProps } from './interface'

import { useOverlay } from 'context'
import { classNames } from 'utils'

export const Overlay: React.FC<OverlayProps> = ({
  className = '',
  children,
  headerProps,
  withHeader = true,
  showBackDrop = true,
}) => {
  const { closeOverlay } = useOverlay()

  return (
    <div className={overlayClassName}>
      <motion.div
        animate={{ right: 0 }}
        aria-labelledby="offcanvasRightLabel"
        aria-modal="true"
        className={classNames(overlayContainerClassName, className)}
        exit={{ right: -375 }}
        id="offcanvasRight"
        initial={{ right: -375 }}
        role="dialog"
        tab-index="-1"
        transition={{ duration: 0.2 }}
      >
        {withHeader && (
          <div
            className={classNames(
              'offcanvas-header flex h-14 items-center',
              headerProps ? 'justify-between' : 'justify-end'
            )}
          >
            {headerProps && <div>{headerProps}</div>}
            <div className="flex p-4">
              <XMarkIcon
                aria-label="Close"
                className="box-content h-8 w-8 cursor-pointer sm:h-6 sm:w-6"
                data-bs-dismiss="offcanvas"
                onClick={closeOverlay}
              />
            </div>
          </div>
        )}

        <div className="offcanvas-body flex h-screen overflow-auto overflow-y-auto">{children}</div>
      </motion.div>

      {showBackDrop && (
        <div className="show fade fixed z-[2022] h-screen w-screen bg-neutral-500 opacity-30" onClick={closeOverlay} />
      )}
    </div>
  )
}

const overlayClassName = 'relative'

const overlayContainerClassName = classNames(
  'filterOverlayOverFlowHidden',
  'z-[2023]',
  'flex fixed bottom-0 right-0 top-0',
  'min-h-800 md:min-h-900 w-[375px] max-w-full flex-col shadow-sm',
  'border-none outline-none',
  'text-gray-700 bg-neutral-800 dark:bg-neutral-200',
  'bg-clip-padding'
)
