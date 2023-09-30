import { IFrame, IScene } from '@layerhub-io/types'
export interface SpaceProps {
  className?: string
  isEmptySpace?: boolean
  isConnected?: boolean
  spaceUrl?: string
  userIdOrAddress: string
  isGuest: boolean
  spaceImage?: string
}

export interface IDesign {
  id: string
  name: string
  frame: IFrame
  type: string
  scenes: IScene[]
  previews: { id: string; src: string }[]
  metadata: {}
  published: boolean
}
export interface FontItem {
  name: string
  url: string
}
