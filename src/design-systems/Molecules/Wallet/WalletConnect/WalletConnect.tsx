import { useMemo } from 'react'

import { WalletIcon } from '../WalletIcon'

import { WalletConnectProps } from './interface'

import { Button } from 'design-systems/Atoms/Button'

export const WalletConnect: React.FC<WalletConnectProps> = ({
  className,
  wallet = 'METAMASK',
  onClick,
  isConnecting = false,
  disabled = false,
}) => {
  const classNames = useMemo(
    () =>
      [
        className,
        'block',
        'px-2 gap-10 py-4 rounded-xs dark:text-neutral-700 ',
        'bg-neutral-800 dark:bg-transparent',
        'items-center flex-col justify-between',
        'border border-neutral-700 dark:border-neutral-400',
      ].join(' '),
    [className]
  )

  return (
    <div className={classNames}>
      <div className="flex items-center justify-between">
        <WalletIcon wallet={wallet} withLabel={true} />
        <div className="flex justify-between gap-4 md:items-center">
          <Button
            className="uppercase"
            color="primary"
            disabled={disabled}
            loading={isConnecting}
            size="medium"
            onClick={onClick}
          >
            Connect
          </Button>
        </div>
      </div>
    </div>
  )
}
