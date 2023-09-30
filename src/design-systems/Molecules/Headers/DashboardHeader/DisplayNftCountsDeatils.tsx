import { Typography } from 'design-systems/Atoms/Typography'

interface DisplayNftCountsDetailsProps {
  label: string
  value: number
  dollarSign?: boolean
}

export const nftCardClassName = [
  'flex flex-col items-center break-all justify-center p-2 sm:px-3 rounded-[10px] min-h-[77px] bg-neutral-700 shadow-md dark:bg-neutral-300',
].join(' ')

export const DisplayNftCountsDeatils: React.FC<DisplayNftCountsDetailsProps> = ({
  label,
  value,
  dollarSign = false,
}) => {
  return (
    <div className={nftCardClassName}>
      <Typography
        className="text-center text-subtitle font-bold text-neutral-100 dark:text-neutral-700"
        variant="condensed"
      >
        {dollarSign && <span>$</span>}
        {value}
      </Typography>
      <Typography className="text-xs font-normal text-neutral-400 dark:text-neutral-500" variant="condensed">
        {label}
      </Typography>
    </div>
  )
}
