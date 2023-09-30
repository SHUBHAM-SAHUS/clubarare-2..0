import React, { useEffect, useMemo } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { WalletAddressProps } from './interface'

import { shortWalletAddress } from 'utils'
import { CopyIcon } from 'design-systems/Atoms/Icons'
import { Typography } from 'design-systems/Atoms/Typography'
import { useToggle } from 'hooks/useToggle'

export const WalletAddress: React.FC<WalletAddressProps> = ({ className, walletAddress = '' }) => {
  const [state, , , turnOn, turnOff] = useToggle(false)
  useEffect(() => {
    if (state) {
      setTimeout(() => {
        turnOff()
      }, 1000)
    }
  }, [state])
  const classNames = useMemo(
    () =>
      [
        className,
        'flex justify-between items-center relative group border border-neutral-600 dark:border-neutral-500 rounded-full px-3 py-2',
      ].join(' '),
    [className]
  )
  return (
    <div className={classNames}>
      {state && (
        <div className="absolute -top-6 right-0 rounded bg-neutral-100 px-2 py-1 dark:bg-neutral-300">
          <Typography className="text-neutral-700" size="small" variant="condensed">
            Copied
          </Typography>
        </div>
      )}
      <Typography className="mr-2 text-neutral-400 dark:text-neutral-500" size="body" variant="condensed">
        {shortWalletAddress(walletAddress)}
      </Typography>
      <CopyToClipboard text={walletAddress} onCopy={() => turnOn()}>
        <CopyIcon
          className="cursor-pointer stroke-neutral-500  group-hover:stroke-neutral-100 dark:group-hover:stroke-neutral-700"
          height={20}
          width={20}
        />
      </CopyToClipboard>
    </div>
  )
}
