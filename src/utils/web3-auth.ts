import { CHAIN_NAMESPACES } from '@web3auth/base'

import {
  BLOCK_EXPLORERS,
  CHAIN_NAMES,
  DEFAULT_ETHEREUM_CHAIN_ID,
  FULL_CHAIN_NAMES,
  SYMBOLS,
  WAGMI_CHAINS,
} from './web3'
import { convertToHex } from './helpers'

export const Web3AuthConfig = {
  chainId: convertToHex(DEFAULT_ETHEREUM_CHAIN_ID),
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  rpcTarget: WAGMI_CHAINS[DEFAULT_ETHEREUM_CHAIN_ID].rpcUrls.default.http[0],
  displayName: FULL_CHAIN_NAMES[DEFAULT_ETHEREUM_CHAIN_ID],
  blockExplorer: BLOCK_EXPLORERS[DEFAULT_ETHEREUM_CHAIN_ID],
  ticker: SYMBOLS[DEFAULT_ETHEREUM_CHAIN_ID],
  tickerName: CHAIN_NAMES[DEFAULT_ETHEREUM_CHAIN_ID],
}

export const Web3AuthClientId = process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID ?? ''
export const Web3AuthGoogleVerifier = process.env.NEXT_PUBLIC_WEB3_AUTH_VERIFIER ?? ''
