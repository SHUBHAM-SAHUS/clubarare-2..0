import React from 'react'

import { Overlay } from '../Overlay'

import { EditProfileOverlayProps } from './interface'

import { Typography } from 'design-systems/Atoms/Typography'
import { EditProfileForm } from 'design-systems/Molecules/Forms/EditProfileForm'

export const EditProfileOverlay: React.FC<EditProfileOverlayProps> = ({ userIdOrAddress }) => {
  return (
    <Overlay
      headerProps={
        <Typography
          className="ml-3 block font-bold text-neutral-100 dark:text-neutral-600 md:hidden lg:hidden"
          size="subtitle"
        >
          Edit Profile
        </Typography>
      }
      showBackDrop={false}
    >
      <EditProfileForm userIdOrAddress={userIdOrAddress} />
    </Overlay>
  )
}
