import { useState, useEffect } from 'react'
import { useQuery } from 'wagmi'

import { ReactionService } from 'api-services'
import { QUERIES } from 'utils'
import { GetReactionResponseObject } from 'api-services/interfaces/reaction'

export const useGetReactions = (address: string) => {
  const [reactionData, setReactionData] = useState<GetReactionResponseObject>()
  useEffect(() => {
    try {
      ReactionService.getReaction({
        wallet_address: address,
      }).then(res => setReactionData(res.data))
    } catch (err) {
      console.error(err)
    }
  }, [])
  // const { data: reactionData } = useQuery(
  //   [QUERIES.PUBLIC.PROFILE_REACTION],
  //   () =>
  //     ReactionService.getReaction({
  //       wallet_address: address,
  //     }),
  //   { select: res => res.data }
  // )

  return {
    reactionData,
  }
}
