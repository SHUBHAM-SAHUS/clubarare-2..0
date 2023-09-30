import { useMutation } from 'wagmi'

import { AuthService } from 'api-services'

/**
 * The authentication hook for auth api integration
 */
export const useAuthentication = () => {
  /**
   * Before signing with wallet, it should get `nonce` from backend.
   * And then sign wallet with this nonce.
   */
  const { mutate: getWalletNonce, mutateAsync: getWalletNonceAsync } = useMutation(
    ({ networkId, walletAddress }: { networkId: ClubRareNetworks; walletAddress: string }) =>
      AuthService.getNonce({
        network_id: networkId,
        wallet_address: walletAddress,
      })
  )

  /**
   * Verify signature with nonce
   */
  const { mutate: verifySignature, mutateAsync: verifySignatureAsync } = useMutation(
    ({ networkId, signature, nonce, wallet_type, email }: VerifySignaturePayload) =>
      AuthService.verifySignature({
        network_id: networkId,
        signature,
        nonce,
        wallet_type,
        ...(email ? { email } : {}),
      })
  )

  return {
    getWalletNonce,
    getWalletNonceAsync,
    verifySignature,
    verifySignatureAsync,
  }
}

export interface VerifySignaturePayload {
  networkId: ClubRareNetworks
  signature: string
  nonce: string
  wallet_type: WalletType
  email?: string
}
