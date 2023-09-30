import { useMutation } from 'wagmi'

import { CollectibleService } from 'api-services'

export const useCollectible = () => {
  const { mutate: createCollectible, mutateAsync: createCollectibleAsync } = useMutation((data: FormData) =>
    CollectibleService.createCollectible(data)
  )
  const { mutate: createCollectibleView, mutateAsync: createCollectibleViewAsync } = useMutation(
    (data: CreateCollectibleViewRequest) => CollectibleService.createCollectibleView(data)
  )
  return {
    createCollectible,
    createCollectibleAsync,
    createCollectibleView,
    createCollectibleViewAsync,
  }
}
