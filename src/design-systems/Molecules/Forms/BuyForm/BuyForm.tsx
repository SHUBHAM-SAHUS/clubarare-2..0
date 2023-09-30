import { FieldValues, useForm } from 'react-hook-form'
import { useCallback, useMemo, useState } from 'react'
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon'

import { FormInput as Input } from '../Form'

import { IMAGE_WIDTH, IMAGE_HEIGHT, calculatePrice, DELIVERY_TYPE, DELIVERY_TYPES, initialFormState } from './utils'
import { BuyFormProps, DeliverFormProps } from './interface'

import { Button } from 'design-systems/Atoms/Button'
import { Typography } from 'design-systems/Atoms/Typography'
import { File } from 'design-systems/Molecules/File'
import { ButtonGroup } from 'design-systems/Molecules/ButtonGroups/ButtonGroup'
import { VaultIcon } from 'design-systems/Atoms/Icons'
import {
  CLUBRARE_NETWORKS,
  CLUBRARE_SOCIAL_LINKS,
  DEFAULT_ETHEREUM_CHAIN_ID,
  DEFAULT_KLAYTN_CHAIN_ID,
  getNftPrice,
  PLATFORM_FEE,
  shortWalletAddress,
} from 'utils'
import { useConnector } from 'context'
import { EMAIL_REGEX } from 'utils/regex'
import { useTokenApproval } from 'hooks/useTokenApproval'
import { useGlobalState } from 'hooks/store/useGlobalState'
import { useBuyService } from 'hooks/useBuyService'
import { useTokenInfo } from 'hooks/useTokenInfo'
import { useToggle } from 'hooks/useToggle'
import { useMountEffect } from 'hooks/useMountHook'

export const BuyForm: React.FC<BuyFormProps> = ({ asset, onClose }) => {
  const { beforeBuyValidation } = useTokenApproval(asset)
  const { isSigned, address, chainId } = useConnector()
  const { connector: activatingConnector } = useGlobalState()
  const { handleBuy } = useBuyService(asset)
  const { getUserTokenInfo } = useTokenInfo()
  const [isLoading, , , showLoading, hideLoading] = useToggle(false)
  const [userBalance, setUserBalance] = useState<any>()
  const [deliveryType, setDeliveryType] = useState<string>(DELIVERY_TYPE.ADDRESS)
  const priceDetail = getNftPrice(asset)
  /**
   * NOTE: escrow is currently not supported
   */
  const [isEscrow, , , onEscrow, offEscrow] = useToggle(false)

  const {
    handleSubmit,
    formState: { errors, isDirty, isValid },
    control,
  } = useForm<FieldValues | DeliverFormProps>({
    defaultValues: initialFormState,
    mode: 'onChange',
  })

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

  const buyModelData = useMemo(
    () => ({
      currency: priceDetail ? (priceDetail.token as Currency) : 'ETH',
      fee: PLATFORM_FEE,
      networkId: asset.networkId ?? CLUBRARE_NETWORKS.ETHEREUM,
      price: priceDetail ? Number(priceDetail.amount) : 0,
      seller: creatorName,
      src: asset.previewUrl ?? '',
      title: asset.title ?? '',
    }),
    [asset, priceDetail, creatorName]
  )

  const { total, fee: feeAmount } = calculatePrice(buyModelData.price, buyModelData.fee)

  const handleApproval = useCallback(
    async (data: DeliverFormProps) => {
      const isValid = await beforeBuyValidation(onClose, hideLoading)
      if (isValid) {
        await handleBuy(data, buyModelData, deliveryType, false, onClose, hideLoading) //isEscrow : false for now
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [buyModelData, deliveryType]
  )

  const handleChangeDeliver = useCallback((DeliveryType: string) => {
    setDeliveryType(DeliveryType)

    if (DeliveryType === DELIVERY_TYPE.ADDRESS) {
      onEscrow()
    } else {
      offEscrow()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // form Submit
  const onSubmit = async (data: FieldValues) => {
    showLoading()
    handleApproval(data as DeliverFormProps)
  }

  useMountEffect(() => {
    /**
     * TODO: create custom hook and import here
     */
    const fetchUserBalance = async () => {
      const itemChainId: SupportedChainIds =
        buyModelData.networkId == CLUBRARE_NETWORKS.ETHEREUM ? DEFAULT_ETHEREUM_CHAIN_ID : DEFAULT_KLAYTN_CHAIN_ID

      if (isSigned && chainId && address && activatingConnector) {
        const userBalanceInfo = await getUserTokenInfo(itemChainId, address, activatingConnector, buyModelData.currency)
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
      <div className="divide-y divide-neutral-600 rounded-sm bg-neutral-700 px-2 dark:bg-neutral-200">
        <div className="flex flex-row gap-x-2 py-4">
          <div className="flex w-full items-center justify-center">
            <div>
              <File
                alt={buyModelData.title}
                className="h-20 rounded"
                height={IMAGE_HEIGHT}
                src={buyModelData.src}
                type={asset.fileContentType}
                width={IMAGE_WIDTH}
              />
            </div>
          </div>
          <div className="flex w-[70%] flex-col justify-between">
            <div className="flex flex-col pb-4">
              <Typography
                className="break-all font-medium text-neutral-100 dark:text-neutral-700"
                size="body"
                variant="regular"
              >
                {buyModelData.title}
              </Typography>
              <Typography className="text-neutral-400 dark:text-neutral-500" size="caption" variant="condensed">
                {buyModelData.seller}
              </Typography>
            </div>
            <div className="flex flex-row justify-between">
              <Typography className="text-neutral-100 dark:text-neutral-700" size="caption" variant="condensed">
                Buy Price
              </Typography>
              <Typography className="text-neutral-100 dark:text-neutral-700" size="caption" variant="condensed">
                {buyModelData.price} {buyModelData.currency}
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-4">
          <div className="flex flex-row justify-between">
            <Typography className="text-neutral-400 dark:text-neutral-500" size="caption" variant="condensed">
              {buyModelData.currency} balance
            </Typography>
            <Typography className="text-neutral-400 dark:text-neutral-500" size="caption" variant="condensed">
              {userBalance?.tokenAmount}
            </Typography>
          </div>
          <div className="flex flex-row justify-between">
            <Typography className="text-neutral-400 dark:text-neutral-500" size="caption" variant="condensed">
              Platform fee {buyModelData.fee}%
            </Typography>
            <Typography className="text-neutral-400 dark:text-neutral-500" size="caption" variant="condensed">
              {feeAmount} {buyModelData.currency}
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
              {buyModelData.price} {buyModelData.currency}
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
          BUY
        </Button>
      </div>
    </form>
  )
}
