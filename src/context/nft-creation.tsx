import dynamic from 'next/dynamic'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

type NFTCreationProvider = PropsWithChildren

const NFTCreationManager = dynamic(() =>
  import('design-systems/Organisms/Managers/NFTCreationManager').then(({ NFTCreationManager }) => ({
    default: NFTCreationManager,
  }))
)

export const NFTCreationContext = createContext({
  opened: false,
  openNFTCreation: () => {},
  closeNFTCreation: () => {},
})

export const useNFTCreation = () => useContext(NFTCreationContext)

export const NFTCreationProvider: React.FC<NFTCreationProvider> = ({ children }) => {
  const [opened, setOpened] = useState<boolean>(false)

  const openNFTCreation = () => setOpened(true)
  const closeNFTCreation = () => setOpened(false)

  return (
    <NFTCreationContext.Provider value={{ openNFTCreation, closeNFTCreation, opened }}>
      <NFTCreationManager />
      {children}
    </NFTCreationContext.Provider>
  )
}
