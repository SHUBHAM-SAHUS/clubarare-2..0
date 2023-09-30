import { useCallback, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import { images as initialImage, inputs } from './utils'
import { CreateCollectionFormProps } from './interface'

import { Button } from 'design-systems/Atoms/Button'
import { AddImage } from 'design-systems/Molecules/Buttons/AddImage'
import { Spinner } from 'design-systems/Atoms/Spinner'
import { Typography } from 'design-systems/Atoms/Typography'
import { useToast } from 'hooks/useToast'
import { useToggle } from 'hooks/useToggle'

export const CreateCollectionForm: React.FC<CreateCollectionFormProps> = ({
  onCreateNewCollection,
  onBack,
  onNext,
}) => {
  const { successToast, warningToast } = useToast()
  const defaultValues: Record<string, string> = {}
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues })
  const [img, setImg] = useState<FieldValues>([])
  const [isCreating, , , turnOn, turnOff] = useToggle(false)
  const [collectionErrorMessage, setCollectionErrorMessage] = useState<string>()
  const [images, setImageError] = useState(initialImage)

  const handleNext = handleSubmit(async (values: FieldValues) => {
    const { profileImage, bannerImage } = img
    if (!profileImage || !bannerImage) {
      setCollectionErrorMessage('Please upload image')
      return
    }
    turnOn()
    const res = await onCreateNewCollection?.({
      ...values,
      bannerImage: bannerImage.fileData,
      imageId: profileImage.fileData,
    })

    turnOff()
    if (res) {
      successToast('Collection created successfully')
      onNext?.({})
    } else {
      warningToast('Collection creation failed')
    }
  })

  const setImageErrorFor = useCallback(
    (imageName: string, errorMessage: string) => {
      setImageError(prev =>
        prev.map(value => {
          if (value.name === imageName) {
            return {
              ...value,
              error: errorMessage,
            }
          } else {
            return value
          }
        })
      )
    },
    [setImageError]
  )

  const handleImage = useCallback(
    (file: File | any, name: string) => {
      const { fileData } = file || {}
      const { profileImage, bannerImage } = img
      const nameString = fileData?.name?.toString()
      const updateAdditionalImages = { ...img }
      if (fileData) {
        setCollectionErrorMessage('')
        if (
          (name === 'profileImage' && nameString === bannerImage?.fileData?.name?.toString()) ||
          (name === 'bannerImage' && nameString === profileImage?.fileData?.name?.toString())
        ) {
          setImageErrorFor(name, `You've already selected this image`)
          return
        }
        setImg(pre => ({ ...pre, [name]: file }))
        setImageError(initialImage)
      } else {
        delete updateAdditionalImages[name]
        setImg(updateAdditionalImages)
      }
    },
    [img, setImageErrorFor]
  )

  return (
    <form className="flex h-full w-full flex-col items-center justify-between" onSubmit={handleNext}>
      <div className="w-full px-0 md:pl-2">
        <div className="flex flex-col pb-4">
          <Typography size="h4" variant="condensed">
            CREATE COLLECTION
          </Typography>
        </div>
        <div className="flex h-[65vh] flex-col gap-6 overflow-x-hidden overflow-y-scroll xxl:h-[75vh]">
          {images?.map(({ name, title, description, error }) => (
            <div className="flex flex-col" key={name}>
              <Typography size="caption" variant="condensed">
                {title}
              </Typography>
              <Typography className="mb-2 text-neutral-400 dark:text-neutral-600" size="caption" variant="condensed">
                {description}
              </Typography>
              <AddImage
                accept={['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml']}
                error={collectionErrorMessage || error}
                width={120}
                onChange={(file: File) => handleImage(file, name)}
              />
            </div>
          ))}
          {inputs.map(({ InputField, name, rules, ...rest }) => (
            <InputField
              error={errors[name]?.message?.toString()}
              innerClassName="!bg-transparent"
              key={name}
              name={name}
              rules={rules}
              {...rest}
              control={control}
            />
          ))}
        </div>
      </div>
      <div className="!mb-2 flex w-full flex-col px-4 pt-5 md:flex-row  md:items-center md:justify-between md:px-0">
        <Button className="hidden md:flex" color="primary" size="medium" variant="outlined" onClick={onBack}>
          Back
        </Button>
        {isCreating ? (
          <Spinner className="bg-slate-300 z-10  m-auto mr-0 h-11 w-11 rounded-full stroke-neutral-500 text-neutral-500 dark:stroke-neutral-500 " />
        ) : (
          <Button
            className="w-full !px-10 uppercase md:w-auto"
            color="primary"
            size="medium"
            type="submit"
            variant="solid"
          >
            NEXT
          </Button>
        )}
      </div>
    </form>
  )
}
