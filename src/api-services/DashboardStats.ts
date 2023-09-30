import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS } from 'utils'

class DashboardStatsService {
  getStats = async () => CoreAPIService.get<DashboardStatsResponse>(API_ENDPOINTS.PRIVATE.GET_USER_DASHBOARD_STATS)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new DashboardStatsService()
