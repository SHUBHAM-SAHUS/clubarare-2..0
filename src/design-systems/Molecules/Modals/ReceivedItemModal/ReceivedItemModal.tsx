import { FC } from 'react'

import { ReceivedFormPops } from './interface'

import { ReceiveMyItemForm } from 'design-systems/Molecules/Forms/ReceiveMyItemForm'

export const ReceivedItemModal: FC<ReceivedFormPops> = ({ asset, onClose, refetchVaultDetails }) => {
  return (
    <div className="md:w-[400px]">
      <div className="px-3">
        <ReceiveMyItemForm asset={asset} refetchVaultDetails={refetchVaultDetails} onClose={onClose} />
      </div>
    </div>
  )
}
