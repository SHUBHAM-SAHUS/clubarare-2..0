export type EmojiCountType = {
  heart: number
  thumb: number
  clap: number
  fire: number
  smile: number
}

export type EmojiReactionType = {
  heart: boolean
  thumb: boolean
  clap: boolean
  fire: boolean
  smile: boolean
}
export interface EmojiButtonGroupProps {
  initialCount: EmojiCountType
  userProfileId: string
  walletAddress: string
  isSigned: boolean
}
