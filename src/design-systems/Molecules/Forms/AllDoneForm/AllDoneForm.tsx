import { AllDoneFormProps } from './interface'
import { description } from './utils'

import { Typography } from 'design-systems/Atoms/Typography'
import { Button } from 'design-systems/Atoms/Button'

export const AllDoneForm: React.FC<AllDoneFormProps> = ({ isLuxuryAuthReq, onProductPage, onCreateNew }) => {
  return (
    <div className="flex h-screen flex-col justify-between rounded-none pb-lg md:h-auto md:!rounded-md">
      <div className="flex flex-col">
        <Typography size="h4">ALL DONE!</Typography>
        <Typography className="py-4xl leading-sm" size="body">
          {description[+isLuxuryAuthReq]}
        </Typography>
      </div>
      <div className="flex flex-col items-center justify-end gap-2.5 md:flex-row md:gap-4">
        <Button className="w-full md:w-auto" color="primary" size="medium" variant="outlined" onClick={onProductPage}>
          Product Page
        </Button>
        <Button className="w-full md:w-auto" color="primary" type="submit" variant="solid" onClick={onCreateNew}>
          CREATE
        </Button>
      </div>
    </div>
  )
}
