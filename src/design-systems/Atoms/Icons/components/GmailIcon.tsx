import Image from 'next/image'

import GmailImage from 'assets/gmail.png'

export const GmailIcon: React.FC = () => {
  return <Image alt="gmail" height={26} src={GmailImage} width={26} />
}
