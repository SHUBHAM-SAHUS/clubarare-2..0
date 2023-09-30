import { useState, ChangeEvent } from 'react'

import { strings } from './utils'
import type { CollectionFormProps } from './interface'

import { Avatar } from 'design-systems/Molecules/Avatar'
import { Button } from 'design-systems/Atoms/Button'
import { CloseIcon } from 'design-systems/Atoms/Icons'
import { Input } from 'design-systems/Atoms/Input'
import { AddImage } from 'design-systems/Molecules/Buttons/AddImage'
import { TextArea } from 'design-systems/Atoms/TextArea'
import { FileUploadType } from 'design-systems/Molecules/Buttons/AddImage'
import { useOverlay } from 'context'
import { useShallowState } from 'hooks/useShallowState'
import { useToggle } from 'hooks/useToggle'
import { useCollection } from 'hooks/api/useCollection'
import { useToast } from 'hooks/useToast'

export const CollectionForm: React.FC<CollectionFormProps> = ({ collection, onClick, refetchCollection }) => {
  const [form, setForm] = useShallowState<CollectionAssetObject>(collection)
  const { closeOverlay } = useOverlay()

  const [uploadFile, setUploadFile] = useState<Blob>()
  const [uploadBannerFile, setBannerUploadFile] = useState<Blob>()

  const [isLoading, toggleIsLoading] = useToggle(false)
  const [isState, setIsStatus] = useState<typeof InitialStatus>(InitialStatus)

  const { onUpdateCollectionDetailAsync, onValidateCustomURLAsync } = useCollection('')
  const { successToast, warningToast } = useToast()

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()

    // validate custom url
    toggleIsLoading()

    try {
      const urlValidationResponse = (await onValidateCustomURLAsync({ customUrl: form.customUrl, id: form.id })) as {
        status: boolean
        message: string
      }
      setIsStatus(urlValidationResponse)
      if (!urlValidationResponse.status) {
        toggleIsLoading()
        return
      }
      const data = new FormData()
      data.append('bannerImage', uploadBannerFile ?? form.bannerImage)
      data.append('displayName', form.displayName)
      data.append('description', form.description)
      data.append('avatar', form.avatar)
      data.append('customUrl', form.customUrl)

      const res = await onUpdateCollectionDetailAsync({ id: form.id, data })
      if (res) {
        onClick?.()
        refetchCollection?.()
        successToast('Collection updated successfully')
        // TODO improve
        setTimeout(closeOverlay, 500)
      } else {
        warningToast('Collection updating failed')
      }
    } catch (error) {
      console.error('Updating collection error: ', error)
    } finally {
      toggleIsLoading()
    }
  }

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm({ [name]: value })
  }

  // TODO merge
  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setForm({ [name]: value })
  }

  const bannerImageHandler = (file: FileUploadType) => {
    if (!file) {
      setBannerUploadFile(undefined)
      return
    }
    setBannerUploadFile(file.fileData)
  }

  // const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const file = e?.target?.files[0]
  //     setUploadFile(file)
  //   }
  // }

  return (
    <>
      <form className="flex h-screen flex-col bg-neutral-800 p-4 dark:bg-neutral-200" onSubmit={onSubmit}>
        <div className="flex grow flex-col gap-y-1 overflow-hidden">
          <button className="gap-y-0" type="button" onClick={onClick}>
            <CloseIcon className="ml-auto mr-0 fill-neutral-500" />
          </button>
          <div className="flex flex-row items-center gap-x-4">
            <Avatar src={uploadFile ? URL.createObjectURL(uploadFile) : collection.avatar} />
            {/* <label
              className={`cursor-pointer rounded-3xl border-2 border-neutral-100 px-4 py-1.5  text-sm font-medium leading-sm ${
                form.chain === 'on' && 'invisible'
              }`}
            >
              CHANGE
              <input type="file" onChange={handleFile} className="hidden" />
            </label> */}
          </div>
          <AddImage
            chain={form.chain}
            defaultImage={collection.bannerImage}
            height={200}
            width={342}
            onChange={bannerImageHandler}
          />
          <div className="flex grow flex-col gap-y-5">
            <Input
              disabled={form.chain === 'on' ? true : false}
              label="Name *"
              name="displayName"
              type="text"
              value={form.displayName}
              onChange={handleChange}
            />

            <Input label="Custom URL *" name="customUrl" type="text" value={form.customUrl} onChange={handleChange} />
            {!isState.status && <p className="text-sm !text-error-800">{isState?.message}</p>}

            <TextArea
              disabled={form.chain === 'on' ? true : false}
              label="Description *"
              name="description"
              rows={5}
              type="textarea"
              value={form.description}
              onChange={handleChangeDescription}
            />
          </div>
        </div>

        <div className="my-2 flex h-14 items-center justify-center">
          <Button
            disabled={!isState?.status && isState?.message ? true : false}
            fullWidth
            loading={isLoading}
            type="submit"
          >
            {strings.SAVE_CHANGES}
          </Button>
        </div>
      </form>
      <div className="offcanvas-backdrop show fade -z-50 h-full w-full" style={{ width: '100%', height: '100%' }}></div>
    </>
  )
}

const InitialStatus = { status: false, message: '' }
