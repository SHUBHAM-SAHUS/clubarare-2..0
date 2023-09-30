import { useEffect } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import type { RewardFormProps } from './interface'

import { useToggle } from 'hooks/useToggle'
import { Button } from 'design-systems/Atoms/Button'
import { CopyIcon, MPWRIcon } from 'design-systems/Atoms/Icons'
import { Input } from 'design-systems/Atoms/Input'
import { Typography } from 'design-systems/Atoms/Typography'
import { WalletIcon } from 'design-systems/Molecules/Wallet/WalletIcon'
import { shortWalletAddress } from 'utils'

export const RewardForm: React.FC<RewardFormProps> = ({ className, walletAddress }) => {
  const [state, , , turnOn, turnOff] = useToggle(false)

  const handleSubmit = async () => {
    //TODO: integrates pending
    return false
  }

  useEffect(() => {
    if (state) {
      setTimeout(() => {
        turnOff()
      }, 1000)
    }
  }, [state, turnOff])

  return (
    <div className={`${className} border-spacing-4 rounded-xs border border-neutral-700 p-4 dark:border-neutral-100`}>
      <form className={`flex w-full flex-col justify-between px-3 `} onSubmit={handleSubmit}>
        <div className="flex w-full items-center justify-between pb-5">
          <WalletIcon className="flex w-10" wallet={'METAMASK' as WalletType} withLabel={false} />
          <div className="flex w-full flex-col items-center pl-2">
            <Typography className="flex w-full items-start justify-start font-RobotoCondensed text-xs font-normal leading-subtitle">
              Ethereum
            </Typography>
            <div className="relative flex w-full items-start justify-start">
              <Typography className="flex w-16 font-RobotoCondensed text-caption font-normal leading-subtitle">
                {shortWalletAddress(walletAddress)}
              </Typography>
              <CopyToClipboard text={walletAddress} onCopy={() => turnOn()}>
                <CopyIcon
                  className="cursor-pointer stroke-neutral-500  group-hover:stroke-neutral-100 dark:group-hover:stroke-neutral-700"
                  height={14}
                  width={14}
                />
              </CopyToClipboard>
              {state && (
                <div className="absolute -top-6 left-14 rounded bg-neutral-100 px-2 py-1 dark:bg-neutral-300">
                  <Typography className="text-neutral-700" size="small" variant="condensed">
                    Copied
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full sm:flex-col md:flex md:w-full md:flex-row  ">
          <div className="sm:w-full md:flex md:w-1/2 ">
            <div className="w-full">
              <Input
                action={
                  <Button disabled={true} type="submit">
                    CLAIM
                  </Button>
                }
                disabled={true}
                icon={<MPWRIcon className="h-3 w-3" height={13} width={13} />}
                iconClassName="left-[2%] top-[40%]"
                inputClassName="h-14 pl-8 border-spacing-4 rounded-xs border !border-neutral-700 !bg-neutral-700 p-2 dark:!border-neutral-100 dark:!bg-neutral-100"
                label="CLAIMABLE REWARDS"
                value={'0 MPWR'}
                variant="secondary"
              ></Input>
            </div>
          </div>
          <div className="sm:w-full sm:pt-5 md:flex md:w-1/2 md:pl-3 md:pt-0">
            <div className="w-full">
              <Input
                action={
                  <Typography
                    className="flex text-right leading-[38px] !text-neutral-500 "
                    size="body"
                    variant="condensed"
                  >
                    $0
                  </Typography>
                }
                disabled={true}
                icon={<MPWRIcon className="h-3 w-3" height={13} width={13} />}
                iconClassName="left-[2%] top-[40%]"
                inputClassName="h-14 pl-8 border-spacing-4 rounded-xs !border-neutral-700 !bg-neutral-400 p-2 !text-neutral-500 dark:!border-neutral-400"
                label="LOCKED REWARDS"
                value={'0 MPWR'}
                variant="secondary"
              ></Input>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
