import { configureChains } from 'wagmi'
import * as chain from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  injectedWallet,
  metaMaskWallet,
  braveWallet,
  coinbaseWallet,
  walletConnectWallet,
  ledgerWallet,
  rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets'

import { INFURA_PROJECT_ID, IS_PRODUCTION } from './constants'
import { kaikasWallet } from './kaikas-wallet'
import { baobab, cypress } from './kaikas-chains'

import { GLOBAL_PAGE_SEO } from 'appConfig'

export const CHAIN_IDS = {
  mainnet: 1,
  goerli: 5,
  baobab: 1001,
  cypress: 8217,
} as const

export const CHAIN_NAMES = {
  [CHAIN_IDS.mainnet]: 'Ethereum',
  [CHAIN_IDS.goerli]: 'Goerli',
  [CHAIN_IDS.baobab]: 'Baobab',
  [CHAIN_IDS.cypress]: 'Klaytn',
}

export const SUPPORTED_MAINNET_CHAIN_IDS = [CHAIN_IDS.mainnet, CHAIN_IDS.cypress]
export const SUPPORTED_TESTNET_CHAIN_IDS = [CHAIN_IDS.goerli, CHAIN_IDS.baobab]

export const SUPPORTED_CHAIN_IDS = IS_PRODUCTION ? SUPPORTED_MAINNET_CHAIN_IDS : SUPPORTED_TESTNET_CHAIN_IDS
export const SUPPORTED_CHAIN_NAMES = SUPPORTED_CHAIN_IDS.map(chainId => CHAIN_NAMES[chainId])

export const WAGMI_CHAINS = {
  [CHAIN_IDS.mainnet]: chain.mainnet,
  [CHAIN_IDS.goerli]: chain.goerli,
  // TODO correct with custom rpc
  [CHAIN_IDS.baobab]: baobab,
  [CHAIN_IDS.cypress]: cypress,
}
export const SUPPORTED_WAGMI_CHAINS = SUPPORTED_CHAIN_IDS.map(chainId => WAGMI_CHAINS[chainId])

export const DEFAULT_KLAYTN_CHAIN_ID = IS_PRODUCTION ? CHAIN_IDS.cypress : CHAIN_IDS.baobab
export const DEFAULT_ETHEREUM_CHAIN_ID = IS_PRODUCTION ? CHAIN_IDS.mainnet : CHAIN_IDS.goerli

export const DEFAULT_CHAIN_IDS: {
  [key in WalletTypes]: SupportedChainIds
} = {
  'KAIKAS': DEFAULT_KLAYTN_CHAIN_ID,
  'METAMASK': DEFAULT_ETHEREUM_CHAIN_ID,
  'METAMASK-KAIKAS': DEFAULT_KLAYTN_CHAIN_ID,
  'WEB3-AUTH': DEFAULT_ETHEREUM_CHAIN_ID,
}

export const RPC_ENDPOINTS = {
  1: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
  5: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
  1001: 'https://api.baobab.klaytn.net:8651',
  8217: 'https://public-node-api.klaytnapi.com/v1/cypress',
}

export const BLOCK_EXPLORERS = {
  1: 'https://etherscan.io',
  5: 'https://goerli.etherscan.io',
  1001: 'https://scope.klaytn.com',
  8217: 'https://baobab.scope.klaytn.com',
}

export const SYMBOLS = {
  1: 'ETH',
  5: 'Goerli ETH',
  1001: 'KLAY',
  8217: 'KLAY',
}

export const FULL_CHAIN_NAMES = {
  1: 'Ethereum Mainnet',
  5: 'Goerli Testnet',
  1001: 'Baobab Testnet',
  8217: 'Cypress Mainnet',
}

export type SupportedChainIds = keyof typeof RPC_ENDPOINTS

export const KLAYTN_NETWORKS = [1001, 8217]

export const {
  chains: CONFIGURED_WAGMI_CHAINS,
  provider: WAGMI_PROVIDER,
  webSocketProvider: WAGMI_WS_PROVIDER,
} = configureChains(SUPPORTED_WAGMI_CHAINS, [
  infuraProvider({ apiKey: `${INFURA_PROJECT_ID ?? ''}` }),
  publicProvider(),
])

export const SUPPORTED_EXTERNAL_WALLETS = [
  braveWallet({ chains: CONFIGURED_WAGMI_CHAINS }),
  ledgerWallet({ chains: CONFIGURED_WAGMI_CHAINS }),
  coinbaseWallet({ chains: CONFIGURED_WAGMI_CHAINS, appName: GLOBAL_PAGE_SEO.name }),
  rainbowWallet({ chains: CONFIGURED_WAGMI_CHAINS }),
  kaikasWallet({ chains: CONFIGURED_WAGMI_CHAINS }),
]

export const SUPPORTED_CONNECTORS = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains: CONFIGURED_WAGMI_CHAINS }),
      metaMaskWallet({ chains: CONFIGURED_WAGMI_CHAINS }),
      walletConnectWallet({ chains: CONFIGURED_WAGMI_CHAINS }),
      kaikasWallet({ chains: CONFIGURED_WAGMI_CHAINS }),
    ],
  },
  {
    groupName: 'Other Wallets',
    wallets: SUPPORTED_EXTERNAL_WALLETS,
  },
])

declare global {
  type ChainIds = keyof typeof CHAIN_NAMES
  type ChainNames = keyof typeof CHAIN_IDS
  type SupportedChainIds = (typeof SUPPORTED_CHAIN_IDS)[number]
  type SupportedChainNames = (typeof SUPPORTED_CHAIN_NAMES)[number]
}
