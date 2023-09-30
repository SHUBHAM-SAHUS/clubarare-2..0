import React, { PropsWithChildren } from 'react'

import { AdminOverlay, AdminOverlayProps } from 'design-systems/Organisms/Overlays/AdminOverlay'
import { EditProfileOverlay, EditProfileOverlayProps } from 'design-systems/Organisms/Overlays/EditProfileOverlay'
import { MenuOverlay, MenuOverlayProps } from 'design-systems/Organisms/Overlays/MenuOverlay'
import { ProfileOverlay, ProfileOverlayProps } from 'design-systems/Organisms/Overlays/ProfileOverlay'
import { SupportTicketOverlay, SupportTicketOverlayProps } from 'design-systems/Organisms/Overlays/SupportTicketOverlay'
import { ToolBoxOverlay, ToolBoxOverlayProps } from 'design-systems/Organisms/Overlays/ToolBoxOverlay'
import {
  CollectionFormOverlay,
  CollectionFormOverlaysProps,
} from 'design-systems/Organisms/Overlays/CollectionFormOverlay'

export const OverlayIds = {
  NOTHING: 0,

  /* Menus */
  ADMIN: 1,
  MENU: 2,
  PROFILE: 3,
  SUPPORT: 4,

  /* Forms */
  EDIT_PROFILE: 5,
  EDIT_COLLECTION: 7,

  /* My Profile */
  TOOLBOX: 6,
} as const

export interface OverlayProps {
  [OverlayIds.NOTHING]: {}

  /* Menus */
  [OverlayIds.ADMIN]: AdminOverlayProps
  [OverlayIds.MENU]: MenuOverlayProps
  [OverlayIds.PROFILE]: ProfileOverlayProps
  [OverlayIds.SUPPORT]: SupportTicketOverlayProps

  /* Forms */
  [OverlayIds.EDIT_PROFILE]: EditProfileOverlayProps
  [OverlayIds.EDIT_COLLECTION]: CollectionFormOverlaysProps

  /* My Profile */
  [OverlayIds.TOOLBOX]: ToolBoxOverlayProps
}

export type OverlayIDs = ValuesOf<typeof OverlayIds>

export interface OverlayManagerProps extends PropsWithChildren {
  overlayId: OverlayIDs
  props?: OverlayProps[OverlayIDs]
}

export const OverlayManager: React.FC<OverlayManagerProps> = ({ overlayId, props = {} }) => {
  const isActive = <T extends keyof OverlayProps>(
    currentOverlayId: T,
    _props: OverlayProps[keyof OverlayProps]
  ): _props is OverlayProps[T] => overlayId === currentOverlayId

  const isActiveWithRender = <T extends keyof OverlayProps>(
    currentOverlayId: T,
    _props: OverlayProps[keyof OverlayProps],
    render: (__props: OverlayProps[T]) => React.ReactNode
  ) => isActive(currentOverlayId, _props) && render(_props)

  return (
    <>
      {isActive(OverlayIds.ADMIN, props) && <AdminOverlay {...props} />}

      {isActive(OverlayIds.MENU, props) && <MenuOverlay {...props} />}

      {isActive(OverlayIds.PROFILE, props) && <ProfileOverlay {...props} />}

      {isActive(OverlayIds.SUPPORT, props) && <SupportTicketOverlay {...props} />}

      {isActive(OverlayIds.EDIT_PROFILE, props) && <EditProfileOverlay {...props} />}

      {isActive(OverlayIds.EDIT_COLLECTION, props) && <CollectionFormOverlay {...props} />}

      {isActive(OverlayIds.TOOLBOX, props) && <ToolBoxOverlay {...props} />}
    </>
  )
}
