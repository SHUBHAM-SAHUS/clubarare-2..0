import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS } from 'utils'

class AuthService {
  getNonce = async (payload: NonceRequest) => CoreAPIService.post<NonceResponse>(API_ENDPOINTS.AUTH.NONCE, payload)

  verifySignature = async (payload: VerifySignatureRequest) =>
    CoreAPIService.post<VerifySignatureResponse>(API_ENDPOINTS.AUTH.VERIFY_SIGNATURE, payload)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService()
