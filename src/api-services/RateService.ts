import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS } from 'utils'

class RateService {
  getUSDRates = async () => CoreAPIService.get<USDRateResponse>(API_ENDPOINTS.PUBLIC.USD_RATES)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new RateService()
