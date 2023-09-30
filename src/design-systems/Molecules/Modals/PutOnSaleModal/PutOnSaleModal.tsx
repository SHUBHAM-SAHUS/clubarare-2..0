import { PutOnSaleModalProps } from './interface'

import { PricingForm } from 'design-systems/Molecules/Forms/PricingForm'

export const PutOnSaleModal: React.FC<PutOnSaleModalProps> = ({ asset, onClose }) => {
  return (
    <div className="z-[3000] h-full sm:w-[375px] md:w-[500px]">
      <PricingForm asset={asset} className="" onClose={onClose} />
    </div>
  )
}
