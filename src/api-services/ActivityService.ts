import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS, getQueries } from 'utils'

class ActivityService {
  getActivity = async (filters: GetSingleActivityQuery) =>
    CoreAPIService.get<SingleActivityResponse>(`${API_ENDPOINTS.PUBLIC.GET_SINGLE_HISTORY_NFT}?${getQueries(filters)}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ActivityService()
