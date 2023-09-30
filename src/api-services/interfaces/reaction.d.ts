import { EmojiCountType, EmojiReactionType } from 'design-systems/Molecules/ButtonGroups/EmojiButtonGroup'

interface ReactionQuery {
  to_user: string
  reaction: EmojiReactionType
}

interface ReactionResponseObject {
  isReact: boolean
}

interface ReactionResponse {
  code: number
  data: ReactionResponseObject
  message: string
  status: boolean
}

interface GetReactionQuery {
  wallet_address?: string
}

interface GetReactionResponseObject {
  fromUser: string
  id: string
  reaction: EmojiCountType
  userReaction: EmojiReactionType
  toUser: string
}

interface GetReactionResponse {
  code: number
  data: GetReactionResponseObject
  message: string
  status: boolean
}
