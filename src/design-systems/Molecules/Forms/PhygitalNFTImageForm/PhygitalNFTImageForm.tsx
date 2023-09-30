import { useCallback, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import { AuthenticateFormError } from '../AuthenticateForm'

import { CATEGORY_ERROR_MESSAGE, NFT_ERROR_MESSAGE, validImageType, validateAuthenticateCategory } from './utils'
import type { AdditionalImages, PhygitalNFTImageFormProps } from './interface'

import { Button } from 'design-systems/Atoms/Button'
import { Typography } from 'design-systems/Atoms/Typography'
import { AddImage } from 'design-systems/Molecules/Buttons/AddImage'
import { FileUploadType } from 'design-systems/Molecules/Buttons/AddImage'
import { CategoryList } from 'design-systems/Organisms/List/CategoryList'
import { compareStringsInsentively } from 'utils'

export const PhygitalNFTImageForm: React.FC<PhygitalNFTImageFormProps> = ({
  attachments = [],
  additionalImages = {},
  categories = [],
  onAddAuthImages,
  category,
  onChangeBrand,
  onSelectCategory,
  onNext,
  onBack,
  onAddPhygitalImage,
  onAddPhygitalAdditionalImages,
}) => {
  const { handleSubmit } = useForm()
  const [images, setImages] = useState<File[]>(attachments)
  const [filteredCategories, setFilteredCategories] = useState(categories)
  const [categoryImageNames, setCategoryImageNames] = useState<CategoryObject>()
  const [optionalImages, setAdditionalImages] = useState<AdditionalImages>(additionalImages)
  const [error, setError] = useState<AuthenticateFormError>({
    categoryError: '',
    nftError: '',
  })
  useEffect(() => {
    setCategoryImageNames(category)
    setFilteredCategories(categories.filter(category => category.name !== 'Books'))
  }, [category, categories])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleNext = handleSubmit((_: FieldValues) => {
    if (!images.length || !categoryImageNames?.name) {
      return setError((pre: AuthenticateFormError) => ({
        ...pre,
        categoryError: !categoryImageNames?.name ? CATEGORY_ERROR_MESSAGE : '',
        nftError: !images.length ? NFT_ERROR_MESSAGE : '',
      }))
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    onSelectCategory?.(categoryImageNames!)
    onAddPhygitalAdditionalImages?.(optionalImages)
    onAddPhygitalImage?.(images)
    onNext?.(validateAuthenticateCategory(categoryImageNames.name) ? { stepId: 6 } : {})
  })

  const handleChangeImage = (file: FileUploadType) => {
    if (!file) {
      setImages([])
      onAddPhygitalImage?.([])
      setError((pre: AuthenticateFormError) => ({
        ...pre,
        nftError: '',
      }))
      return
    }
    setError((pre: AuthenticateFormError) => ({
      ...pre,
      nftError: '',
    }))
    setImages(file ? [file?.fileData] : [])
  }
  const handlerAdditionalImages = (id: string) => (file: FileUploadType) => {
    if (file) {
      setAdditionalImages({ ...optionalImages, [id]: file?.fileData })
    } else {
      const updateAdditionalImages = { ...optionalImages }
      delete updateAdditionalImages[id]
      setAdditionalImages(updateAdditionalImages)
    }
  }

  /**
   * Function to handle changing the selected category.
   * @param {string} categoryName - The name of the selected category.
   */
  const handleChangeCategory = useCallback(
    (categoryName: string) => {
      const selectedCategory = categories?.find(({ name }) => compareStringsInsentively(name, categoryName))
      setError((pre: AuthenticateFormError) => ({
        ...pre,
        categoryError: selectedCategory && '',
      }))
      onAddAuthImages?.({})
      onChangeBrand?.({} as CollectionAssetObject)
      setCategoryImageNames(selectedCategory)
    },
    [categories, onAddAuthImages, onChangeBrand]
  )
  return (
    <form
      className="scrollbar-hide flex h-full w-full flex-col justify-between overflow-y-scroll"
      onSubmit={handleNext}
    >
      <div className="w-full">
        <div className="flex flex-col gap-1 pb-4">
          <Typography className="uppercase" size="h4" variant="condensed">
            Add an image or video
          </Typography>
          <Typography className="text-neutral-400 dark:text-neutral-700" size="caption" variant="condensed">
            Upload the main product image or video, select a category and choose up to 4 additional images
          </Typography>
          <Typography className="text-neutral-400 dark:text-neutral-700" size="small" variant="condensed">
            *File types supported: JPG, PNG, GIF, SVG, MP4. Max size: 35 MB. 1080 x 1080px recommended
          </Typography>
        </div>
        <div className="h-[60vh] overflow-y-auto pr-2 xl:h-auto">
          <div className="mb-2 flex flex-col">
            {/* <div>
              <Typography size="small" variant="condensed">
                We recommend you use square format at least 1080 x 1080px. Use .mp4 for video and .png or.jpg for images
              </Typography>
            </div> */}
            <div className="flex justify-center overflow-hidden pt-3">
              <AddImage
                accept={['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'video/mp4']}
                className="!w-full"
                defaultImage={images?.length ? URL.createObjectURL(images?.[0]) : ''}
                error={error.nftError}
                height={120}
                innerWrapperClassName="!w-full"
                type={images[0]?.type.toString()}
                width={300}
                onChange={handleChangeImage}
              />
            </div>
            <div className="pt-3">
              <Typography
                className="mb-2 font-normal text-neutral-100 dark:text-neutral-600"
                size="caption"
                variant="condensed"
              >
                Select Category*
              </Typography>
              <CategoryList
                categories={filteredCategories}
                className="text-md uppercase text-neutral-100"
                initialSelectedCategory={categoryImageNames && categoryImageNames?.name?.toLowerCase()}
                onClick={handleChangeCategory}
              />
              <span className="mb-1 text-[12px] text-error-800">{error?.categoryError}</span>
            </div>
          </div>
          <div className="mb-2">
            <div className="flex flex-col gap-1">
              <Typography size="caption">ADDITIONAL IMAGES (Optional)</Typography>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 ">
              <AddImage
                accept={validImageType}
                className="!w-full"
                defaultImage={optionalImages['1'] ? URL.createObjectURL(optionalImages['1']) : ''}
                height={110}
                innerWrapperClassName="!w-full"
                type={optionalImages['1']?.type.toString()}
                width={90}
                onChange={handlerAdditionalImages('1')}
              />
              <AddImage
                accept={validImageType}
                className="!w-full"
                defaultImage={optionalImages['2'] ? URL.createObjectURL(optionalImages['2']) : ''}
                height={110}
                innerWrapperClassName="!w-full"
                type={optionalImages['2']?.type.toString()}
                width={90}
                onChange={handlerAdditionalImages('2')}
              />
              <AddImage
                accept={validImageType}
                className="!w-full"
                defaultImage={optionalImages['3'] ? URL.createObjectURL(optionalImages['3']) : ''}
                height={110}
                innerWrapperClassName="!w-full"
                type={optionalImages['3']?.type.toString()}
                width={90}
                onChange={handlerAdditionalImages('3')}
              />
              <AddImage
                accept={validImageType}
                className="!w-full"
                defaultImage={optionalImages['4'] ? URL.createObjectURL(optionalImages['4']) : ''}
                height={110}
                innerWrapperClassName="!w-full"
                type={optionalImages['4']?.type.toString()}
                width={90}
                onChange={handlerAdditionalImages('4')}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="!mb-2 mt-2 flex flex-col px-4 md:flex-row  md:items-center md:justify-between md:px-0">
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
