import { useMutation } from 'wagmi'

import { RateService } from 'api-services'

/**
 * The rates hook for rates api integration
 */
export const useRates = () => {
  /**
   * Get usd rates.
   */
  const { mutate: getUSDRates, mutateAsync: getUSDRatesAsync } = useMutation(() => RateService.getUSDRates(), {
    // 1 minute
    cacheTime: 1000 * 60,
  })

  return {
    getUSDRates,
    getUSDRatesAsync,
  }
}
