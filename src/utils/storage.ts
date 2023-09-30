export const LOCAL_CONNECTOR_KEY = 'clubrare-connector'
export const LOCAL_ACCESS_TOKEN_KEY = 'access-token'
export const LOCAL_WALLET_ADDRESS_KEY = 'wallet-address'
export const LOCAL_USER_DETAILS_KEY = 'user-details'
export const LOCAL_THEME = 'user-theme'
export const LOCAL_ADDON_THEME = 'sb-addon-themes-3'
export const LOCAL_GLOBAL_STATE = 'clubrare-global-state'
export const LOCAL_KAIKAS_STATE = 'clubrare-kaikas-state'
export const LOCAL_ANNOUNCEMENT_KEY = 'clubrare-announcement'
export const LOCAL_OPEN_LOGIN_STORE_KEY = 'openlogin_store'

export const enableAutoSignIn = (connector_: WalletTypes) => localStorage.setItem(LOCAL_CONNECTOR_KEY, connector_)
export const disableAutoSignIn = () => localStorage.removeItem(LOCAL_CONNECTOR_KEY)
export const checkAutoSignIn = () => localStorage.getItem(LOCAL_CONNECTOR_KEY) as WalletTypes

export const saveWalletAddress = (address: string) => localStorage.setItem(LOCAL_WALLET_ADDRESS_KEY, address)
export const disableWalletAddress = () => localStorage.removeItem(LOCAL_WALLET_ADDRESS_KEY)
export const checkWalletAddress = () => localStorage.getItem(LOCAL_WALLET_ADDRESS_KEY) as string

export const saveUserDetails = (val: string) => localStorage.setItem(LOCAL_USER_DETAILS_KEY, val)
export const disableUserDetails = () => localStorage.removeItem(LOCAL_USER_DETAILS_KEY)
export const checkUserDetails = () => localStorage.getItem(LOCAL_USER_DETAILS_KEY)

export const saveAccessToken = (token: string) => localStorage.setItem(LOCAL_ACCESS_TOKEN_KEY, token)
export const disableAccessToken = () => localStorage.removeItem(LOCAL_ACCESS_TOKEN_KEY)
export const checkAccessToken = () => localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)

export const disableAnnouncement = () => localStorage.setItem(LOCAL_ANNOUNCEMENT_KEY, 'true')
export const getAnnouncement = () => String(localStorage.getItem(LOCAL_ANNOUNCEMENT_KEY))

export const checkOpenloginEmail = () => JSON.parse(localStorage.getItem(LOCAL_OPEN_LOGIN_STORE_KEY) ?? '')?.email
