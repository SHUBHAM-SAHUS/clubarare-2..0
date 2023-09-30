interface USDRateObject {
  agovCirculatingSupply: number
  agovEthRate: number
  agovRate: number
  circulatingSupply: number
  ethAgovStaked: number
  ethRate: number
  ethUsdtRate: number
  id: string
  klayRate: number
  klaytnUsdtRate: number
  mpwrRate: number
  mpwrStaked: number
  updatedTime: string
}

interface USDRateResponse {
  code: number
  data: USDRateObject
  message: string
  status: boolean
}
