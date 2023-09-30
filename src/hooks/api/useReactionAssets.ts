import { ReactionService } from 'api-services'
import { ReactionQuery } from 'api-services/interfaces/reaction'

export const useReactionAssets = () => {
  const userReaction = async (paramsData: ReactionQuery) => await ReactionService.addReaction(paramsData)

  return {
    userReaction,
  }
}
