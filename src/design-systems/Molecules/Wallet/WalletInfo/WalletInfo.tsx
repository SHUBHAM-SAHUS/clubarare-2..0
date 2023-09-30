import { useCallback } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { WalletIcon } from '../WalletIcon'

import type { WalletInfoProps } from './interface'

import { CopyIcon } from 'design-systems/Atoms/Icons'
import { Typography } from 'design-systems/Atoms/Typography'
import { classNames, shortWalletAddress } from 'utils'
import { useToast } from 'hooks/useToast'

export const WalletInfo: React.FC<WalletInfoProps> = ({
  className,
  wallet = 'METAMASK',
  walletAddress,
  chain,
  chainClassName = 'text-neutral-400 dark:text-neutral-500',
  walletClassName = 'text-neutral-100 dark:text-neutral-700',
}) => {
  const { successToast } = useToast()

  const handleCopy = useCallback(() => {
    successToast('Copied your wallet address')
  }, [successToast])

  return (
    <div className={classNames(className, 'flex items-center gap-2')}>
      <WalletIcon wallet={wallet as WalletTypes} withLabel={false} />

      <div className="pl-2">
        <Typography className={classNames('font-RobotoCondensed text-xs font-normal leading-subtitle', chainClassName)}>
          {chain}
        </Typography>
        <Typography
          className={classNames('font-RobotoCondensed text-caption font-normal leading-subtitle', walletClassName)}
        >
          {walletAddress ? shortWalletAddress(walletAddress) : ''}
        </Typography>
      </div>

      {walletAddress && (
        <CopyToClipboard text={walletAddress} onCopy={handleCopy}>
          <CopyIcon
            className="cursor-pointer stroke-neutral-500 hover:stroke-neutral-100 dark:hover:stroke-neutral-700"
            height={20}
            width={20}
          />
        </CopyToClipboard>
      )}
    </div>
  )
}
