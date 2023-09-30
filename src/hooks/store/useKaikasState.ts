import Caver from 'caver-js'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { LOCAL_KAIKAS_STATE } from 'utils'

interface KaikasState {
  provider?: Caver
  account?: string
  network?: SupportedChainIds
}

interface KaikasStateProps extends KaikasState {
  setState: (state: KaikasState) => void
}

export const useKaikasState = () => useKaikasStore()

export const getKaikasStore = () => useKaikasStore.getState()

const useKaikasStore = create(
  persist<KaikasStateProps>(
    set => ({
      provider: undefined,
      account: undefined,
      network: undefined,
      setState: state => {
        set(state)
      },
    }),
    {
      name: LOCAL_KAIKAS_STATE,
    }
  )
)
