import { FieldValues } from 'react-hook-form'

import { ProfileService } from 'api-services'

export const useEditProfile = () => {
  const editProfileAsync = (paramsData: FormData | FieldValues) => ProfileService.editProfile(paramsData)

  return {
    editProfileAsync,
  }
}
