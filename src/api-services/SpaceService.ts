import { FieldValues } from 'react-hook-form'

import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS, PAGE_SIZE } from 'utils'

/**
 * A class that provides methods to interact with the backend for space related services.
 */
class SpaceService {
  /**
   * A method to get the available background colors for a space.
   * @returns A promise that resolves to the available background colors.
   */
  getBackgroundColors = async () =>
    CoreAPIService.get<SpaceColorResponse>(`${API_ENDPOINTS.PUBLIC.GET_SPACE_BACKGROUND_COLORS}`)

  /**
   * A method to get the available background templates for a space.
   * @returns A promise that resolves to the available background templates.
   */
  getBackgroundTemplates = async () =>
    CoreAPIService.get<SpaceImageResponse>(`${API_ENDPOINTS.PUBLIC.GET_SPACE_BACKGROUND_TEMPLATES}`)

  /**
   * A method to get the available element objects for a space.
   * @returns A promise that resolves to the available element objects.
   */
  getElementObjects = async () =>
    CoreAPIService.get<SpaceImageResponse>(`${API_ENDPOINTS.PUBLIC.GET_SPACE_ELEMENT_OBJECTS}`)

  /**
   * A method to get the available element lightings for a space.
   * @returns A promise that resolves to the available element lightings.
   */
  getElementLightings = async () =>
    CoreAPIService.get<SpaceImageResponse>(`${API_ENDPOINTS.PUBLIC.GET_SPACE_ELEMENT_LIGHTINGS}`)

  /**
   * A method to get the available borders for a space.
   * @returns A promise that resolves to the available borders.
   */
  getBorders = async () => CoreAPIService.get<SpaceImageResponse>(`${API_ENDPOINTS.PUBLIC.GET_SPACE_BORDERS}`)

  /**
   * A method to get the NFTs for a space.
   * @returns A promise that resolves to the available NFTs.
   */
  getPhygitalNFTs = async () => CoreAPIService.get<SpaceImageResponse>(`${API_ENDPOINTS.PRIVATE.GET_SPACE_NFTS}`)

  /**
   * A method to get the Digital NFTs for a space.
   * @returns A promise that resolves to the available NFTs.
   */
  getDigitalNFTs = async () =>
    CoreAPIService.get<SpaceImageResponse>(`${API_ENDPOINTS.PRIVATE.GET_DIGITAL_NFTS}?page_size=100`)

  /**
   * A method to get the space details for the given query.
   * @param payload An object containing the query parameters.
   * @returns A promise that resolves to the space details.
   */
  getSpace = async (payload: GetSpaceQuery) =>
    CoreAPIService.get<GetSpaceServicesResponse>(API_ENDPOINTS.PRIVATE.GET_SPACE, payload)

  /**
   * A method to export the space as an image.
   * @param payload A FormData or FieldValues object containing the export configuration.
   * @returns A promise that resolves to the exported space image.
   */
  exportSpace = async (payload: FormData | FieldValues) =>
    CoreAPIService.post(API_ENDPOINTS.PRIVATE.EXPORT_SPACE, payload)

  removeBgImage = async (image: ImageObject) =>
    CoreAPIService.post<UploadImageResponse>(API_ENDPOINTS.PRIVATE.SPACE_REMOVE_BACKGROUND, {
      url: image?.imageUrl,
    })

  getBestSpaces = async (query: WithPaginationRequest) =>
    CoreAPIService.get<GetBestSpacesResponse>(API_ENDPOINTS.PUBLIC.GET_BEST_SPACES, query)

  getLatestSpaces = async () => CoreAPIService.get<GetLatestSpacesResponse>(API_ENDPOINTS.PUBLIC.GET_LATEST_SPACES)

  removeBgWithUpload = async (uploadImageRequest: FormData | FieldValues) =>
    CoreAPIService.post<UploadImageResponse>(API_ENDPOINTS.PRIVATE.SPACE_REMOVE_BG_UPLOAD_IMAGE, uploadImageRequest)

  generateAIImages = async (prompt: string, label: string, tab: string, uploadImage?: FormData | FieldValues) => {
    return CoreAPIService.post<APIBaseResponse>(API_ENDPOINTS.PRIVATE.GENERATE_AI_IMAGES, {
      prompt,
      image: uploadImage,
      label,
      tab,
    })
  }
  generateAIImagesWithImage = async (payload: FormData | FieldValues) => {
    return CoreAPIService.post<APIBaseResponse>(API_ENDPOINTS.PRIVATE.GENERATE_AI_IMAGES, payload)
  }
  getAIImages = async () =>
    CoreAPIService.get<AIImageResponse>(API_ENDPOINTS.PRIVATE.GET_AI_IMAGES, {
      label: localStorage.getItem('aiLabel'),
      tab: localStorage.getItem('aiTab'),
    })
  getGeneratedAIImages = async (tab: string, label: string) => {
    return CoreAPIService.get<GeneratedAIImageResponse>(API_ENDPOINTS.PRIVATE.GET_GENERATED_AI_IMAGES, {
      label: label,
      tab: tab,
    })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new SpaceService()
