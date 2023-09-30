import { useState } from 'react'
import { useForm, FieldValues } from 'react-hook-form'

import { ERROR_MESSAGE } from './utils'
import type { DigitalNFTImageFormProps } from './interface'

import { Button } from 'design-systems/Atoms/Button'
import { Typography } from 'design-systems/Atoms/Typography'
import { AddImage } from 'design-systems/Molecules/Buttons/AddImage'
import { FileUploadType } from 'design-systems/Molecules/Buttons/AddImage'

export const DigitalNFTImageForm: React.FC<DigitalNFTImageFormProps> = ({
  attachments = [],
  onBack,
  onNext,
  onAddDigitalImage,
}) => {
  const { handleSubmit } = useForm()
  const [images, setImages] = useState<File[]>(attachments)
  const [nftErrorMessage, setNFTErrorMessage] = useState<string>()

  const handleNext = handleSubmit((_: FieldValues) => {
    if (!images.length) {
      return setNFTErrorMessage(ERROR_MESSAGE)
    }
    onAddDigitalImage?.(images)
    onNext?.({})
  })

  const handleChangeImage = (file: FileUploadType) => {
    setImages(file ? [file?.fileData] : [])
  }

  return (
    <form className="flex h-full w-full flex-col justify-between" onSubmit={handleNext}>
      <div className="">
        <div className="flex flex-col gap-1 px-4 pb-8 md:px-3">
          <Typography size="h4" variant="condensed">
            NFT IMAGE
          </Typography>

          <Typography className="text-neutral-400 dark:text-neutral-700" size="caption" variant="condensed">
            Upload your NFT image, additional images (optional), and images to authenticate your item.
          </Typography>
        </div>
        <div className="flex w-full flex-col flex-wrap px-4 md:px-3">
          <div>
            <Typography size="caption" variant="condensed">
              NFT IMAGE*
            </Typography>
            <Typography size="small" variant="condensed">
              We recommend you use square format at least 1080 x 1080px. Use .mp4 for video and .png or.jpg for images
            </Typography>
          </div>
          <div className="mt-2 flex w-full flex-wrap items-center justify-center py-2">
            <AddImage
              className="!w-full"
              defaultImage={images?.length ? URL.createObjectURL(images?.[0]) : ''}
              error={nftErrorMessage}
              height={120}
              innerWrapperClassName="!w-full"
              width={280}
              onChange={handleChangeImage}
            />
          </div>
        </div>
      </div>
      <div className="!mb-2 mt-2 flex flex-col px-4 md:mt-5 md:flex-row  md:items-center md:justify-between md:px-0">
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
