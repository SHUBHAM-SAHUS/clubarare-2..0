import { createContext, useContext, useState, useCallback } from 'react'

import { useSpace } from './space'

import { OverlayIds, OverlayManager, OverlayIDs, OverlayProps } from 'design-systems/Organisms/Managers/OverlayManager'

export interface OverlayContextState {
  openOverlay: (overlayId: OverlayIDs, props?: OverlayProps[OverlayIDs]) => void
  closeOverlay: () => void
}

export const OverlayContext = createContext<OverlayContextState>({} as OverlayContextState)

export const useOverlay = () => useContext(OverlayContext)

export const OverlayProvider = ({ children }: any) => {
  const [overlayId, setOverlayId] = useState<OverlayIDs>(OverlayIds.NOTHING)
  const [props_, setProps] = useState<OverlayProps[OverlayIDs]>({})
  const { setComponent, setOpenEditor } = useSpace()

  const openOverlay = (activeOverlayId: OverlayIDs, props: OverlayProps[OverlayIDs] = {}) => {
    setOverlayId(activeOverlayId)
    setProps(props)
  }

  const closeOverlay = useCallback(() => {
    setOverlayId(OverlayIds.NOTHING)
    setOpenEditor(false)
    setComponent(0)
    setProps({})
  }, [])

  return (
    <OverlayContext.Provider
      value={{
        openOverlay,
        closeOverlay,
      }}
    >
      <OverlayManager overlayId={overlayId} props={props_} />
      {children}
    </OverlayContext.Provider>
  )
}
