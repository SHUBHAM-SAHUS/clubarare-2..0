import { CollectionType } from 'design-systems/Organisms/Managers/NFTCreationManager'

export const COLLECTION_TYPE = [
  {
    name: 'ON-CHAIN',
    type: CollectionType.ON_CHAIN_COLLECTION,
    description:
      'This creates an ERC-721 collection on the blockchain. Gas fees will be upon creation of this collection',
  },
  {
    name: 'OFF-CHAIN',
    type: CollectionType.OFF_CHAIN_COLLECTION,
    description:
      'You can organize your single NFTs into a collection, similar to a folder. NFTs can be freely added or removed',
  },
]
