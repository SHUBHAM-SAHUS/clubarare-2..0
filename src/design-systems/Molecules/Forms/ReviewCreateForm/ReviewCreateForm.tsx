import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import { AgreementState, ReviewCreateFormProps } from './interface'
import { formatDate, validateAuthenticateCategory } from './utils'
import { ListItem } from './ListItem'

import { Button } from 'design-systems/Atoms/Button'
import { Typography } from 'design-systems/Atoms/Typography'
import { Checkbox } from 'design-systems/Atoms/Checkbox'
import { FileTextIcon } from 'design-systems/Atoms/Icons'
import { Spinner } from 'design-systems/Atoms/Spinner'
import { File } from 'design-systems/Molecules/File'
import { NetworkType } from 'design-systems/Organisms/Managers/NFTCreationManager'
import { CLUBRARE_SOCIAL_LINKS } from 'utils'
import { useToast } from 'hooks/useToast'
import { useGlobalState } from 'hooks/store/useGlobalState'
import { useMarketPlaceContract } from 'hooks/useMarketplaceContract'
import { useToggle } from 'hooks/useToggle'

export const ReviewCreateForm: React.FC<ReviewCreateFormProps> = ({
  agreement = false,
  attachments = [],
  category,
  collection,
  currency,
  endDate,
  listingType,
  name,
  network,
  price,
  startDate,
  title,
  onNext,
  onBack,
  onCreateCollectible,
  onUserAgreement,
}) => {
  const { handleSubmit } = useForm()
  const { successToast, warningToast } = useToast()
  const { authUser: activatingUser } = useGlobalState()
  const { getNonce } = useMarketPlaceContract(activatingUser?.networkId as ClubRareNetworks)
  const [isCreating, , , turnOn, turnOff] = useToggle(false)
  const [agreementChecked, setAgreementChecked] = useState<AgreementState>({
    checked: agreement,
    error: false,
  })

  const handleNext = handleSubmit(async (_: FieldValues) => {
    if (!agreementChecked.checked) return setAgreementChecked(prev => ({ ...prev, error: true }))

    setAgreementChecked(prev => ({ ...prev, error: false }))
    turnOn()
    const nonce: BigNumber = await getNonce(activatingUser?.walletAddress as string)
    const res = await onCreateCollectible?.(nonce)
    turnOff()
    if (res) {
      successToast('NFT created successfully')
      onNext?.({})
    } else {
      warningToast('NFT creation failed')
      onNext?.({})
    }
  })

  const onChangeCheckBox = (value: boolean) => {
    setAgreementChecked({ checked: value, error: false })
    onUserAgreement(value)
  }
  const handleBack = () => {
    const isValidCategory = validateAuthenticateCategory(category?.name as string)
    onBack?.(isValidCategory ? { stepId: 4 } : {})
  }
  return (
    <form className="flex h-full w-full flex-col justify-between" onSubmit={handleNext}>
      <div>
        <div className="flex flex-col gap-1">
          <Typography size="h4" variant="condensed">
            REVIEW & CREATE
          </Typography>
          <Typography className="text-neutral-400 dark:text-neutral-700" size="caption" variant="condensed">
            Review the details before clicking on Create to finalize the listing of your item
          </Typography>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-6 rounded-[8px] bg-neutral-700 p-4 dark:bg-neutral-300">
            <div className="flex flex-row space-x-2 border-b border-neutral-600 pb-3">
              <div className="h-28 w-28 ">
                <File
                  alt={attachments?.[0]?.name?.toString()}
                  className="h-28 w-28 !rounded-[6px] object-contain"
                  height={80}
                  src={attachments.length ? URL.createObjectURL(attachments[0]) : ''}
                  type={attachments?.[0]?.type?.toString()}
                  width={80}
                />
              </div>
              <div className="flex w-full flex-1 flex-col justify-between">
                <div className="flex flex-col">
                  <Typography
                    className="font-medium text-neutral-100 dark:text-neutral-700"
                    size="body"
                    variant="regular"
                  >
                    {title}
                  </Typography>
                  <Typography className="text-neutral-400 dark:text-neutral-500" size="caption" variant="condensed">
                    {name}
                  </Typography>
                </div>
                <div className="flex flex-row justify-between">
                  <Typography className="text-neutral-100 dark:text-neutral-700" size="caption" variant="condensed">
                    {listingType === 'fixed' ? 'Buy Price' : ' Minimum Bid'}
                  </Typography>
                  <Typography className="text-neutral-100 dark:text-neutral-700" size="caption" variant="condensed">
                    {price} {currency}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              {startDate && <ListItem label="Start Date" value={formatDate(startDate)} />}
              {endDate && <ListItem label="End Date" value={formatDate(endDate)} />}
              {category?.name && <ListItem label="Category" value={String(category?.name)} />}
              <ListItem label="Collection" value={String(collection?.displayName)} />
              <ListItem label="Network" value={network as NetworkType} />
            </div>
          </div>
          {!agreement && (
            <div>
              <div className=" flex items-center justify-between rounded bg-neutral-700 p-4 dark:bg-neutral-300">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <FileTextIcon className="w-5 stroke-neutral-100 dark:stroke-neutral-600" />
                    <a
                      className="pointer"
                      href={CLUBRARE_SOCIAL_LINKS.agreement}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Typography className="underline" size="paragraph">
                        Creator Agreement
                      </Typography>
                    </a>
                  </div>
                  <Typography className={agreementChecked.error ? 'text-error-800' : ''} size="caption">
                    Read and accept the Creator agreement to list your item
                  </Typography>
                </div>
                <Checkbox onChange={onChangeCheckBox} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="!mb-2 mt-2 flex flex-col px-4 md:mt-5 md:flex-row md:items-center md:justify-between md:px-0">
        <Button
          className="hidden md:flex"
          color="primary"
          disabled={isCreating}
          size="medium"
          variant="outlined"
          onClick={handleBack}
        >
          Back
        </Button>

        {isCreating ? (
          <Spinner className="bg-slate-300 z-10  m-auto mr-0 h-11 w-11 rounded-full stroke-neutral-500 text-neutral-500 dark:stroke-neutral-500 " />
        ) : (
          <Button className="w-full !px-10 uppercase md:w-auto" size="medium" type="submit" variant="solid">
            Create Item
          </Button>
        )}
      </div>
    </form>
  )
}
