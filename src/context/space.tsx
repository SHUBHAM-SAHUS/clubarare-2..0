import { createContext, useContext, useState } from 'react'

export const SpaceContext = createContext({
  selectedObject: {
    id: '',
    imageUrl: '',
    thumbnailImage: '',
    fileType: '',
    originalMedia: '',
    tokenId: '',
    tokenAddress: '',
  },
  openEditor: false,
  component: 0,
  selectedTab: 'Background',
  nftType: 'PHYGITAL',
  setSelectedObject: (image: ImageObject) => {},
  setOpenEditor: (isEditor: boolean) => {},
  setComponent: (id: number) => {},
  setSelectedTab: (tab: string) => {},
  setNftType: (type: string) => {},
})

export const useSpace = () => useContext(SpaceContext)

export const SpaceProvider = ({ children }: any) => {
  const [selectedObject, setSelectedObject] = useState<ImageObject>({
    id: '',
    imageUrl: '',
    thumbnailImage: '',
    fileType: '',
    originalMedia: '',
    tokenId: '',
    tokenAddress: '',
  })
  const [openEditor, setOpenEditor] = useState<boolean>(false)
  const [component, setComponent] = useState<number>(0)
  const [selectedTab, setSelectedTab] = useState<string>('Background')
  const [nftType, setNftType] = useState<string>('PHYGITAL')

  return (
    <SpaceContext.Provider
      value={{
        selectedObject,
        openEditor,
        component,
        selectedTab,
        nftType,
        setSelectedObject,
        setOpenEditor,
        setComponent,
        setSelectedTab,
        setNftType,
      }}
    >
      {children}
    </SpaceContext.Provider>
  )
}
