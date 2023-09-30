import { FieldValues } from 'react-hook-form'

import { API_ENDPOINTS, getQueries } from '../utils'

import CoreAPIService from './CoreAPIService'

import { PutOnSaleRequest } from 'design-systems/Molecules/Modals/PutOnSaleModal'

class MarketplaceService {
  listAsset = async (payload: PutOnSaleRequest) =>
    CoreAPIService.post<ApiResponse>(API_ENDPOINTS.PRIVATE.PUT_ON_SALE, payload)

  saveEventByTransaction = async (payload: SaveEventByTransactionRequest) =>
    CoreAPIService.post<ApiResponse>(API_ENDPOINTS.PRIVATE.SAVE_EVENT_BY_TRANSACTION, payload)

  createEscrowOrder = async (payload: CreateEscrowOrderRequest) =>
    CoreAPIService.post<ApiResponse>(API_ENDPOINTS.PRIVATE.CREATE_ESCROW_ORDER, payload)

  escrowBidDetail = async (payload: EscrowBidDetailRequest) =>
    CoreAPIService.post<ApiResponse>(API_ENDPOINTS.PRIVATE.ESCROW_BID_DETAIL, payload)

  claimWithEscrow = async (payload: EscrowWithClaimRequest) =>
    CoreAPIService.post<ApiResponse>(API_ENDPOINTS.PRIVATE.CLAIM_WITH_ESCROW, payload)

  receivedItem = async (payload: EscrowReceivedItemRequest | FieldValues) =>
    CoreAPIService.post<ApiResponse>(API_ENDPOINTS.PRIVATE.RECEIVED_ITEM, payload)

  checkVaultItemStatus = async (query: CollectibleIdQuery) =>
    CoreAPIService.get<VaultItemStatusResponse>(`${API_ENDPOINTS.PRIVATE.GET_VAULT_ITEM_STATUS}?${getQueries(query)}`)
}

export default new MarketplaceService()
