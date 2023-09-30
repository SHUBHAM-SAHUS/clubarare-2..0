/* eslint-disable sort-keys */
import { PropsWithChildren } from 'react'
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector'
import { Web3AuthNoModal } from '@web3auth/no-modal'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { WagmiConfig, createClient } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import { CONFIGURED_WAGMI_CHAINS, GOOGLE_CLIENT_ID, WAGMI_PROVIDER, WAGMI_WS_PROVIDER } from 'utils'
import { Web3AuthClientId, Web3AuthConfig, Web3AuthGoogleVerifier } from 'utils/web3-auth'
import { GLOBAL_PAGE_SEO } from 'appConfig'

// Instantiating Web3Auth
const web3AuthInstance = new Web3AuthNoModal({
  clientId: Web3AuthClientId,
  web3AuthNetwork: 'cyan',
  chainConfig: Web3AuthConfig,
  enableLogging: false,
})

// Add openlogin adapter
const openloginAdapterInstance = new OpenloginAdapter({
  adapterSettings: {
    network: 'cyan',
    uxMode: 'popup',
    loginConfig: {
      google: {
        clientId: GOOGLE_CLIENT_ID,
        typeOfLogin: 'google',
        verifier: Web3AuthGoogleVerifier,
        name: GLOBAL_PAGE_SEO.name,
        description: GLOBAL_PAGE_SEO.description,
        logoDark:
          'https://assets.website-files.com/642c2602f0aed9d36a868d14/642c2603f0aed94903868d4d_cr-logo-icon-white.svg',
        logoLight: 'https://assets.website-files.com/642c2602f0aed9d36a868d14/642c2603f0aed9bfde868d42_favicon256.webp',
      },
    },
  },
})

web3AuthInstance.configureAdapter(openloginAdapterInstance)

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains: CONFIGURED_WAGMI_CHAINS,
    }),
    new Web3AuthConnector({
      chains: CONFIGURED_WAGMI_CHAINS,
      options: {
        web3AuthInstance,
        loginParams: {
          loginProvider: 'google',
        },
      },
    }),
  ],
  provider: WAGMI_PROVIDER,
  webSocketProvider: WAGMI_WS_PROVIDER,
})

export const WagmiProvider = ({ children }: PropsWithChildren) => {
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
}
