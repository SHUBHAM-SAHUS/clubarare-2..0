import { ClappingHandsIcon, FireIcon, HeartIcon, SmilingFaceIcon, ThumbIcon } from 'design-systems/Atoms/Icons'

export const iconClassName =
  'p-1 w-6 h-6 border hover:bg-neutral-300 focus:bg-neutral-300 border-transparent rounded-3xl cursor-pointer'

export const emojis = [
  { Icon: HeartIcon, id: 'heart', fill: '#CC3333', stroke: 'stroke-[#CC3333]' },
  { Icon: ThumbIcon, id: 'thumb', fill: '', stroke: '' },
  { Icon: SmilingFaceIcon, id: 'smile', fill: '', stroke: '' },
  { Icon: ClappingHandsIcon, id: 'clap', fill: '', stroke: '' },
  { Icon: FireIcon, id: 'fire', fill: '', stroke: '' },
]

export const mockEmotionCounts = {
  heart: 0,
  fire: 0,
  clap: 0,
  smile: 0,
  thumb: 0,
}
