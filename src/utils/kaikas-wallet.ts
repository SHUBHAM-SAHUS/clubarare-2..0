import { Wallet } from '@rainbow-me/rainbowkit'

import { baobab, cypress } from './kaikas-chains'
import KaikasConnector from './kaikas-connector'
import { KaikasWalletOptions } from './kaikas-types'

import { IS_PRODUCTION } from 'utils'

export const kaikasWallet = ({ shimDisconnect }: KaikasWalletOptions): Wallet => {
  const kaikasChains = IS_PRODUCTION ? [cypress] : [baobab]

  return {
    id: 'kaikas',
    name: 'Kaikas Wallet',
    iconUrl: '/kaikas-wallet.svg',
    iconBackground: 'white',
    installed: true,
    createConnector: () => {
      const connector = new KaikasConnector({ chains: kaikasChains, options: { shimDisconnect } })
      return {
        connector,
      }
    },
  }
}
