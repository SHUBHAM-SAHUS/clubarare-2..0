/* eslint-disable react-hooks/exhaustive-deps */
import { FieldValues, useForm } from 'react-hook-form'
import { useCallback, useMemo, useState } from 'react'
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon'

import { DELIVERY_TYPE, DELIVERY_TYPES } from '../BuyForm/utils'
import { FormInput as Input } from '../Form'

import { IMAGE_WIDTH, IMAGE_HEIGHT, calculatePrice, initialFormState } from './utils'
import { BidFormProps, InitialFormProps } from './interface'

import { Button } from 'design-systems/Atoms/Button'
import { ButtonGroup } from 'design-systems/Molecules/ButtonGroups/ButtonGroup'
import { InfoIcon, VaultIcon } from 'design-systems/Atoms/Icons'
import { Typography } from 'design-systems/Atoms/Typography'
import { File } from 'design-systems/Molecules/File'
import { useConnector } from 'context'
import {
  CLUBRARE_NETWORKS,
  CLUBRARE_SOCIAL_LINKS,
  DEFAULT_ETHEREUM_CHAIN_ID,
  DEFAULT_KLAYTN_CHAIN_ID,
  EMAIL_REGEX,
  getNftPrice,
  PLATFORM_FEE,
  shortWalletAddress,
} from 'utils'
import { useGlobalState } from 'hooks/store/useGlobalState'
import { useTokenApproval } from 'hooks/useTokenApproval'
import { useTokenInfo } from 'hooks/useTokenInfo'
import { useBidService } from 'hooks/useBidService'
import { useToggle } from 'hooks/useToggle'
import { useMountEffect } from 'hooks/useMountHook'

export const BidForm: React.FC<BidFormProps> = ({ asset, onClose }) => {
  const creatorName = useMemo(
    () =>
      asset && asset?.ownerObj?.name
        ? asset?.ownerObj?.name
        : asset?.ownerObj?.walletAddress
        ? shortWalletAddress(asset?.ownerObj?.walletAddress)
        : asset?.collectibleOwner
        ? shortWalletAddress(asset?.collectibleOwner)
        : '',
    [asset]
  )

  const { price, fee, src, title, seller, currency, isEscrow, fileType } = useMemo(() => {
    const priceDetail = getNftPrice(asset)

    return {
      currency: priceDetail ? (priceDetail.token as Currency) : 'ETH',
      fee: PLATFORM_FEE,
      fileType: asset.fileContentType ?? '',
      isEscrow: false, //TODO: need to check escrow here
      networkId: asset.networkId ?? CLUBRARE_NETWORKS.ETHEREUM,
      price: priceDetail ? Number(priceDetail.amount) : 0,
      seller: creatorName,
      src: asset.previewUrl ?? '',
      title: asset.title ?? '',
    }
  }, [asset, creatorName])

  const { isSigned, address } = useConnector()
  const { connector: activatingConnector } = useGlobalState()
  const { beforeBidValidation } = useTokenApproval(asset)
  const [userBalance, setUserBalance] = useState<any>()
  const { handleBid } = useBidService(asset)
  const { getUserTokenInfo } = useTokenInfo()
  const { total, fee: feeAmount } = calculatePrice(price, fee)
  const [isLoading, , , showLoading, hideLoading] = useToggle(false)
  const [deliveryType, setDeliveryType] = useState<string>(DELIVERY_TYPE.ADDRESS)

  const {
    handleSubmit,
    formState: { errors, isDirty, isValid },
    control,
    watch,
  } = useForm<FieldValues | InitialFormProps>({
    defaultValues: initialFormState,
    mode: 'onChange',
  })
  const { bidAmount } = watch()

  const handleApproval = useCallback(
    async (inputData: FieldValues) => {
      const isValid = await beforeBidValidation(inputData.bidAmount, onClose, hideLoading)
      if (isValid) {
        handleBid(inputData, deliveryType, isEscrow, onClose, hideLoading)
      }
    },
    [deliveryType, isEscrow]
  )

  const onSubmit = async (data: FieldValues) => {
    showLoading()
    handleApproval(data)
  }

  const handleChangeDeliver = (DeliveryType: string) => {
    setDeliveryType(DeliveryType)
  }

  useMountEffect(() => {
    /**
     * TODO: create custom hook and import here
     */
    const fetchUserBalance = async () => {
      const itemChainId: SupportedChainIds =
        asset.networkId == CLUBRARE_NETWORKS.ETHEREUM ? DEFAULT_ETHEREUM_CHAIN_ID : DEFAULT_KLAYTN_CHAIN_ID

      if (isSigned && address && activatingConnector) {
        const userBalanceInfo = await getUserTokenInfo(itemChainId, address, activatingConnector, currency)
        setUserBalance(userBalanceInfo)
      }
    }
    fetchUserBalance()
  })

  return (
    <form
      className="relative flex h-[80vh] flex-col justify-between overflow-y-scroll"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="h-[88vh] divide-y rounded-sm bg-neutral-700 px-2 dark:bg-neutral-200 sm:h-auto">
        <div className="flex flex-row gap-x-2 py-4">
          <div className="flex w-full items-center justify-center">
            <div>
              <File
                alt={title}
                className="h-20 rounded "
                height={IMAGE_HEIGHT}
                src={src}
                type={fileType}
                width={IMAGE_WIDTH}
              />
            </div>
          </div>

          <div className="flex w-full flex-col justify-between">
            <div className="flex flex-col">
              <Typography className="font-medium text-neutral-100 dark:text-neutral-700" size="body" variant="regular">
                {title}
              </Typography>
              <Typography className="text-neutral-400 dark:text-neutral-500" size="caption" variant="condensed">
                {seller}
              </Typography>
            </div>
            <div className="flex flex-row justify-between">
              <Typography className="text-neutral-100 dark:text-neutral-700" size="caption" variant="condensed">
                Current Bid
              </Typography>
              <Typography className="text-neutral-100 dark:text-neutral-700" size="caption" variant="condensed">
                {price} {currency}
              </Typography>
            </div>
          </div>
        </div>

        <div className="flex flex-col py-4">
          <div className="mb-4">
            <Input
              className="w-full !normal-case"
              control={control}
              error={errors?.bidAmount?.message?.toString()}
              id="bidAmount"
              label="Your bid"
              name="bidAmount"
              placeholder="Enter amount"
              required={true}
              rules={{
                maxLength: { message: 'Please enter valid  amount', value: 18 },
                min: { message: 'Please enter valid  amount', value: 0 },
                required: { message: 'Bid amount can not be empty', value: true },
              }}
              step="any"
              type="number"
              variant="secondary"
            />

            <Typography className="mt-1 flex     items-center  gap-1 !normal-case text-neutral-500" size="small">
              <InfoIcon fill="fill-neutral-500" height={12} stroke="stroke-neutral-500" width={12} />
              Bid must be higher than current bid price
            </Typography>
          </div>
          <div className="flex flex-row justify-between">
            <Typography className="text-neutral-400 dark:text-neutral-500" size="caption" variant="condensed">
              {currency} balance
            </Typography>
            <Typography className="text-neutral-400 dark:text-neutral-500" size="caption" variant="condensed">
              {userBalance?.tokenAmount} {currency}
            </Typography>
          </div>
          <div className="flex flex-row justify-between">
            <Typography className="text-neutral-400 dark:text-neutral-500" size="caption" variant="condensed">
              Platform fee {fee}%
            </Typography>
            <Typography className="text-neutral-400 dark:text-neutral-500" size="caption" variant="condensed">
              {feeAmount} {currency}
            </Typography>
          </div>
        </div>
        {asset.redeemable && (
          <>
            <div className="mt-4">
              <div className="mt-4 flex items-center">
                <Typography
                  className="!normal-case text-neutral-100 dark:text-neutral-700"
                  size="caption"
                  variant="condensed"
                >
                  Select delivery type
                </Typography>
                <InformationCircleIcon className="ml-1 h-4 w-4" />
              </div>
              <ButtonGroup buttons={DELIVERY_TYPES} clickHandler={handleChangeDeliver} variant="primary" />
            </div>
            {deliveryType === DELIVERY_TYPE.ADDRESS ? (
              <div className="mt-4">
                <Typography className="mt-2 !normal-case text-neutral-400" size="small" variant="condensed">
                  Add your delivery address, name and email to buy or bid on an item.
                </Typography>
                <div className="mt-4 rounded bg-transparent px-3 py-4">
                  <div className="space-y-4">
                    <Input
                      className="w-full !font-normal !normal-case"
                      control={control}
                      error={errors?.name?.message?.toString()}
                      innerClassName="!bg-transparent"
                      label="Full Name"
                      name="name"
                      placeholder="Add full name"
                      required={true}
                      rules={{
                        maxLength: { message: 'Name must not be greater than 20 characters long', value: 20 },
                        minLength: { message: 'Name must be greater than 2 characters long', value: 2 },
                        required: { message: 'Name can not be empty', value: true },
                      }}
                      type="text"
                      variant="primary"
                    />
                    <Input
                      className="w-full !normal-case"
                      control={control}
                      error={errors?.email?.message?.toString()}
                      innerClassName="!bg-transparent"
                      label="Email"
                      name="email"
                      placeholder="Add email"
                      required={true}
                      rules={{
                        pattern: {
                          message: 'Please enter a valid email address',
                          value: EMAIL_REGEX,
                        },
                        required: { message: 'Email can not be empty', value: true },
                      }}
                      type="email"
                      variant="primary"
                    />
                    <Input
                      className="w-full !normal-case"
                      control={control}
                      error={errors?.address?.message?.toString()}
                      innerClassName="!bg-transparent"
                      label="Address"
                      name="address"
                      placeholder="Add full address"
                      required={true}
                      rules={{
                        maxLength: { message: 'Please enter shorter address', value: 120 },
                        minLength: { message: 'Please enter valid address', value: 6 },
                        required: { message: 'Address can not be empty', value: true },
                      }}
                      type="text"
                      variant="primary"
                    />
                    <div className="grid grid-cols-2 gap-8">
                      <Input
                        className="w-full !normal-case"
                        control={control}
                        error={errors?.city?.message?.toString()}
                        innerClassName="!bg-transparent"
                        label="City"
                        name="city"
                        placeholder="Add city"
                        required={true}
                        rules={{
                          maxLength: { message: 'Please enter shorter city name', value: 20 },
                          minLength: { message: 'Please enter valid city name', value: 2 },
                          required: { message: 'City can not be empty', value: true },
                        }}
                        type="text"
                        variant="primary"
                      />
                      <Input
                        className="w-full !normal-case"
                        control={control}
                        error={errors?.state?.message?.toString()}
                        innerClassName="!bg-transparent"
                        label="State/Region"
                        name="state"
                        placeholder="Add state"
                        required={true}
                        rules={{
                          maxLength: { message: 'Please enter shorter State/Region', value: 20 },
                          minLength: { message: 'Please enter valid State/Region', value: 2 },
                          required: { message: 'State/Region can not be empty', value: true },
                        }}
                        type="text"
                        variant="primary"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <Input
                        className="w-full !normal-case"
                        control={control}
                        error={errors?.zip?.message?.toString()}
                        innerClassName="!bg-transparent"
                        label="Zip/Postal Code"
                        name="zip"
                        placeholder="Add zip/postal"
                        required={true}
                        rules={{
                          maxLength: { message: 'Please enter valid zip code', value: 10 },
                          required: { message: 'Zip code can not be empty', value: true },
                        }}
                        type="text"
                        variant="primary"
                      />
                      <Input
                        className="w-full !normal-case"
                        control={control}
                        error={errors?.country?.message?.toString()}
                        id="country"
                        innerClassName="!bg-transparent"
                        label="Country"
                        name="country"
                        placeholder="Select"
                        required={true}
                        rules={{
                          maxLength: { message: 'Please enter shorter country name', value: 20 },
                          minLength: { message: 'Please enter valid country name', value: 2 },
                          required: { message: 'Country name can not be empty', value: true },
                        }}
                        type="text"
                        variant="primary"
                      />
                    </div>
                    <Input
                      className="w-full !normal-case"
                      control={control}
                      error={errors?.phone?.message?.toString()}
                      innerClassName="!bg-transparent"
                      label="Phone Number"
                      name="phone"
                      placeholder="Add your phone number"
                      rules={{
                        required: { value: false },
                      }}
                      type="number"
                      variant="primary"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded bg-neutral-800 p-2 dark:bg-neutral-300">
                <div className="flex items-center space-x-1">
                  <VaultIcon className="h-8 w-8" />
                  <Typography
                    className="font-normal uppercase text-neutral-100 dark:text-neutral-700"
                    size="caption"
                    variant="condensed"
                  >
                    CLUBRARE VAULT
                  </Typography>
                </div>
                <div className="mt-2">
                  <Typography
                    className="font-normal !normal-case text-neutral-100 dark:text-neutral-700"
                    size="caption"
                    variant="condensed"
                  >
                    Safely store your items with ClubRare Vault.
                    <a className="cursor-pointer" href={CLUBRARE_SOCIAL_LINKS.node} rel="noreferrer" target="_blank">
                      <span className="ml-1 underline underline-offset-1">Learn More</span>
                    </a>
                  </Typography>
                </div>
              </div>
            )}
          </>
        )}
        <div className="flex flex-col py-4">
          <div className="flex flex-row justify-between">
            <Typography className="text-neutral-100 dark:text-neutral-700" size="sm" variant="condensed">
              You will pay
            </Typography>
            <Typography
              className="font-normal text-neutral-100 dark:text-neutral-700"
              size="paragraph"
              variant="condensed"
            >
              {bidAmount} {currency}
            </Typography>
          </div>
          {userBalance && userBalance?.tokenAmount < total && (
            <div className="flex flex-row justify-end">
              <Typography className="text-error-800" size="sm" variant="condensed">
                Insufficient balance
              </Typography>
            </div>
          )}
        </div>
      </div>
      <div className="pb-4 pt-2">
        <Button
          disabled={asset.redeemable && deliveryType === DELIVERY_TYPE.ADDRESS ? !isDirty || !isValid : false}
          fullWidth
          loading={isLoading}
          type="submit"
        >
          PLACE BID
        </Button>
      </div>
    </form>
  )
}
