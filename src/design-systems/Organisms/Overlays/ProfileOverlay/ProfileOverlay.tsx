import { useCallback, useEffect, useState } from 'react'
import { useSigner } from 'wagmi'
import NextLink from 'next/link'
import { Signer } from 'ethers'

import { Overlay } from '../Overlay'

import { ProfileOverlayProps } from './interface'

import { Typography } from 'design-systems/Atoms/Typography'
import { Link } from 'design-systems/Atoms/Link'
import { Button } from 'design-systems/Atoms/Button'
import { GmailIcon } from 'design-systems/Atoms/Icons'
import { UserWallet } from 'design-systems/Organisms/UserWallet'
import { WalletIcon } from 'design-systems/Molecules/Wallet/WalletIcon'
import { useConnector, useNFTCreation, useOverlay } from 'context'
import {
  CLUBRARE_SOCIAL_LINKS,
  DEFAULT_ETHEREUM_CHAIN_ID,
  IS_DASHBOARD_ENABLED,
  compareStringsInsentively,
} from 'utils'
import { useGlobalState } from 'hooks/store/useGlobalState'
import { PAGE_ROUTES } from 'utils'
import { useTokenBalances } from 'hooks/useTokenBalances'
import { useToggle } from 'hooks/useToggle'
import { WithdrawToken } from 'design-systems/Organisms/WithdrawToken'
import { DROPDOWN_OPTIONS_ETH } from 'design-systems/Molecules/Forms/PricingForm/utils'

export const ProfileOverlay: React.FC<ProfileOverlayProps> = () => {
  const { openNFTCreation } = useNFTCreation()
  const { isSigned, connect, disconnect, address, chainId, isLocked } = useConnector()
  const { connector: activatingConnector } = useGlobalState()
  const { data: ethSigner } = useSigner()
  const [chain, setChain] = useState<'Ethereum' | 'Klaytn'>('Ethereum')
  const [currentWallet, setCurrentWallet] = useState<WalletTypes>()

  const { closeOverlay } = useOverlay()
  const { isLoadingTokenBalances, tokenBalances, refetchBalances } = useTokenBalances(
    chainId,
    address,
    ethSigner as Signer
  )

  const [wallet, setWallet] = useState<WalletTypes>('METAMASK')
  const [currency, setCurrency] = useState<AddressString>()

  const handleClickNetwork = useCallback((id: string) => {
    if (id === 'ethereum-btn') {
      setWallet('METAMASK')
      setChain('Ethereum')
    } else {
      setWallet('KAIKAS')
      setChain('Klaytn')
    }
  }, [])

  const handleConnect = useCallback(
    async (connector: WalletTypes) => {
      setCurrentWallet(connector)
      connect(connector)
    },
    [connect]
  )

  const handleWithdraw = useCallback((token: string) => {
    const option = DROPDOWN_OPTIONS_ETH.find(op => compareStringsInsentively(op.title, token))
    setCurrency(option!.value)
  }, [])

  const handleDisconnect = useCallback(async () => {
    await disconnect()
    handleClickNetwork('ethereum-btn')
  }, [disconnect, handleClickNetwork])

  useEffect(() => {
    if (!activatingConnector) return

    setChain(activatingConnector === 'KAIKAS' || activatingConnector == 'METAMASK-KAIKAS' ? 'Klaytn' : 'Ethereum')
    setWallet(activatingConnector)
  }, [activatingConnector])

  return (
    <Overlay>
      {!isSigned ? (
        <div className="mt-2 w-full">
          <div className="flex flex-col gap-5xl">
            <div className="flex flex-col gap-4 px-4">
              <div className="py-1">
                <Typography size="body" variant="condensed">
                  Sign in
                </Typography>
                <Typography size="small" variant="condensed">
                  Connect in one click
                </Typography>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  className={ConnectButtonClassNames}
                  color="secondary"
                  disabled={isLocked}
                  fullWidth
                  loading={currentWallet === 'WEB3-AUTH' && isLocked}
                  size="medium"
                  variant="outlined"
                  onClick={() => handleConnect('WEB3-AUTH')}
                >
                  <GmailIcon />
                  Log in with Gmail
                </Button>

                <Typography className="text-center" size="small" variant="condensed">
                  We do not store any data related to your social logins
                </Typography>
              </div>
            </div>

            <div className="flex flex-col gap-4 px-4">
              <Typography size="body" variant="condensed">
                External Wallets
              </Typography>

              <div className="flex flex-col gap-2xl">
                <Button
                  className={ConnectButtonClassNames}
                  color="secondary"
                  disabled={isLocked}
                  fullWidth
                  loading={currentWallet === 'METAMASK' && isLocked}
                  size="medium"
                  variant="outlined"
                  onClick={() => handleConnect('METAMASK')}
                >
                  <WalletIcon className="h-26 w-26" wallet="METAMASK" withLabel={false} />
                  METAMASK
                </Button>

                <Button
                  className={ConnectButtonClassNames}
                  color="secondary"
                  disabled={isLocked}
                  fullWidth
                  loading={currentWallet === 'KAIKAS' && isLocked}
                  size="medium"
                  variant="outlined"
                  onClick={() => handleConnect('KAIKAS')}
                >
                  <WalletIcon className="h-26 w-26" wallet="KAIKAS" withLabel={false} />
                  KAIKAS
                </Button>

                <Typography className="py-4 text-center font-extrabold" size="sm" variant="condensed">
                  By connecting you’re agreeing to our{' '}
                  <NextLink className="border-b" href={CLUBRARE_SOCIAL_LINKS.privacy} rel="noreferrer" target="_blank">
                    Terms of Service.
                  </NextLink>
                </Typography>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-col space-y-2 pl-4">
            <div className="space-y-2 sm:hidden"></div>
            <hr className={`text-neutral-600 dark:text-neutral-400 sm:hidden`} />
            <Link className="mt-2" href={`/profile/${address}`} onClick={closeOverlay}>
              PROFILE
            </Link>
            {/*
             * NOTE: hide dashboard button since some features are not ready yet
             * TODO: activate dashboard page when escrow feature is enabled
             */}
            {IS_DASHBOARD_ENABLED && (
              <Link className="mt-2" href={PAGE_ROUTES.dashboard} onClick={closeOverlay}>
                DASHBOARD
              </Link>
            )}
            <Link className="mt-2 hidden" href="" onClick={() => (openNFTCreation(), closeOverlay())}>
              CREATE
            </Link>
          </div>
          <div className="mt-14 flex items-center justify-self-center">
            {currency && chainId === DEFAULT_ETHEREUM_CHAIN_ID ? (
              <WithdrawToken
                initialCurrency={currency}
                balances={tokenBalances!}
                onClose={() => setCurrency(undefined)}
                onRefetchBalances={refetchBalances}
              />
            ) : (
              <UserWallet
                chain={chain}
                currencyOptions={tokenBalances ?? []}
                isLoading={isLoadingTokenBalances}
                wallet={wallet}
                walletAddress={address}
                onDisconnect={handleDisconnect}
                onWithdraw={handleWithdraw}
              />
            )}
          </div>
        </div>
      )}
    </Overlay>
  )
}

const ConnectButtonClassNames = 'flex items-center gap-1 !rounded-xs !p-4'
