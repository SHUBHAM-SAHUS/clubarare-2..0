import React from 'react'

import { Overlay } from '../Overlay'

import { SupportTicketOverlayProps } from './interface'

import { Typography } from 'design-systems/Atoms/Typography'
import { SupportTicketForm } from 'design-systems/Molecules/Forms/SupportTicketForm'

export const SupportTicketOverlay: React.FC<SupportTicketOverlayProps> = () => {
  return (
    <Overlay
      headerProps={
        <Typography className="ml-3 font-bold text-neutral-100 dark:text-neutral-600" size="subtitle">
          Submit Ticket
        </Typography>
      }
    >
      <SupportTicketForm />
    </Overlay>
  )
}
