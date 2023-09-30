import { IS_PRODUCTION } from './constants'
import { CHAIN_IDS } from './web3'

export const METAMASK_TOKEN_ADDRESS = {
  AGOV: IS_PRODUCTION ? '0xd1420af453fd7bf940573431d416cace7ff8280c' : '0x9ACc2DcD8375Cf58E2465172B312fb76420271E5',
  MPWR: IS_PRODUCTION ? '0x6731827Cb6879a2091ce3ab3423f7bf20539b579' : '0x58cCfaCCd1922c233D6F3748915b948C7077d1F7',
  USDT: IS_PRODUCTION ? '0xdac17f958d2ee523a2206206994597c13d831ec7' : '0x2fc1DF0185dC84e00d3f4C24Fda0D7D1Be9ea25B',
  WETH: IS_PRODUCTION ? '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' : '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
} as const

export const KAIKAS_TOKEN_ADDRESS = {
  AGOV: IS_PRODUCTION ? '0x588c62ed9aa7367d7cd9c2a9aaac77e44fe8221b' : '0x38889dd9373c09ac2dfbba2fdbcfd5edde7b7729',
  USDT: IS_PRODUCTION ? '0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167' : '0xF5B85D98AcD65e1074FEB6c51aA7662E589cd494',
} as const

export const MARKETPLACE_CONTRACT_ADDRESS = {
  [CHAIN_IDS.goerli]: '0xcfc7d1609ff28970D206C3b0c3aB348BCA040D0d',
  [CHAIN_IDS.mainnet]: '0xd5a46B999E5731f683D41883F237af5269DB545b',
  [CHAIN_IDS.baobab]: '0xf4168e3a00abe495a02172f51def1b7dec240a94',
  [CHAIN_IDS.cypress]: '0xC7A7c054c94548aC3B931aB6b15fbb61e96aF7E9',
} as const

export const MARKETPLACE_VALIDATOR_CONTRACT_ADDRESS = {
  [CHAIN_IDS.goerli]: '0x0E3D47C0DCB4D1DB9a7aC30916580134Cc858757',
  [CHAIN_IDS.mainnet]: '0xB072F015c1211E02204DdC0D8502Fd8D4948C5CE',
  [CHAIN_IDS.baobab]: '0x0e00ae38730d6d8f25c2858f1898ec4909d09494',
  [CHAIN_IDS.cypress]: '0x368A8b69Bbc1bfE1C54Ae32ee035054F356eF4dD',
} as const

export const NULL_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000'

export const TOKEN_BASED_ADDRESS = {
  [CHAIN_IDS.goerli]: '0x8eDBA9100b90027EF5785170caeE4cD53E312E71',
  [CHAIN_IDS.mainnet]: '0x198D2b8EA1c60DB49Eaed720D890e7c7c0651f02',
  [CHAIN_IDS.baobab]: NULL_TOKEN_ADDRESS,
  [CHAIN_IDS.cypress]: NULL_TOKEN_ADDRESS,
} as const

export const LISTING_SIGN_ABI = [
  { name: 'seller', type: 'address' },
  { name: 'contractAddress', type: 'address' },
  { name: 'royaltyFee', type: 'uint256' },
  { name: 'royaltyReceiver', type: 'address' },
  { name: 'paymentToken', type: 'address' },
  { name: 'basePrice', type: 'uint256' },
  { name: 'listingTime', type: 'uint256' },
  { name: 'expirationTime', type: 'uint256' },
  { name: 'nonce', type: 'uint256' },
  { name: 'tokenId', type: 'uint256' },
  { name: 'orderType', type: 'uint8' },
  { name: 'uri', type: 'string' },
  { name: 'objId', type: 'string' },
  { name: 'isTokenGated', type: 'bool' },
  { name: 'tokenGateAddress', type: 'address' },
] as const

export const COLLECTION_FACTORY_CONTRACT_ADDRESS = {
  [CHAIN_IDS.goerli]: '0xbD9B413c0A59756850fFf58AE2f78A9E95340AeC',
  [CHAIN_IDS.mainnet]: '0x76a95edc242Ea1b239666E2395335df94cE65FBF',
  [CHAIN_IDS.baobab]: '0xE5944D045492f653b357C72FF154E3aF67D148bE',
  [CHAIN_IDS.cypress]: '0x89c0efb1a2ed930af98c6b6d750765895e6a1aa7',
} as const

export const DEFAULT_COLLECTION_ADDRESS = {
  [CHAIN_IDS.goerli]: '0x6a52ce526cb90c9df318122bea0ff137cd67c0d0',
  [CHAIN_IDS.mainnet]: '0x11EBce0e3a9C30abAEaa8dD4aBabC1A9d93dE688',
  [CHAIN_IDS.baobab]: '0x1Eb67ae2ebDA1e6eaE2E9821c2Add84b92d4dd2b',
  [CHAIN_IDS.cypress]: '0xc1CF07d566B4728575A544208271c619C296197e',
}
