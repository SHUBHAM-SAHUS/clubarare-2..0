export const fetchSceneData = async (url: string) => {
  try {
    const requestOptions: any = {
      method: 'GET',
      redirect: 'follow',
    }
    const response = await fetch(url, requestOptions)
    const result = await response.json()

    return result
  } catch (error) {
    console.error('Error:', error)
  }
}
