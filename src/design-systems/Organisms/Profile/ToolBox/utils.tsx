import { BorderTab, ElementTab, BackgroundTab, NFTTab } from '../Tabs'

export enum spaceTabs {
  BACKGROUND = 'Background',
  ITEM = 'Items',
  DECORATION = 'Decoration',
  BORDER = 'Border',
  UPLOAD_ITEM = 'Upload Item',
}

export const getTab = (tab: string) => {
  switch (tab) {
    case spaceTabs.ITEM:
      return <NFTTab />
    case spaceTabs.DECORATION:
      return <ElementTab />
    case spaceTabs.BORDER:
      return <BorderTab />
    default:
      return <BackgroundTab />
  }
}
