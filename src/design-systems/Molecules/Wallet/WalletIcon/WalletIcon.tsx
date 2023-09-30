import { isMobile } from 'react-device-detect'
import NextImage from 'next/image'

import MetamaskImage from 'assets/metamask.svg'
import KaikasImage from 'assets/kaikas.svg'
import WalletConnectImage from 'assets/wallet-connect.svg'
import { Typography } from 'design-systems/Atoms/Typography'
import { classNames } from 'utils'

export interface WalletIconProps {
  className?: string
  withLabel?: boolean
  wallet?: WalletTypes
}

export const WalletIcon: React.FC<WalletIconProps> = ({ className, withLabel = false, wallet = 'METAMASK' }) => {
  return (
    <div className={classNames(className, 'flex items-center')}>
      {WalletIcons[wallet]}
      {withLabel ? (
        <Typography className="pl-2 font-RobotoCondensed text-body font-normal uppercase leading-paragraph text-neutral-100 dark:text-neutral-700">
          {' '}
          {WalletLabels[wallet]}
        </Typography>
      ) : (
        ''
      )}
    </div>
  )
}

const WalletImage = isMobile ? WalletConnectImage : MetamaskImage
const WalletLabels = {
  'KAIKAS': 'Kaikas',
  'METAMASK': isMobile ? 'WalletConnect' : 'Metamask',
  'METAMASK-KAIKAS': isMobile ? 'WalletConnect' : 'Metamask',
  // TODO improve types
  'WEB3-AUTH': '',
}
const WalletIcons = {
  'METAMASK': <NextImage alt="METAMASK" className="h-10 w-10" height={40} src={WalletImage} width={40} />,
  'WEB3-AUTH': <NextImage alt="METAMASK" className="h-10 w-10" height={40} src={WalletImage} width={40} />,
  'KAIKAS': <NextImage alt="KAIKAS" className="h-10 w-10" height={40} src={KaikasImage} width={40} />,
  'METAMASK-KAIKAS': <NextImage alt="KAIKAS" className="h-10 w-10" height={40} src={KaikasImage} width={40} />,
}
