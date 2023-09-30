import { FieldValues } from 'react-hook-form'

import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS, getQueries } from 'utils'

/**
 * Service for fetching and updating user profile data.
 */
class ProfileService {
  /**
   * Fetches user profile data.
   * @param query Query parameters for filtering the user profile data.
   * @returns A Promise resolving to the user profile data.
   */
  getUserProfile = async (query: UserProfileQuery) =>
    CoreAPIService.get<UserProfileResponse>(`${API_ENDPOINTS.PRIVATE.GET_USER_PROFILE}?${getQueries(query)}`)

  /**
   * Updates the user profile data.
   * @param payload The data to be updated, passed as a FormData or FieldValues object.
   * @returns A Promise resolving to the updated profile data.
   */
  editProfile = async (payload: FormData | FieldValues) =>
    CoreAPIService.post<EditProfileResponse>(API_ENDPOINTS.PRIVATE.EDIT_PROFILE, payload)

  /**
   * Fetches user authentication remaining credit amount
   * @returns A promise resolving to the user authentication remaining credit amount
   */
  getAuthenticationCredit = async () =>
    CoreAPIService.get<AuthenticationCreditResponse>(API_ENDPOINTS.PRIVATE.GET_AUTHENTICATION_CREDIT)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProfileService()
