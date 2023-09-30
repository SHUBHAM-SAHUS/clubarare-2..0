import { FC } from 'react'

import { BidModalProps } from './interface'

import { BidForm } from 'design-systems/Molecules/Forms/BidForm'

export const BidModal: FC<BidModalProps> = ({ asset, onClose }) => {
  return (
    <div className="md:w-[400px]">
      <div className="px-2">
        <BidForm asset={asset} onClose={onClose} />
      </div>
    </div>
  )
}
