import { BigNumber } from 'ethers'

export const getSignPayloadFromListingData = (listing: ListingObject, nonce: BigNumber): ListingSignPayload => {
  const {
    collectibleOwner,
    contractAddress,
    creatorAddress,
    endTime,
    isTokenGated,
    objId,
    orderType,
    paymentTokenType,
    price,
    royalty,
    startTime,
    tokenGateAddress,
    tokenId,
    uri,
  } = listing

  return {
    basePrice: BigNumber.from(price),
    contractAddress: contractAddress,
    expirationTime: BigNumber.from(endTime),
    isTokenGated: isTokenGated,
    listingTime: BigNumber.from(startTime),
    nonce,
    objId: objId,
    orderType: orderType,
    paymentToken: paymentTokenType,
    royaltyFee: BigNumber.from(royalty),
    royaltyReceiver: creatorAddress,
    seller: collectibleOwner,
    tokenGateAddress: tokenGateAddress,
    tokenId: BigNumber.from(tokenId),
    uri: uri,
  }
}
