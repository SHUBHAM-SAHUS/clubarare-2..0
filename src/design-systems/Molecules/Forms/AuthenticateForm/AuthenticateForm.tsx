import { useCallback, useState, useMemo } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'

import { FormInput as Input } from '../Form'

import { filteredImageRules, renameKeyOfBrand, validateImageRequired } from './utils'
import type { AuthenticateFormProps, DefaultImages } from './interface'

import { Alert } from 'design-systems/Molecules/Alert'
import { Button } from 'design-systems/Atoms/Button'
import { Typography } from 'design-systems/Atoms/Typography'
import { Toggle } from 'design-systems/Atoms/Toggle'
import { AddImage } from 'design-systems/Molecules/Buttons/AddImage'
import { Select } from 'design-systems/Molecules/Select'
import { FileUploadType } from 'design-systems/Molecules/Buttons/AddImage'
import { RightAnnouncementIcon } from 'design-systems/Atoms/Icons'
import { LeftAnnouncementIcon } from 'design-systems/Atoms/Icons'
import { useToggle } from 'hooks/useToggle'
import { CLUBRARE_SOCIAL_LINKS, compareStringsInsentively } from 'utils'

export const AuthenticateForm: React.FC<AuthenticateFormProps> = ({
  authFiles = {},
  brand,
  category,
  credit,
  isLuxuryAuthReq = false,
  isWhiteListedSeller,
  onAddAuthImages,
  onBack,
  onChangeBrand,
  onChangeIsLuxuryAuthReq,
  onNext,
}) => {
  const { handleSubmit, control } = useForm()
  const [authImages, setAuthImages] = useState<DefaultImages>(authFiles)
  const [brands, setBrands] = useState<CollectionAssetObject[]>()
  const [categoryImageNames, setCategoryImageNames] = useState<CategoryObject>()
  const [coa, setCOA] = useToggle(isWhiteListedSeller ? isWhiteListedSeller : isLuxuryAuthReq)
  const [messages, setMessages] = useState<string>('')

  useMemo(async () => {
    if (Object.keys(category ?? {}).length !== 0) setCategoryImageNames(category)
    if (category?.brands) {
      const addOtherInBrand = [...category.brands, { name: 'Other' }]
      setBrands(renameKeyOfBrand(addOtherInBrand))
    }
    if (coa && brand) {
      onChangeBrand?.(
        Object?.keys(brand as object).length > 0 ? brand : renameKeyOfBrand(categoryImageNames?.brands)?.[0]
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coa, category, categoryImageNames])

  /**
   * Function to handle category image upload and deletion
   * @param name - Name of the category
   * @param file - File uploaded by user
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCategoryImage = (name: string) => (file: FileUploadType, _: string) => {
    if (file) {
      setAuthImages({ ...authImages, [name]: file?.fileData })
    } else {
      const updateAdditionalImages = { ...authImages }
      delete updateAdditionalImages[name]
      setAuthImages(updateAdditionalImages)
    }
  }

  /**
   * Function to handles the toggle of the authentication checkbox.
   * @param toggled - Whether the checkbox is toggled on or off.
   */
  const handleAuthToggle = useCallback(
    (toggled: boolean) => {
      setCOA()
      if (!toggled) {
        onChangeBrand?.({} as CollectionAssetObject)
        setAuthImages({})
      }
    },
    [onChangeBrand, setCOA]
  )

  const alertHandler = useMemo(() => {
    if (isWhiteListedSeller) {
      return {
        coa: true,
        icon: <LeftAnnouncementIcon />,
        isDisabled: true,
        text: (
          <>
            As a ClubRare Brand Partner, you are receiving free authentications through July 31st.{' '}
            <a className="underline" href={CLUBRARE_SOCIAL_LINKS.promotion} rel="noreferrer" target="_blank">
              Learn More
            </a>
          </>
        ),
      }
    } else {
      if (credit && credit > 0) {
        return {
          coa: false,
          icon: <RightAnnouncementIcon />,
          isDisabled: false,
          text: (
            <>
              Receive your first Authentication for Free, a value of $30!{' '}
              <a className="underline" href={CLUBRARE_SOCIAL_LINKS.promotion} rel="noreferrer" target="_blank">
                Learn More
              </a>
            </>
          ),
        }
      } else {
        return {
          coa: false,
          icon: <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6" />,
          isDisabled: true,
          text: (
            <>
              You have submitted your free authentication - please list without authentication.{' '}
              <a className="underline" href={CLUBRARE_SOCIAL_LINKS.promotion} rel="noreferrer" target="_blank">
                Learn More
              </a>
            </>
          ),
        }
      }
    }
  }, [credit, isWhiteListedSeller])

  /**
   * Handle next button click event.
   * Validates if a category is selected and if an NFT image is uploaded.
   * If validation passes, calls the onNext function with form values.
   * @param values - form values
   */
  const handleNext = handleSubmit((values: FieldValues) => {
    const { id } = values
    const { imageRules } = categoryImageNames ?? {}
    const filteredImageRule = filteredImageRules(categoryImageNames?.imageRules)
    const isValidate = validateImageRequired(filteredImageRule, authImages)

    if (!imageRules || (coa && isValidate)) return setMessages('Upload NFT image.')
    if (id) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onChangeBrand?.({ ...brand, id } as CollectionAssetObject)
    }
    onChangeIsLuxuryAuthReq?.(coa)
    onAddAuthImages?.(authImages)
    onNext?.({})
  })

  const isOther = useMemo(() => compareStringsInsentively(brand?.displayName as string, 'other'), [brand?.displayName])
  return (
    <form
      className="scrollbar-hide flex h-full w-full flex-col justify-between overflow-y-scroll"
      onSubmit={handleNext}
    >
      <div>
        <div className="pb-4">
          <Typography className="font-bold text-neutral-100 dark:text-neutral-600" size="h4" variant="condensed">
            AUTHENTICATE
          </Typography>
          <Typography className="font-normal text-neutral-400 dark:text-neutral-600" size="caption" variant="condensed">
            Choose whether to Authenticate your item, Select the Brand or select “Other” to add a new Brand, and upload
            all required images.
            <br /> *We currently do not authenticate Art or Collectibles.
          </Typography>
        </div>
        <div className="h-[60vh] overflow-y-auto pr-2 xl:h-auto">
          <Alert icon={alertHandler?.icon} isShowButton={false} message={alertHandler?.text} />
          <div className="mt-2 flex justify-between">
            <div>
              <Typography
                className="font-normal text-neutral-100 dark:text-neutral-600"
                size="caption"
                variant="condensed"
              >
                AUTHENTICATE ITEM?
              </Typography>
            </div>
            <Toggle
              defaultCheck={alertHandler.coa ? alertHandler.coa : isLuxuryAuthReq}
              disabled={alertHandler.isDisabled}
              onChange={handleAuthToggle}
            />
          </div>

          {coa && (
            <>
              <Typography
                className="mt-2 font-normal text-neutral-100 dark:text-neutral-600"
                size="caption"
                variant="condensed"
              >
                Select Brand*
              </Typography>
              <div className={`${isOther && 'flex items-end justify-between gap-4 '}`}>
                <Select
                  className={`${isOther ? 'w-1/2' : 'w-full'} relative z-30`}
                  options={brands}
                  setSelectedCollectionAsset={onChangeBrand}
                  value={brand}
                />
                {isOther && (
                  <Input
                    className="w-1/2"
                    control={control}
                    defaultValue={brand?.id}
                    innerClassName="!bg-transparent"
                    name="id"
                    required
                  />
                )}
              </div>
              <div className="mt-4">
                <Typography
                  className="font-normal text-neutral-100 dark:text-neutral-600"
                  size="caption"
                  variant="condensed"
                >
                  AUTHENTICATE ITEM?
                </Typography>
                <Typography
                  className="font-normal text-neutral-400 dark:text-neutral-600"
                  size="caption"
                  variant="condensed"
                >
                  All images marked with (*) are mandatory to authenticate this item
                </Typography>
                <div className="mt-2 grid grid-cols-3 md:grid-cols-4">
                  {filteredImageRules(categoryImageNames?.imageRules)?.map((categoryImg, index) => (
                    <AddImage
                      accept={['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml']}
                      className="pb-1"
                      defaultImage={
                        authImages[categoryImg?.name] ? URL.createObjectURL(authImages[categoryImg?.name]) : null
                      }
                      error={categoryImg.isRequired ? messages : ''}
                      key={`image-${index}`}
                      label={categoryImg.isRequired ? categoryImg.description + '*' : categoryImg.description}
                      type={authImages[categoryImg?.name]?.type.toString()}
                      width={100}
                      onChange={handleCategoryImage(categoryImg.name)}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="!mb-2 mt-2 flex flex-col px-4 md:mt-4 md:flex-row md:items-center md:justify-between md:px-0">
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
