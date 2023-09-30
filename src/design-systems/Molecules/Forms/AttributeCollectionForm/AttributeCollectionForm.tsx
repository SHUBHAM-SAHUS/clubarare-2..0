import { FieldValues, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import PlusIcon from '@heroicons/react/24/outline/PlusIcon'

import { FormInput as Input } from '../Form'

import { AttributeCollectionFormProps } from './interface'
import { filterEmptyAttribute } from './utils'

import { Button } from 'design-systems/Atoms/Button'
import { Typography } from 'design-systems/Atoms/Typography'
import { Select } from 'design-systems/Molecules/Select'
import { useToggle } from 'hooks/useToggle'

export const AttributeCollectionForm: React.FC<AttributeCollectionFormProps> = ({
  attributes = {},
  collections,
  collection,
  onNext,
  onBack,
  onCreateCollection,
  onSelectCollection,
}) => {
  const [extendAttributes, setExtendAttributes] = useState(Math.max(Object.keys(attributes).length, 6))
  const [collectionError, setCollectionError] = useState('')
  const [canAddAttribute, , , onAddAttribute, offAddAttribute] = useToggle(false)
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues: attributes,
    mode: 'onChange',
  })

  const watcherValues = watch()

  const [defaultCollection, setDefaultCollection] = useState<CollectionAssetObject>(
    collection ?? (collections?.[0] as CollectionAssetObject)
  )

  const onSubmit = handleSubmit((fieldValues: FieldValues) => {
    const filteredAttributes = filterEmptyAttribute(fieldValues)
    onSelectCollection?.(defaultCollection)
    onNext?.({ attributes: filteredAttributes })
  })

  const handleCollection = (collection: CollectionAssetObject) => {
    setCollectionError('')
    setDefaultCollection(collection)
  }

  useEffect(() => {
    const isEmpty = Object.values(watcherValues).some(value => !value)
    isEmpty ? onAddAttribute() : offAddAttribute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watcherValues])

  return (
    <form className="flex h-full w-full flex-col justify-between" onSubmit={onSubmit}>
      <div>
        <div className="flex flex-col gap-1 pb-8">
          <Typography className="uppercase" size="h4" variant="condensed">
            Collection & Attributes
          </Typography>
          <Typography className="text-neutral-400 dark:text-neutral-700" size="caption" variant="condensed">
            Choose or create your Collection and add up to 6 attributes (traits that make your item unique).
          </Typography>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <Typography size="caption" variant="condensed">
              Collection
            </Typography>
            <Typography className="text-neutral-400" size="small" variant="condensed">
              Create your own Collection, use an existing Collection, or use our Default Collection, where your item
              will appear.
            </Typography>
            <div className="mt-2 flex flex-row items-center gap-4">
              <Select
                className="z-10 w-full"
                options={collections}
                setSelectedCollectionAsset={handleCollection}
                value={defaultCollection}
              />
              <Button className="h-8" color="primary" size="medium" variant="outlined" onClick={onCreateCollection}>
                Create
              </Button>
            </div>

            {collectionError && <span className="text-xs text-error-800">{collectionError}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center justify-between pb-2">
              <Typography size="caption" variant="condensed">
                Attributes (optional)
              </Typography>
              <Button
                className="!py-[2px]"
                color="primary"
                disabled={
                  canAddAttribute || extendAttributes >= 12 || extendAttributes > Object.values(watcherValues).length
                }
                size="small"
                variant="outlined"
                onClick={() => {
                  extendAttributes <= 10 && setExtendAttributes(prev => prev + 2)
                  offAddAttribute()
                }}
              >
                <PlusIcon className="h-6 w-6 cursor-pointer" />
              </Button>
            </div>
            <div
              className={`grid grid-cols-2 gap-2 ${extendAttributes > 8 ? ' h-[30vh] overflow-y-auto xxl:h-auto' : ''}`}
            >
              {Array.from(new Array(extendAttributes)).map((_, i) => (
                <Input
                  control={control}
                  defaultValue={attributes?.[`attribute${i}`]}
                  error={
                    watcherValues?.[`attribute${i % 2 === 0 ? i + 1 : i - 1}`]
                      ? errors[`attribute${i}`]?.message?.toString()
                      : ''
                  }
                  key={i}
                  name={`attribute${i}`}
                  placeholder={`e.g ${i % 2 === 0 ? 'Size' : 'Large'}`}
                  rules={{
                    required: {
                      value: !!watcherValues?.[`attribute${i % 2 === 0 ? i + 1 : i - 1}`],
                      message: `${i % 2 === 0 ? 'Key' : 'Value'} can not be empty`,
                    },
                  }}
                  type="text"
                  variant="fill"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="!mb-2 flex flex-col px-4 pt-5  md:flex-row md:items-center md:justify-between md:px-0">
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
