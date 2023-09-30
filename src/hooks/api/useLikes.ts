import { useMutation } from 'wagmi'

import { ReactionService } from 'api-services'

export const useLike = () => {
  const { mutate: createLike, mutateAsync: createLikeAsync } = useMutation(({ productId }: { productId: string }) =>
    ReactionService.addLike({
      collectible_id: productId,
    })
  )

  return {
    createLike,
    createLikeAsync,
  }
}
