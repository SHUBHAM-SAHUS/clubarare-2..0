/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'

import { FilterProps } from './interface'
import { NETWORK_BUTTONS, SALE_TYPE_BUTTONS } from './utils'

import { Button } from 'design-systems/Atoms/Button'
import { Input } from 'design-systems/Atoms/Input'
import { Typography } from 'design-systems/Atoms/Typography'
import { Toggle } from 'design-systems/Atoms/Toggle'
import { Dropdown, DropdownOption } from 'design-systems/Molecules/Dropdown'
import { ButtonGroup } from 'design-systems/Molecules/ButtonGroups/ButtonGroup'
import { CLUBRARE_NETWORKS, TOKEN_BY_OPTIONS, classNames } from 'utils'
import { useShallowState } from 'hooks/useShallowState'

export const Filter: React.FC<FilterProps> = ({ className = '', initialFilters, onChangeFilter, onFilterCancel }) => {
  const [filters, setFilters] = useShallowState(initialFilters)
  const [priceOptions, setPriceOptions] = useState<DropdownOption[]>(TOKEN_BY_OPTIONS)
  const [saleOnly, setSaleOnly] = useState<boolean>(false)

  const handleChangeFilter = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ [event.target.name]: event.target.value })
  }, [])

  const handleClear = useCallback(() => {
    const newFilters: AssetFilters = {
      ...filters,
      fromPrice: '',
      networkId: CLUBRARE_NETWORKS.ALL,
      toPrice: '',
      token: 'ETH',
    }
    setFilters(newFilters)
    onChangeFilter([
      {
        key: 'token',
        value: 'ETH',
      },
      {
        key: 'fromPrice',
        value: '',
      },
      {
        key: 'toPrice',
        value: '',
      },
      {
        key: 'networkId',
        value: CLUBRARE_NETWORKS.ALL,
      },
    ])
  }, [filters])

  /**
   * Price `Token` onChange handler
   */
  const handleChangeToken = useCallback(
    (tokenOption: DropdownOption) => {
      setFilters({ token: tokenOption.value })
      onChangeFilter([{ key: 'token', value: tokenOption.value }])
    },
    [onChangeFilter]
  )

  /**
   * `Network` onChange event handler
   */
  const handleChangeNetwork = useCallback(
    (networkId: ClubRareNetworks) => {
      const token = String(networkId) === '2' ? 'KLAY' : 'ETH'
      const newFilters = {
        ...filters,
        fromPrice: '',
        networkId,
        toPrice: '',
        token: token,
      }
      setFilters(newFilters)
      setTokenOptions(networkId)
      onChangeFilter([
        {
          key: 'networkId',
          value: String(networkId),
        },
        {
          key: 'token',
          value: token,
        },
        {
          key: 'fromPrice',
          value: '',
        },
        {
          key: 'toPrice',
          value: '',
        },
      ])
    },
    [onChangeFilter, filters]
  )

  /**
   * `Sale Type` onChange event handler
   */
  const handleChangeSaleType = useCallback(
    (saleType: SaleType) => {
      setFilters({ saleType })
      onChangeFilter([{ key: 'saleType', value: String(saleType) }])
    },
    [onChangeFilter]
  )

  /**
   * `fromPrice` or `toPrice` Input elements' onBlur event handler
   */
  const handleUpdateFilter = useCallback(() => {
    onChangeFilter([
      {
        key: 'fromPrice',
        value: String(filters.fromPrice),
      },
      {
        key: 'toPrice',
        value: String(filters.toPrice),
      },
    ])
  }, [filters.fromPrice, filters.toPrice])

  /**
   * For SALE ONLY in all Sale Type
   */
  const handleChangeSaleOnly = useCallback(() => {
    setFilters({ saleOnly: !saleOnly })
    onChangeFilter([{ key: 'saleOnly', value: !saleOnly }])
    setSaleOnly(!saleOnly)
  }, [saleOnly, onChangeFilter])

  /**
   * FOR PRICE dropdown options
   */
  const setTokenOptions = useCallback(
    (networkId: ClubRareNetworks = CLUBRARE_NETWORKS.ALL) => {
      if (String(networkId) === '1') {
        const metamaskOptions = TOKEN_BY_OPTIONS.filter((opt: DropdownOption) => opt.value !== 'KLAY')
        setPriceOptions(metamaskOptions)
      } else if (String(networkId) === '2') {
        const klaytnOptions = TOKEN_BY_OPTIONS.filter(
          (opt: DropdownOption) => opt.value === 'AGOV' || opt.value === 'KLAY' || opt.value === 'USDT'
        )
        setPriceOptions(klaytnOptions)
      } else {
        setPriceOptions(TOKEN_BY_OPTIONS)
      }
    },
    [filters.networkId, priceOptions]
  )

  return (
    <div
      className={classNames(
        'filterOverlayOverFlowHidden md:filterOverlayOverFlowAuto fixed top-0 z-[2300] h-screen w-full bg-neutral-700 py-2 pl-5 pr-5 dark:bg-neutral-200 md:static md:top-auto md:z-auto md:h-auto md:w-96 md:bg-auto md:pl-2 md:pr-1',
        className
      )}
    >
      <div className="flex items-center justify-between py-2 md:hidden">
        <Typography className="text-subtitle font-bold text-neutral-100 dark:text-neutral-600">Filter</Typography>
        <XMarkIcon
          aria-hidden="true"
          className="h-10 w-10 cursor-pointer pr-2"
          onClick={() => {
            onFilterCancel()
          }}
        />
      </div>
      <div className="mt-5 border-b border-neutral-800  pb-3 dark:border-neutral-400">
        <Typography
          className="mb-2 font-RobotoCondensed text-body font-normal uppercase text-neutral-400 dark:text-neutral-500"
          variant="regular"
        >
          Network{' '}
        </Typography>
        <ButtonGroup
          buttons={NETWORK_BUTTONS}
          className="dark:!bg-neutral-400"
          clickHandler={handleChangeNetwork}
          value={filters.networkId}
          variant="primary"
        />
      </div>
      <div className="mt-3 border-b border-neutral-800 pb-3 pr-4 dark:border-neutral-400">
        <Typography
          className="mb-2 font-RobotoCondensed text-body font-normal uppercase text-neutral-400 dark:text-neutral-500"
          variant="regular"
        >
          Price{' '}
        </Typography>
        <div className="flex items-center">
          <Dropdown
            className="pl-1"
            direction="right"
            options={priceOptions}
            value={filters.token}
            onChange={handleChangeToken}
          />
          <Input
            className="mr-1.5"
            name="fromPrice"
            placeholder="Min"
            type="number"
            value={filters.fromPrice}
            variant="secondary"
            onBlur={handleUpdateFilter}
            onChange={handleChangeFilter}
          />
          <Input
            name="toPrice"
            placeholder="Max"
            type="number"
            value={filters.toPrice}
            variant="secondary"
            onBlur={handleUpdateFilter}
            onChange={handleChangeFilter}
          />
        </div>
        <div className="mt-2 flex justify-end">
          <Button className="uppercase" color="primary" size="small" variant="outlined" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>
      {/* <div className="mt-4 flex items-center justify-end">
        <Button color="primary" size="small" variant="solid" className="uppercase" onClick={() => onFilterCancel()}>
          Search
        </Button>
        <Button color="primary" size="small" variant="outlined" className="uppercase" onClick={handleClear}>
          Clear
        </Button>
      </div> */}
      <div className="mb-2 mt-3 dark:border-neutral-400">
        <Typography
          className="mb-2 font-RobotoCondensed text-body font-normal uppercase text-neutral-400 dark:text-neutral-500"
          variant="regular"
        >
          Sale type
        </Typography>
        <ButtonGroup
          buttons={SALE_TYPE_BUTTONS}
          className="dark:!bg-neutral-400"
          clickHandler={handleChangeSaleType}
          variant="primary"
        />
      </div>
      {filters?.saleType === 'all' && (
        <div className=" flex justify-end pr-4">
          <Toggle
            defaultCheck={saleOnly}
            label="ON SALE ONLY"
            // defaultCheck={filters.onlySale}
            onChange={handleChangeSaleOnly}
          />
        </div>
      )}
    </div>
  )
}
