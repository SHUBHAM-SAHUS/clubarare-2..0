import { useMemo, useEffect, useState } from 'react'
import moment from 'moment'
import { FieldValues, useForm } from 'react-hook-form'

import { FormInput as Input } from '../Form'

import { ListingFormProps } from './interface'
import { CATEGORY_TYPE_BUTTONS, DROPDOWN_OPTIONS_ETH, DROPDOWN_OPTIONS_KLAY, checkType } from './utils'

import { ButtonGroup } from 'design-systems/Molecules/ButtonGroups/ButtonGroup'
import { Dropdown, type DropdownOption } from 'design-systems/Molecules/Dropdown'
import { Typography } from 'design-systems/Atoms/Typography'
import { Button } from 'design-systems/Atoms/Button'
import { ListingType, CurrencyType, NetworkType } from 'design-systems/Organisms/Managers/NFTCreationManager'
import { DATE_TIME_FORMAT, PRICE_REGEX, ROYALTIES_REGEX } from 'utils'
import { Toggle } from 'design-systems/Atoms/Toggle'

export const ListingForm: React.FC<ListingFormProps> = ({
  listingType,
  network,
  price,
  startDate,
  endDate,
  royalties,
  isTokenGated,
  onBack,
  onNext,
  onSelectCurrency,
  onSelectListingType,
  onSelectIsTokenGated,
}) => {
  const currentCurrency: CurrencyType = useMemo(
    () => (network === NetworkType.ETHEREUM ? CurrencyType.ETH : CurrencyType.KLAY),
    [network]
  )
  const [currency, setCurrency] = useState<CurrencyType>(currentCurrency)
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues | ListingFormProps>({
    defaultValues: {
      endDate: checkType(endDate) === 'string' ? endDate : moment(endDate).format(DATE_TIME_FORMAT),
      price: price,
      royalties: royalties,
      startDate: checkType(startDate) === 'string' ? startDate : moment(startDate).format(DATE_TIME_FORMAT),
    },
    mode: 'onChange',
  })

  const {
    price: priceWatcher,
    startDate: startDateWatcher,
    endDate: endDateWatcher,
    royalties: royaltiesWatcher,
  } = watch()

  const minStartDate: string = useMemo(() => moment(startDate ?? new Date()).format(DATE_TIME_FORMAT), [startDate])

  const minEndDate: string = useMemo(
    () => moment(startDateWatcher).add(1, 'day').format(DATE_TIME_FORMAT),
    [startDateWatcher]
  )

  const endDateValue: string = useMemo(() => {
    const nextDayDate = moment(startDateWatcher).add(1, 'day')
    const endDateLocal = moment(endDateWatcher ? endDateWatcher : endDate)
    if (moment(endDateLocal).isAfter(nextDayDate)) {
      return endDateLocal.format(DATE_TIME_FORMAT)
    } else {
      return nextDayDate.format(DATE_TIME_FORMAT)
    }
  }, [startDateWatcher, endDateWatcher, endDate])

  useEffect(() => {
    reset(formValues => ({
      ...formValues,
      endDate: undefined,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDateWatcher])

  const handleChangeCurrency = ({ value }: DropdownOption) => {
    setCurrency(value as CurrencyType)
  }

  const handleNext = handleSubmit((values: FieldValues) => {
    if (listingType === ListingType.FIXED) {
      values.startDate = undefined
      values.endDate = undefined
    } else {
      values.endDate = endDateValue
    }

    onSelectCurrency?.(currency as CurrencyType)
    onNext?.(values)
  })

  const dropdownOptions = useMemo(
    () => (network === 'ethereum' ? DROPDOWN_OPTIONS_ETH : DROPDOWN_OPTIONS_KLAY),
    [network]
  )

  return (
    <form className="flex h-full w-full flex-col justify-between" onSubmit={handleNext}>
      <div>
        <div className="px-1 md:px-0">
          <div className="flex w-full flex-row">
            <div className="flex flex-col justify-between">
              <Typography className="text-neutral-100 dark:text-neutral-600" size="h4" variant="condensed">
                PRICING
              </Typography>
              <Typography
                className="text-caption font-normal text-neutral-400 dark:text-neutral-500"
                variant="condensed"
              >
                Choose a type of sale - Fixed price, the item is listed at the price you set. Or, Timed auction, the
                item is listed for auction.
              </Typography>
            </div>
          </div>
          <div className="mt-5">
            <ButtonGroup
              buttons={CATEGORY_TYPE_BUTTONS}
              className="!font-medium dark:!bg-neutral-400"
              clickHandler={onSelectListingType}
              value={listingType}
              variant="secondary"
            />
          </div>
          <div className="w-full max-w-lg pt-5">
            <div className="mb-6 flex flex-row justify-between">
              <Input
                className="w-full sm:w-[72%] md:w-[72%]"
                control={control}
                defaultValue={priceWatcher ?? price}
                error={errors?.price?.message?.toString()}
                label={listingType === ListingType.FIXED ? 'Fixed Price' : 'Minimum Bid'}
                name="price"
                placeholder="Enter amount"
                required
                rules={{
                  min: { message: 'Price must be greater than 0.', value: 0.0000001 },
                  pattern: {
                    message: 'Please enter correct value',
                    value: PRICE_REGEX,
                  },
                  required: {
                    message: 'price can not be empty',
                    value: true,
                  },
                }}
                step="any"
                type="number"
                variant="secondary"
              />
              <Dropdown
                className="mt-4"
                direction="right"
                options={dropdownOptions}
                placeholder="ETH"
                value={currency}
                onChange={handleChangeCurrency}
              />
            </div>
            {listingType === ListingType.AUCTION && (
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="mb-6 w-full px-3 sm:mb-0 sm:w-1/2 md:mb-0 md:w-1/2">
                  <Input
                    className="w-full dark:text-neutral-400"
                    control={control}
                    defaultValue={startDateWatcher ?? minStartDate}
                    error={errors?.startDate?.message?.toString()}
                    label="Start Date"
                    min={moment(new Date()).format(DATE_TIME_FORMAT)}
                    name="startDate"
                    required
                    rules={{
                      required: { message: 'startDate can not be empty', value: true },
                    }}
                    type="datetime-local"
                    variant="secondary"
                  />
                </div>
                <div className="w-full px-3 sm:w-1/2 md:w-1/2">
                  <Input
                    className="w-full dark:text-neutral-400"
                    control={control}
                    error={errors?.endDate?.message?.toString()}
                    label="End Date"
                    min={minEndDate}
                    name="endDate"
                    required
                    rules={{
                      required: { message: 'endDate can not be empty', value: true },
                    }}
                    type="datetime-local"
                    value={endDateValue}
                    variant="secondary"
                  />
                </div>
              </div>
            )}
            <div className="mb-6 flex w-full flex-row">
              <Input
                className="w-full md:mb-0"
                control={control}
                error={errors?.royalties?.message?.toString()}
                label="Royalties"
                name="royalties"
                placeholder="e.g 10%"
                required
                rules={{
                  max: { message: 'Royalties can not set more than 90', value: 90 },
                  min: { message: 'Royalties can not be 0', value: 0.000001 },
                  pattern: {
                    message: 'Royalties can set only two decimal after a number, For example: 29.84',
                    value: ROYALTIES_REGEX,
                  },
                  required: { message: 'Royalties can not be empty', value: true },
                }}
                type="number"
                value={royaltiesWatcher ?? royalties}
                variant="secondary"
              />
            </div>
            {network === NetworkType.ETHEREUM && (
              <div className="mb-6 flex w-full flex-row">
                <div className="flex-1">
                  <Typography
                    className="text-caption font-semibold text-neutral-100 dark:text-neutral-600"
                    size="caption"
                    variant="condensed"
                  >
                    Do you want this to be a token-gated listing?
                  </Typography>
                  <Typography className="text-small italic text-neutral-400 dark:text-neutral-500" size="caption">
                    Switch toggle on to only offer item to Lazy Leo Club holders.
                  </Typography>
                </div>
                <Toggle defaultCheck={isTokenGated} onChange={onSelectIsTokenGated} />
              </div>
            )}
            {/* TODO: hide until escrow 
            <div className="mb-6 flex flex-row justify-between">
              <div className="mb-6 w-full sm:mb-0 sm:w-[80%] md:mb-0 md:w-[80%]">
                <Typography
                  variant="condensed"
                  className="text-paragraph font-normal text-neutral-100 dark:text-neutral-600"
                >
                  Activate “Burn option”
                </Typography>
                <Typography
                  variant="condensed"
                  className="text-caption font-normal text-neutral-400 dark:text-neutral-500"
                >
                  Destroy the digital NFT attached to the physical item after redemption of the product.
                  <span className="underline"> Learn more</span>
                </Typography>
              </div>
              <div className="flex items-start pt-1">
                <Toggle defaultCheck={burnable} onChange={onSelectBurnable} />
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="!mb-2 mt-2 flex flex-col px-4 md:flex-row  md:items-center md:justify-between md:px-0">
        <Button className="hidden md:flex" color="primary" size="medium" variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button
          className="w-full !px-10 uppercase md:w-auto"
          color="primary"
          size="medium"
          type="submit"
          variant="solid"
        >
          NEXT
        </Button>
      </div>
    </form>
  )
}
