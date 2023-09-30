/* eslint-disable sort-keys */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { LOCAL_GLOBAL_STATE } from 'utils'

interface GlobalState {
  /** Authorized user */
  authUser?: UserObject
  setAuthUser: (user: UserObject) => void
  updateAuthUser: (user: Partial<UserObject>) => void
  clearAuthUser: () => void

  /** Connector */
  connector?: WalletTypes
  setConnector: (connector: WalletTypes) => void

  /** JWT auth token */
  accessToken?: string
  setAccessToken: (accessToken: string) => void

  /** clear state */
  clear: () => void
}

export const useGlobalState = () => {
  const authUser = useGlobalStore(({ authUser }) => authUser)
  const setAuthUser = useGlobalStore(({ setAuthUser }) => setAuthUser)
  const updateAuthUser = useGlobalStore(({ updateAuthUser }) => updateAuthUser)
  const clearAuthUser = useGlobalStore(({ clearAuthUser }) => clearAuthUser)

  const connector = useGlobalStore(({ connector }) => connector)
  const setConnector = useGlobalStore(({ setConnector }) => setConnector)

  const accessToken = useGlobalStore(({ accessToken }) => accessToken)
  const setAccessToken = useGlobalStore(({ setAccessToken }) => setAccessToken)

  const clear = useGlobalStore(({ clear }) => clear)

  return {
    authUser,
    setAuthUser,
    updateAuthUser,
    clearAuthUser,
    connector,
    setConnector,
    accessToken,
    setAccessToken,
    clear,
  }
}

export const getGlobalStore = () => useGlobalStore.getState()

const useGlobalStore = create(
  persist<GlobalState>(
    set => ({
      authUser: undefined,
      connector: undefined,
      accessToken: undefined,
      setAuthUser: (authUser: UserObject) => set({ authUser }),
      updateAuthUser: (authUser: Partial<UserObject>) =>
        set(({ authUser: prev }) => ({
          authUser: {
            ...(prev as UserObject),
            ...authUser,
          },
        })),
      clearAuthUser: () => set({ authUser: undefined }),
      setConnector: (connector: WalletTypes) => set({ connector }),
      setAccessToken: (accessToken: string) => set({ accessToken }),
      clear: () =>
        set({
          authUser: undefined,
          accessToken: undefined,
          connector: undefined,
        }),
    }),
    {
      name: LOCAL_GLOBAL_STATE,
    }
  )
)
