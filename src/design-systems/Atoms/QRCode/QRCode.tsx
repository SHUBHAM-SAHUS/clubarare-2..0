import { QRCode } from 'react-qrcode-logo'
const ClubrareLogo = 'https://classic.clubrare.xyz/static/media/CR_logo_footer.62c6e922.svg'

export interface QRCodeProps {
  className?: string
  size?: number
  value: string
}

export const QRCodeComponent: React.FC<QRCodeProps> = ({ className = '', size = 100, value }) => {
  return (
    <div className={`${className} `}>
      <QRCode logoHeight={30} logoImage={ClubrareLogo} logoWidth={30} quietZone={5} size={size} value={value} />
    </div>
  )
}
