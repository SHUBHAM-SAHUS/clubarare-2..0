interface Web3Transaction {
  blockHash: string
  blockNumber: number
  contractAddress: string | null
  effectiveGasPrice: string
  from: string
  gas: string
  gasPrice: string
  gasUsed: number
  input: string
  logsBloom: string
  nonce: string
  senderTxHash: string
  status: true
  to: string
  transactionHash: string
  transactionIndex: number
  type: string
  typeInt: number
  value: string
}
