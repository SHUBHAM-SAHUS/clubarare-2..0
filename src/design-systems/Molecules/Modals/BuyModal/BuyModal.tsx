import { FC } from 'react'

import { BuyModalProps } from './interface'

import { BuyForm } from 'design-systems/Molecules/Forms/BuyForm'

export const BuyModal: FC<BuyModalProps> = ({ asset, onClose }) => {
  return (
    <div className="md:w-[400px]">
      <div className="px-3">
        <BuyForm asset={asset} onClose={onClose} />
      </div>
    </div>
  )
}
