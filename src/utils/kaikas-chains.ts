import { type Chain } from 'wagmi'

// Add Custom Chain
export const cypress: Chain = {
  id: 8217,
  name: 'Klaytn Mainnet',
  network: 'cypress',
  nativeCurrency: {
    decimals: 18,
    name: 'KLAY',
    symbol: 'KLAY',
  },
  rpcUrls: {
    default: {
      http: ['https://public-node-api.klaytnapi.com/v1/cypress'],
    },
    public: {
      http: ['https://public-node-api.klaytnapi.com/v1/cypress'],
    },
  },
  blockExplorers: {
    default: { name: 'KlaytnScope', url: 'https://scope.klaytn.com' },
  },
  testnet: false,
}

export const baobab: Chain = {
  id: 1001,
  name: 'Klaytn Testnet',
  network: 'baobab',
  nativeCurrency: {
    decimals: 18,
    name: 'KLAY',
    symbol: 'KLAY',
  },
  rpcUrls: {
    default: {
      http: ['https://api.baobab.klaytn.net:8651'],
    },
    public: {
      http: ['https://api.baobab.klaytn.net:8651'],
    },
  },
  blockExplorers: {
    default: { name: 'KlaytnScope', url: 'https://baobab.scope.klaytn.com' },
  },
  testnet: true,
}
