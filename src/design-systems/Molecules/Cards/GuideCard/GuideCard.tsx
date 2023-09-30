import { openLink } from '../../../../utils/helpers'

import { ArrowRightIcon, BookIcon } from 'design-systems/Atoms/Icons'
import { Card } from 'design-systems/Atoms/Card'
import { Link } from 'design-systems/Atoms/Link'
import { Typography } from 'design-systems/Atoms/Typography'

export interface GuideCardProps {
  title: string
  href: string
}

const guideCardClassNames = [
  'flex cursor-pointer flex-col items-center gap-2xl',
  'border border-neutral-600 hover:border-neutral-500',
  'dark:border-neutral-300 dark:hover:border-neutral-400',
].join(' ')

export const GuideCard: React.FC<GuideCardProps> = ({ title, href }) => {
  return (
    <Card bordered className={guideCardClassNames} variant="2x-large" onClick={() => openLink(href)}>
      <BookIcon className="h-8 w-8 stroke-neutral-100 dark:stroke-neutral-800" />
      <Typography className="md:typography-h4 typography-subtitle font-bold">{title}</Typography>
      <Link href={href} rightIcon={<ArrowRightIcon className="h-6 w-6 stroke-neutral-100 dark:stroke-neutral-800" />}>
        <Typography className="font-medium" size="md" variant="regular">
          VIEW GUIDE
        </Typography>
      </Link>
    </Card>
  )
}
