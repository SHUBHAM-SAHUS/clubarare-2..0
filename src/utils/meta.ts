import { META_ENTITIES } from './constants'

import { MetaService } from 'api-services'

const META_FUNCTIONS = {
  [META_ENTITIES.PRODUCT]: MetaService.getProductMeta,
  [META_ENTITIES.PROFILE]: MetaService.getProfileMeta,
}

export const getMetadata = async (entity: META_ENTITIES, entityId: string): Promise<MetaObject> => {
  const response = await META_FUNCTIONS[entity](entityId)
  return response.data
}
