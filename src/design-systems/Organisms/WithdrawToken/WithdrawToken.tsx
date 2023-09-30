import { useCallback, useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useDebounce } from 'use-debounce'
import {
  useFeeData,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useQueryClient,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'
import { BigNumber, utils } from 'ethers'

import { CurrencyIcon, type currencyOptionProps } from '../UserWallet'

import { useConnector } from 'context'
import { IconButton } from 'design-systems/Atoms/IconButton'
import { CloseIcon } from 'design-systems/Atoms/Icons'
import { Typography, TypographyProps } from 'design-systems/Atoms/Typography'
import { Dropdown, DropdownOption } from 'design-systems/Molecules/Dropdown'
import { DROPDOWN_OPTIONS_ETH, DROPDOWN_OPTIONS_KLAY } from 'design-systems/Molecules/Forms/PricingForm/utils'
import { Button } from 'design-systems/Atoms/Button'
import { FormInput as Input } from 'design-systems/Molecules/Forms/Form'
import {
  ADDRESS_REGEX,
  CLUBRARE_NETWORKS,
  DEFAULT_ETHEREUM_CHAIN_ID,
  NULL_TOKEN_ADDRESS,
  PRICE_REGEX,
  QUERIES,
  classNames,
  compareStringsInsentively,
  getTokenKey,
  parseUnits,
} from 'utils'
import { useToast } from 'hooks/useToast'

export const WithdrawToken: React.FC<WithdrawTokenProps> = ({
  initialCurrency = NULL_TOKEN_ADDRESS,
  balances,
  onRefetchBalances,
  onClose,
}) => {
  const { isEthereum, chainId, address: account } = useConnector()
  const { successToast, warningToast } = useToast()
  const dropdownOptions = useMemo(() => (isEthereum ? DROPDOWN_OPTIONS_ETH : DROPDOWN_OPTIONS_KLAY), [isEthereum])

  const options = useMemo(() => {
    if (!balances) return dropdownOptions

    return dropdownOptions.map(option => {
      const balance = balances.find(b => compareStringsInsentively(b.token, option.title))
      if (!balance) return option

      return {
        ...option,
        badge: balance.tokenAmount,
        icon: <CurrencyIcon token={balance.token} wallet="Ethereum" />,
      }
    })
  }, [dropdownOptions, balances])

  const {
    formState: { errors },
    setValue,
    control,
    watch,
  } = useForm<FieldValues | WithdrawTokenFormState>({
    defaultValues: {
      amount: '',
      address: '',
    },
    mode: 'onChange',
  })

  const queryClient = useQueryClient()

  const { address, amount } = watch()
  const [currency, setCurrency] = useState<AddressString>(initialCurrency)
  const [debouncedTo] = useDebounce(address, 500)
  const [debouncedAmount] = useDebounce(amount, 500)

  const maxBalance = useMemo(() => {
    const tokenKey = getTokenKey(CLUBRARE_NETWORKS.ETHEREUM, currency)
    const balance = balances.find(b => compareStringsInsentively(b.token, tokenKey))
    if (!balance) return 0
    return balance.tokenAmount
  }, [currency, balances])

  const isFormValid = useMemo(() => {
    /** Do not merge if cases to make it readable easily */
    if (!currency) return false
    if (!maxBalance) return false
    if (!ADDRESS_REGEX.test(address)) return false
    if (compareStringsInsentively(address, NULL_TOKEN_ADDRESS)) return false
    if (Number(amount) <= 0 || Number(amount) > maxBalance) return false

    return true
  }, [maxBalance, currency, address, amount])

  const resetBalance = useCallback(
    (token: string, tokenAmount: string) => {
      const tokenKey = getTokenKey(CLUBRARE_NETWORKS.ETHEREUM, token)

      const queryKey = [QUERIES.TOKEN.GET_BALANCE, chainId, account]
      const prevBalances = queryClient.getQueryData<currencyOptionProps[]>(queryKey) ?? []

      const newBalances = prevBalances.map(prevBalance =>
        compareStringsInsentively(prevBalance.token, tokenKey)
          ? {
              ...prevBalance,
              tokenAmount: Number(prevBalance.tokenAmount) - Number(tokenAmount),
              usdAmount: (Number(prevBalance.tokenAmount) - Number(tokenAmount)) * Number(prevBalance.rate),
            }
          : prevBalance
      )

      queryClient.setQueriesData(queryKey, newBalances)
    },
    [chainId, account, queryClient]
  )

  const handleTransactionCompletion = useCallback(() => {
    resetBalance(currency, amount)
    successToast('Withdrawal transaction has been completed.')
    onClose()
  }, [currency, amount, onClose, resetBalance, successToast])

  const handleTransactionFailure = useCallback(() => {
    warningToast('Withdrawal transaction has been failed.')
  }, [warningToast])

  /** Send ETH transaction */
  const { config: sendEthConfig } = usePrepareSendTransaction({
    request: {
      to: debouncedTo,
      value: debouncedAmount ? utils.parseEther(debouncedAmount) : undefined,
    },
    enabled: currency === NULL_TOKEN_ADDRESS && isFormValid,
  })
  const { sendTransaction: sendEthTransaction, data: ethTransferTX } = useSendTransaction(sendEthConfig)

  /** Send Token transaction */
  const { config: sendTokenConfig } = usePrepareContractWrite({
    address: currency,
    abi: [
      {
        name: 'transfer',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'tokens', type: 'uint256' },
        ],
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      },
    ],
    functionName: 'transfer',
    args: [
      debouncedTo,
      debouncedAmount && currency
        ? BigNumber.from(parseUnits(debouncedAmount, getTokenKey(CLUBRARE_NETWORKS.ETHEREUM, currency)))
        : BigNumber.from(0),
    ],
    enabled: currency && currency !== NULL_TOKEN_ADDRESS && isFormValid,
  })

  const { sendTransaction: sendTokenTransaction, data: tokenTransferTX } = useSendTransaction(sendTokenConfig)

  const transactionHash = useMemo(
    () => (currency === NULL_TOKEN_ADDRESS ? ethTransferTX?.hash : tokenTransferTX?.hash),
    [currency, ethTransferTX, tokenTransferTX]
  )

  const { isLoading } = useWaitForTransaction({
    chainId: DEFAULT_ETHEREUM_CHAIN_ID,
    hash: transactionHash,
    enabled: Boolean(currency) && Boolean(transactionHash),
    onSuccess: handleTransactionCompletion,
    onError: handleTransactionFailure,
  })

  const handleChangeToken = useCallback((val: DropdownOption) => {
    setCurrency(val.value as `0x${string}`)
    setValue('amount', 0)
  }, [])

  const handleSetMaxBalance = useCallback(() => {
    setValue('amount', String(maxBalance), { shouldValidate: true, shouldTouch: true, shouldDirty: true })
  }, [maxBalance, setValue])

  const handleWithdraw = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (!currency) return

      if (currency === NULL_TOKEN_ADDRESS) {
        sendEthTransaction?.()
      } else {
        sendTokenTransaction?.()
      }

      successToast('Your withdraw transaction is sent')
    },
    [currency, sendEthTransaction, sendTokenTransaction, successToast]
  )

  return (
    <div className="flex w-full flex-col gap-6 rounded-t-sm bg-neutral-700 px-6 py-4 dark:bg-neutral-100">
      <div className="flex w-full items-center justify-between">
        <Typography className="font-bold" size="subtitle">
          WITHDRAW
        </Typography>
        <IconButton
          className="flex items-center justify-center !bg-transparent"
          id="Button:CloseWithdrawSection"
          onClick={onClose}
        >
          <CloseIcon className="h-6 w-6 stroke-neutral-300 dark:stroke-neutral-500" stroke="" />
        </IconButton>
      </div>

      <form className="flex w-full flex-col gap-6" onSubmit={handleWithdraw}>
        <div className="flex w-full flex-col gap-1">
          <Typography {...FormLabelProps}>Select token</Typography>
          <Dropdown
            className={ClassNames.dropdown}
            direction="right"
            dropdownClass={ClassNames.dropdownBody}
            options={options}
            placeholder="Select token"
            value={currency}
            onChange={handleChangeToken}
          />
        </div>

        <div className="flex w-full flex-col gap-1">
          <Input
            action={
              <Button
                type="button"
                className="bg-neutral-500 !py-[2px]"
                color="primary"
                disabled={!currency}
                size="small"
                variant="solid"
                onClick={handleSetMaxBalance}
              >
                MAX
              </Button>
            }
            className="w-full"
            control={control}
            disabled={isLoading}
            error={errors?.amount?.message?.toString()}
            label="Amount"
            name="amount"
            placeholder="Enter amount"
            required
            rules={{
              min: { message: 'Amount must be greater than 0.', value: 0.0000001 },
              max: { message: 'Amount must be smaller than balance.', value: maxBalance },
              pattern: {
                message: 'Please enter correct value',
                value: PRICE_REGEX,
              },
              required: {
                message: 'amount can not be empty',
                value: true,
              },
            }}
            step="any"
            type="number"
            variant="secondary"
            value={amount}
          />
        </div>

        <div className="flex w-full flex-col gap-1">
          <Input
            className="w-full"
            control={control}
            disabled={isLoading}
            error={errors?.address?.message?.toString()}
            label="Address"
            name="address"
            placeholder="Add full address"
            required={true}
            rules={{
              maxLength: { message: 'Please enter shorter address', value: 120 },
              minLength: { message: 'Please enter valid address', value: 6 },
              required: { message: 'Address can not be empty', value: true },
              pattern: { message: 'Please enter valid address', value: ADDRESS_REGEX },
            }}
            type="text"
            variant="secondary"
          />
        </div>

        <div className="flex w-full flex-col gap-1">
          <Typography size="caption" variant="condensed">
            Network
          </Typography>
          <div className="flex w-full items-center gap-2 rounded-xl bg-neutral-800 px-4 py-2 dark:bg-neutral-400">
            {isEthereum ? (
              <>
                <CurrencyIcon token="ETH" wallet="METAMASK" />
                <div className="flex items-center gap-1">
                  <Typography className="text-neutral-700" size="body">
                    ETH
                  </Typography>
                  <Typography className="text-neutral-500" size="body">
                    Ethereum
                  </Typography>
                </div>
              </>
            ) : (
              <>
                <CurrencyIcon token="KLAYTN" wallet="KAIKAS" />
                <div className="flex items-center gap-1">
                  <Typography className="text-neutral-700" size="body">
                    KLAY
                  </Typography>
                  <Typography className="text-neutral-500" size="body">
                    Klaytn
                  </Typography>
                </div>
              </>
            )}
          </div>
          <Typography className="text-warning-800" size="small">
            * Make sure you are withdrawing to the right Ethereum address and network.
          </Typography>
        </div>

        <div className="flex w-full flex-col gap-4">
          <Button
            className={classNames('w-full !opacity-100', (isLoading || !isFormValid) && '!bg-opacity-30')}
            color="primary"
            disabled={isLoading || !isFormValid}
            loading={isLoading}
            type="submit"
            variant="solid"
          >
            WITHDRAW
          </Button>
          <Button color="primary" disabled={isLoading} type="button" variant="outlined" onClick={onClose}>
            CANCEL
          </Button>
        </div>
      </form>
    </div>
  )
}

interface WithdrawTokenProps {
  initialCurrency?: AddressString
  balances: currencyOptionProps[]
  onClose: () => void
  onRefetchBalances: () => void
}

const FormLabelProps: TypographyProps = {
  size: 'caption',
}

const ClassNames = {
  dropdown:
    'grid grid-cols-[24px_1fr_24px] text-left bg-white dark:bg-neutral-300 border border-neutral-600 dark:border-neutral-400',
  dropdownBody: 'w-full top-[44px]',
}

interface WithdrawTokenFormState {
  amount: string
  address: string
}
