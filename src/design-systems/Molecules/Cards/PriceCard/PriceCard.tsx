import { getPriceStyles, getSizeStyles } from './utils'

import { AGOVIcon, EthereumIcon, KlayIcon, MPWRIcon, USDTIcon, WETHIcon } from 'design-systems/Atoms/Icons'
import { Typography } from 'design-systems/Atoms/Typography'
import { classNames } from 'utils'

export type PriceCardSize = 'small' | 'medium' | 'large'

export interface PriceCardProps {
  size?: PriceCardSize
  label?: string
  price?: string | number
  token?: string
  networkId?: ClubRareNetworks
  className?: string
}
const getCurrencyIcon = (token: string, networkId: ClubRareNetworks) => {
  if (networkId == '1') {
    if (token == 'wETH') return <WETHIcon className="min-w-5 min-h-5 h-5 w-5" />
    else if (token == 'MPWR') return <MPWRIcon className="min-w-5 min-h-5 h-5 w-5" isActive={true} />
    else if (token == 'AGOV') return <AGOVIcon className="min-w-5 min-h-5 h-5 w-5" isActive={true} />
    else if (token == 'USDT') return <USDTIcon className="min-w-5 min-h-5 h-5 w-5" />
    else return <EthereumIcon className="min-w-5 min-h-5 h-5 w-5" />
  } else {
    if (token == 'AGOV') return <AGOVIcon className="min-w-5 min-h-5 h-5 w-5" isActive={true} />
    else if (token == 'USDT') return <USDTIcon className="min-w-5 min-h-5 h-5 w-5" />
    else return <KlayIcon className="min-w-5 min-h-5 h-5 w-5" />
  }
}

export const PriceCard: React.FC<PriceCardProps> = ({
  size = 'medium',
  label = '',
  price = '',
  className = '',
  networkId,
  token,
}) => {
  return (
    <div className={`${className} my-2 flex items-center space-x-1 md:items-start`}>
      {networkId && token ? getCurrencyIcon(token, networkId) : ''}
      <div className="text-neutral-100 dark:text-neutral-800">
        <Typography className="truncate text-sm font-normal" variant="condensed">
          {label}
        </Typography>
        <Typography
          className={classNames('truncate', getPriceStyles(size))}
          size={getSizeStyles(size)}
          variant="condensed"
        >
          {price} {token}
        </Typography>
      </div>
    </div>
  )
}
