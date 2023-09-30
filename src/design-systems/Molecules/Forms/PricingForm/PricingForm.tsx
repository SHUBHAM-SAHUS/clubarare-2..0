import { ethers } from 'ethers'
import moment from 'moment'
import { ChangeEvent, useCallback, useState, useEffect, useMemo } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import { PricingFormProps } from './interface'
import { CATEGORY_TYPE_BUTTONS, DROPDOWN_OPTIONS_ETH, DROPDOWN_OPTIONS_KLAY } from './utils'

import { useConnector } from 'context'
import { ButtonGroup } from 'design-systems/Molecules/ButtonGroups/ButtonGroup'
import { Dropdown } from 'design-systems/Molecules/Dropdown'
import { Input } from 'design-systems/Atoms/Input'
import { Typography } from 'design-systems/Atoms/Typography'
import { Button } from 'design-systems/Atoms/Button'
import {
  AUCTION_TYPES,
  MARKETPLACE_CONTRACT_ADDRESS,
  compareStringsInsentively,
  DATE_TIME_FORMAT,
  CLUBRARE_NETWORKS,
  DEFAULT_KLAYTN_CHAIN_ID,
  parseUnits,
  KLAYTN_SIGN,
  NULL_TOKEN_ADDRESS,
} from 'utils'
import { useGlobalState } from 'hooks/store/useGlobalState'
import { useSingleAsset } from 'hooks/api/useSingleAsset'
import { useCollectionContract } from 'hooks/useCollectionContract'
import { useDateHandler } from 'hooks/useDateHandler'
import { useListAsset } from 'hooks/useListAsset'
import { useMarketPlaceContract } from 'hooks/useMarketplaceContract'
import { useToggle } from 'hooks/useToggle'

export const PricingForm: React.FC<PricingFormProps> = ({ className = '', asset, onClose }) => {
  const { chainId, address } = useConnector()
  const { authUser: activatingUser, connector: activatingConnector } = useGlobalState()
  const { refetchAssetDetails } = useSingleAsset(asset?.id, address)
  const { handleSubmit } = useForm()
  const { onListAsset } = useListAsset()
  const { getApproved, approve } = useCollectionContract(asset.collectionAddress)
  const { getNonce, hashOrder } = useMarketPlaceContract(asset?.networkId)
  const { getUtcStartTime, getUtcEndTime } = useDateHandler()
  const [mode, setMode] = useState<string>('timed-auctions')
  const [selectedToken, setSelectedToken] = useState<any>({ address: ethers.constants.AddressZero, title: 'ETH' })
  const [isLoading, , , showLoading, hideLoading] = useToggle(false)

  useMemo(() => {
    if (asset?.networkId === CLUBRARE_NETWORKS.KLAYTN) {
      setSelectedToken({ address: ethers.constants.AddressZero, title: 'KLAY' })
    } else {
      setSelectedToken({ address: ethers.constants.AddressZero, title: 'ETH' })
    }
  }, [asset])

  const brokerAddress = MARKETPLACE_CONTRACT_ADDRESS[chainId]

  const [inputValues, setInputValue] = useState(initialFormState)
  const [validationError, setValidationError] = useState(initialErrorState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //form validations
    const { name, value, id } = e.target
    setInputValue({ ...inputValues, [name]: value })
    const regex1 = /^[0-9][.\d]{0,17}$/
    switch (name) {
      case 'amount':
        if (value.trim() === '') {
          setValidationError({
            ...validationError,
            amountError: 'Cannot be empty',
          })
        } else if (+value <= 0) {
          setValidationError({
            ...validationError,
            amountError: 'Please Enter greater than 0',
          })
        } else if (value.length >= 19) {
          setValidationError({
            ...validationError,
            amountError: 'Price should not more then 18 digit',
          })
        } else if (!regex1.test(value)) {
          setValidationError({
            ...validationError,
            amountError: 'Please enter correct value',
          })
        } else {
          setValidationError({
            ...validationError,
            amountError: '',
          })
        }
        break
      case 'startDate':
        setValidationError({
          ...validationError,
          startDateError: '',
        })
        if (value === '') {
          setValidationError({
            ...validationError,
            startDateError: 'Cannot be empty. Please Select Start Date ',
          })
        } else if (value) {
          handleStartDate(value, id)
        }
        break
      case 'endDate':
        setValidationError({
          ...validationError,
          endDateError: '',
        })
        if (value === '') {
          setValidationError({
            ...validationError,
            endDateError: 'Cannot be empty. Please Select End Date ',
          })
        } else if (value) {
          handleExpiry(value)
        }
        break

      default:
        break
    }
  }

  const handleStartDate = (dateValue: string, id: string) => {
    const newEndDate = moment(dateValue).add(10, 'minutes').format(DATE_TIME_FORMAT)
    const currentEndDate = moment(inputValues.endDate).format(DATE_TIME_FORMAT)
    if (newEndDate > currentEndDate) {
      setInputValue({ ...inputValues, endDate: newEndDate, startDate: dateValue })
    } else {
      return
    }
  }

  const handleExpiry = (date: string) => {
    if (date === '') {
      // setExpiryDateHandle('')
      setInputValue({ ...inputValues, endDate: '' })
    } else if (date <= inputValues?.minExpiryDate) {
      //  addToast(`Date and time should be greater than ${minExpiryDate1}`, {
      //    appearance: 'error',
      //    autoDismiss: true,
      //  })
      // alert('Date and time should be greater than')
      return true
    } else {
      setInputValue({ ...inputValues, endDate: date })
      //  setExpiryDateHandle(date)
    }
  }

  /**
   * `Network` onChange event handler
   */
  const handleChangeNetwork = useCallback((networkId: string) => {
    setMode(networkId)
    setCurrentTime()
    setValidationError({ ...initialErrorState })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setCurrentTime = () => {
    const date = new Date()
    const expiryDate = moment(date).add(10, 'minutes').format(DATE_TIME_FORMAT)
    const minExpiryDate = moment(date).format(DATE_TIME_FORMAT)
    const currentDateTime = moment(date).format(DATE_TIME_FORMAT)
    setInputValue({ ...inputValues, endDate: expiryDate, minExpiryDate: minExpiryDate, startDate: currentDateTime })
  }

  const handleCurrencyChange = (title: string, address: string) => {
    setSelectedToken({
      address: address,
      title: title,
    })
  }

  useEffect(() => {
    setCurrentTime()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (data: FieldValues) => {
    if (
      validationError?.startDateError !== '' ||
      validationError?.endDateError !== '' ||
      validationError?.amountError !== ''
    ) {
      return true
    } else {
      showLoading()
      const listingObject: ListingObject = {
        auctionType: mode === 'fixed-price' ? AUCTION_TYPES.FIXED : AUCTION_TYPES.AUCTION,
        collectibleOwner: asset?.collectibleOwner,
        contractAddress: asset?.collectionAddress,
        creatorAddress: asset?.userObj?.walletAddress,
        endTime: mode === 'fixed-price' ? 0 : getUtcEndTime(inputValues?.endDate),
        isTokenGated: false,
        objId: asset.id,
        orderType: asset?.redeemable ? 1 : 0,
        paymentTokenType: selectedToken.address as AddressString,
        price: parseUnits(inputValues.amount, selectedToken.title),
        royalty: Number(asset?.royalties ?? 0) * 100,
        startTime: getUtcStartTime(inputValues?.startDate),
        tokenGateAddress: NULL_TOKEN_ADDRESS,
        tokenId: asset?.tokenId ?? 0,
        uri: asset?.ipfsHash,
      }
      try {
        let nonceRes
        if (activatingUser?.role === 'user' && !activatingUser?.isSuperAdmin) {
          if (asset?.tokenId) {
            const approvedAddress = await getApproved(asset?.tokenId)

            if (!compareStringsInsentively(approvedAddress, brokerAddress)) {
              const hash = await approve(brokerAddress, asset?.tokenId)
              if (asset?.networkId === CLUBRARE_NETWORKS.ETHEREUM || activatingConnector === 'METAMASK-KAIKAS') {
                await hash?.wait()
              }
            }
          }
          nonceRes = await getNonce(activatingUser?.walletAddress)
        } else {
          const marketplaceAddress = MARKETPLACE_CONTRACT_ADDRESS[chainId]
          nonceRes = await getNonce(marketplaceAddress)
        }

        if (nonceRes) {
          let hashOrderSignature = ''
          if (chainId === DEFAULT_KLAYTN_CHAIN_ID) {
            hashOrderSignature = await handleKlaytnHashOrder(listingObject, nonceRes)
          }
          await onListAsset({ hashOrderSignature: hashOrderSignature, listing: listingObject, nonce: nonceRes })
          refetchAssetDetails()
          onClose()
          hideLoading()
        }
      } catch (err) {
        onClose()
        hideLoading()
      }
    }
  }

  const handleKlaytnHashOrder = useCallback(async (listingObject: ListingObject, nonceRes: BigNumber) => {
    const hashData: OrderTuple = {
      basePrice: listingObject.price,
      contractAddress: listingObject.contractAddress,
      expirationTime: listingObject.endTime,
      isTokenGated: listingObject.isTokenGated,
      listingTime: listingObject.startTime,
      nonce: nonceRes,
      objId: listingObject.objId,
      orderType: listingObject.orderType,
      paymentToken: listingObject.paymentTokenType,
      royaltyFee: listingObject.royalty,
      royaltyReceiver: listingObject.creatorAddress,
      seller: listingObject.collectibleOwner,
      signature: KLAYTN_SIGN,
      tokenGateAddress: listingObject.tokenGateAddress,
      tokenId: listingObject.tokenId,
      uri: listingObject.uri,
      // isEscrow: false, //TODO : Need to handle escrow
      // isMetamask: activatingConnector === 'METAMASK-KAIKAS' ? true : false,
    }
    const hashOrderSignature = await hashOrder(hashData)
    return hashOrderSignature
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <form
        className={`flex h-[90%] w-full flex-col justify-between rounded-md bg-neutral-800 dark:bg-neutral-300 ${className} relative `}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mt-3 px-3 sm:mt-0 md:px-6">
          <div className="">
            <Typography className="text-neutral-100 dark:text-neutral-600" size="h4" variant="condensed">
              PUT ON SALE
            </Typography>
            <Typography className="text-caption font-normal text-neutral-400 dark:text-neutral-500" variant="condensed">
              Select either Auction or Fixed price, token and pricing details for your item
            </Typography>
          </div>
          <div className="mt-5 md:mt-8">
            <ButtonGroup
              buttons={CATEGORY_TYPE_BUTTONS}
              className="!font-medium dark:!bg-neutral-400"
              clickHandler={handleChangeNetwork}
              variant="secondary"
            />
          </div>
          <div className="w-full max-w-lg pt-3 md:pt-8">
            <div className="-mx-3 mb-4 flex md:mb-6">
              <Input
                className="mb-6 w-full px-3 sm:w-[73%] md:mb-0 md:w-[73%]"
                error={validationError.amountError}
                label={`${mode === 'fixed-price' ? 'Fixed Price*' : 'Minimum Bid*'} `}
                name="amount"
                placeholder="Enter amount"
                required={true}
                value={inputValues.amount}
                variant="fill"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
              />
              <Dropdown
                className="mt-4"
                direction="right"
                options={asset.networkId === CLUBRARE_NETWORKS.KLAYTN ? DROPDOWN_OPTIONS_KLAY : DROPDOWN_OPTIONS_ETH}
                placeholder="ETH"
                value={selectedToken.address}
                onChange={e => handleCurrencyChange(e.title, e.value)}
              />
            </div>
            {mode === 'timed-auctions' && (
              <div className="-mx-3 mb-6 flex w-4/5 flex-wrap md:w-full">
                <div className="mb-6 w-full px-3 sm:mb-0 sm:w-1/2 md:mb-0 md:w-1/2">
                  <Input
                    className="w-full dark:text-neutral-400"
                    error={validationError.startDateError}
                    id="startDate"
                    label="Start Date*"
                    min={inputValues.minExpiryDate}
                    name="startDate"
                    required={true}
                    type="datetime-local"
                    value={inputValues.startDate}
                    variant="fill"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                  />
                </div>
                <div className="w-full px-3 sm:w-1/2 md:w-1/2">
                  <Input
                    className="w-full dark:text-neutral-400"
                    error={validationError.endDateError}
                    id="endDate"
                    label="End Date*"
                    name="endDate"
                    required={true}
                    type="datetime-local"
                    value={inputValues.endDate}
                    variant="fill"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 flex items-end justify-end px-2 pb-4 sm:items-center sm:justify-between">
          <Button className="hidden sm:flex" color="primary" size="small" variant="outlined" onClick={() => onClose()}>
            CANCEL
          </Button>
          <Button
            className="w-full sm:w-auto"
            color="primary"
            loading={isLoading}
            size="medium"
            type="submit"
            variant="solid"
          >
            PUT ON SALE
          </Button>
        </div>
      </form>
    </>
  )
}

const initialFormState = {
  amount: '',
  endDate: '',
  minExpiryDate: '',
  startDate: '',
}

const initialErrorState = {
  amountError: '',
  endDateError: '',
  startDateError: '',
}
