import React from 'react'

import { CollectionFormOverlaysProps } from './interfaces'

import { CollectionForm } from 'design-systems/Molecules/Forms/CollectionForm'
import { Overlay } from 'design-systems/Organisms/Overlays/Overlay'
import { useOverlay } from 'context'

export const CollectionFormOverlay: React.FC<CollectionFormOverlaysProps> = ({ collection, refetchCollection }) => {
  const { closeOverlay } = useOverlay()

  return (
    <Overlay showBackDrop withHeader={false}>
      <CollectionForm collection={collection} refetchCollection={refetchCollection} onClick={closeOverlay} />
    </Overlay>
  )
}
