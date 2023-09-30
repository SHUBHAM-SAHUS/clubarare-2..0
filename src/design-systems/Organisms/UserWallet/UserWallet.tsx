import { useMemo } from 'react'
import Link from 'next/link'

import { UserWalletProps } from './interface'

import { Button } from 'design-systems/Atoms/Button'
import { Spinner } from 'design-systems/Atoms/Spinner'
import { Typography } from 'design-systems/Atoms/Typography'
import { IconButton } from 'design-systems/Atoms/IconButton'
import { USDTIcon, WETHIcon, EthereumIcon, KlayIcon, MPWRIcon, PowerIcon, AGOVIcon } from 'design-systems/Atoms/Icons'
import { WalletInfo } from 'design-systems/Molecules/Wallet/WalletInfo'
import { KLAYSWAP_POOL_LINKS, UNISWAP_POOL_LINKS, classNames } from 'utils'
import { useConnector } from 'context'

export const UserWallet: React.FC<UserWalletProps> = ({
  isLoading = false,
  className = '',
  walletAddress,
  wallet = 'METAMASK',
  chain,
  currencyOptions,
  onDisconnect,
  onWithdraw,
}) => {
  const { chainId, isEthereum } = useConnector()

  const swapLinks = useMemo(() => {
    if (chainId === 1001 || chainId === 8217) return KLAYSWAP_POOL_LINKS
    return UNISWAP_POOL_LINKS
  }, [chainId])

  return (
    <div className={classNames('w-96 bg-neutral-800 p-4 dark:bg-neutral-200', className)}>
      <div className="flex flex-col gap-4 rounded-xs border border-neutral-700 p-4 dark:border-neutral-400">
        <div className="flex items-center justify-between">
          <WalletInfo chain={chain} wallet={wallet} walletAddress={walletAddress} />
          <IconButton
            className="flex h-8 !w-32 flex-row items-center justify-end"
            id="disconnect-wallet-btn"
            variant="transparent"
            onClick={onDisconnect}
          >
            <Typography size="small" variant="condensed">
              Disconnect
            </Typography>
            <PowerIcon />
          </IconButton>
        </div>
        <div className="rounded-xs bg-neutral-700 p-2 dark:bg-neutral-300">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Spinner className="h-5 w-5 stroke-neutral-100 dark:stroke-neutral-800" />
            </div>
          ) : (
            currencyOptions?.map((option, index) => (
              <div
                className={classNames(
                  'mb-1 flex items-center justify-between p-1',
                  isEthereum && 'group/currency cursor-pointer'
                )}
                key={index}
                onClick={() => onWithdraw(option.token)}
              >
                <div className="flex gap-1.5">
                  <CurrencyIcon token={option.token} wallet={wallet} />
                  <Typography className="leading-paragraph tracking-subtitle" size="body" variant="condensed">
                    {option.tokenAmount?.toFixed(4)} {option.token}
                  </Typography>
                </div>
                <Typography className="block group-hover/currency:hidden" size="caption" variant="condensed">
                  ${option.USDAmount?.toFixed(2)}
                </Typography>
                <Typography className="hidden group-hover/currency:block" size="caption" variant="condensed">
                  WITHDRAW
                </Typography>
              </div>
            ))
          )}
        </div>

        {(wallet === 'METAMASK' || wallet === 'WEB3-AUTH') && (
          <Link href={UNISWAP_POOL_LINKS.WETH} target="_blank">
            <Button
              className="px-xl font-Roboto font-medium"
              color="primary"
              fullWidth={true}
              size="medium"
              variant="solid"
            >
              CONVERT ETH/wETH
            </Button>
          </Link>
        )}

        <div className="flex items-center justify-center gap-4">
          <Link className="w-full" href={swapLinks.AGOV} target="_blank">
            <Button
              className="w-full whitespace-nowrap font-Roboto font-medium"
              color="primary"
              size="medium"
              variant="outlined"
            >
              BUY AGOV
            </Button>
          </Link>
          <Link className="w-full" href={swapLinks.MPWR} target="_blank">
            <Button
              className="w-full whitespace-nowrap font-Roboto font-medium"
              color="primary"
              size="medium"
              variant="outlined"
            >
              BUY MPWR
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export const CurrencyIcon = ({ token, wallet }: { token: string; wallet: string }) => {
  if (wallet === 'KAIKAS') {
    if (token === 'AGOV') return <AGOVIcon className="h-5 w-5" isActive={true} />
    else if (token === 'USDT') return <USDTIcon />
    else return <KlayIcon />
  } else {
    if (token === 'wETH') return <WETHIcon />
    else if (token === 'MPWR') return <MPWRIcon className="h-5 w-5" isActive={true} />
    else if (token === 'AGOV') return <AGOVIcon className="h-5 w-5" isActive={true} />
    else if (token === 'USDT') return <USDTIcon />
    else return <EthereumIcon />
  }
}
