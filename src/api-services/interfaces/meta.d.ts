interface MetaObject {
  title: string
  description: string
  image: string
}

interface MetaResponse {
  status: boolean
  message: string
  code: number
  data: MetaObject
}
