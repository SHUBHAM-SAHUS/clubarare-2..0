export const filterEmptyAttribute = (obj: any) => {
  const filteredObj = Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value !== undefined && value !== '')
  )
  return filteredObj
}
