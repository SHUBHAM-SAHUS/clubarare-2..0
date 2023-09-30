import { useForm } from 'react-hook-form'

import { COLLECTION_TYPE } from './utils'
import type { CollectionTypeFormProps } from './interface'

import { Button } from 'design-systems/Atoms/Button'
import { Typography } from 'design-systems/Atoms/Typography'
import { classNames } from 'utils'

export const CollectionTypeForm: React.FC<CollectionTypeFormProps> = ({
  collectionType,
  onBack,
  onNext,
  // onSelectCollectionType
}) => {
  const { handleSubmit } = useForm()
  const onSubmit = handleSubmit(() => {
    onNext?.({})
  })

  return (
    <form className="flex h-full w-full flex-col items-center justify-between" onSubmit={onSubmit}>
      <div className="px-1 md:px-2">
        <div className="flex flex-col gap-1 pb-8">
          <Typography size="h4" variant="condensed">
            SELECT COLLECTION TYPE
          </Typography>
          <Typography className="text-neutral-400 dark:text-neutral-700" size="caption" variant="condensed">
            You can choose to create an on-chain or off-chain collection
          </Typography>
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          {COLLECTION_TYPE?.map(({ name, type, description }) => (
            <div
              key={name}
              className={classNames(
                'flex cursor-pointer flex-col gap-4 rounded-sm border-2 border-neutral-700 p-4 hover:border-neutral-600',
                collectionType === type ? '!border-neutral-500' : 'blur-[1px]'
              )}
              // NOTE: temporarily disable on-chain collection creation
              // onClick={() => onSelectCollectionType?.(type)}
            >
              <Typography className="select-none" size="lg" variant="condensed">
                {name}
              </Typography>
              <Typography className="select-none !tracking-paragraph" size="body" variant="condensed">
                {description}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      <div className="!mb-2 flex w-full flex-col px-4 pt-7 md:flex-row  md:items-center md:justify-between md:px-0">
        <Button className="hidden md:flex" color="primary" size="medium" variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button
          className="w-full !px-10 uppercase md:w-auto"
          color="primary"
          size="medium"
          type="submit"
          variant="solid"
        >
          NEXT
        </Button>
      </div>
    </form>
  )
}
