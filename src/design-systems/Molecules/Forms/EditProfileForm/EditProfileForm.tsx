import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import { FormTextArea as TextArea, FormInput as Input } from '../Form'

import type { EditProfileFormProps } from './interface'

import { Button } from 'design-systems/Atoms/Button'
import { Avatar } from 'design-systems/Molecules/Avatar'
import { Typography } from 'design-systems/Atoms/Typography'
import { InfoIcon } from 'design-systems/Atoms/Icons'
import { useOverlay } from 'context'
import { useToast } from 'hooks/useToast'
import { useEditProfile } from 'hooks/api/useEditProfile'
import { useProfile } from 'hooks/api/useProfile'
import { useFilePreview } from 'hooks/useFilePreview'

export const EditProfileForm: React.FC<EditProfileFormProps> = ({ userIdOrAddress }) => {
  const { closeOverlay } = useOverlay()
  const { loadingToast, updateToast } = useToast()

  const [localLoading, setLocalLoading] = useState(false)
  const { editProfileAsync } = useEditProfile()
  const { userProfile, refetchUserProfile } = useProfile(userIdOrAddress)
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const files: File[] = watch('image')
  const [filePreview] = useFilePreview(files, userProfile?.image)

  const onSubmit = async (values: FieldValues) => {
    const formData = new FormData()

    for (const key in values) {
      if (values[key]) {
        if (key === 'image') {
          formData.append('attachment', values[key][0])
        } else {
          formData.append(key, values[key])
        }
      }
    }

    try {
      setLocalLoading(true)
      const toastId = loadingToast('Saving profile...')
      const res = await editProfileAsync(formData)
      if (res?.code === 200 && res?.status === true) {
        updateToast(toastId, 'Successfully saved.', 'success')
        await refetchUserProfile()
        closeOverlay()
      } else {
        updateToast(toastId, res?.message, 'warning')
      }
      setLocalLoading(false)
    } catch (error) {
      setLocalLoading(false)
    }
  }

  return (
    <form className="flex w-full flex-col justify-between px-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className=" flex items-center gap-4">
          <Avatar
            className={`h-10 w-10 md:h-10 md:w-10`}
            size="small"
            src={
              filePreview && !filePreview.toString().startsWith('blob')
                ? filePreview.toString() + '?auto=format&w=40&h=40'
                : filePreview.toString()
            }
          />
          <label className="cursor-pointer rounded-3xl border-2 border-neutral-100 px-4 py-1.5 text-sm  font-medium leading-sm dark:border-neutral-800">
            {filePreview ? 'CHANGE' : 'UPLOAD'}
            <input className="hidden" type="file" {...register('image')} />
          </label>
        </div>
        <Input
          className="w-full"
          control={control}
          defaultValue={userProfile?.name}
          label="Display Name"
          labelClassName="!font-normal"
          name="name"
          placeholder="Enter here"
        />
        <div>
          <div>
            <Typography
              className="mb-1 font-normal text-neutral-100 dark:text-neutral-600"
              size="caption"
              variant="condensed"
            >
              Custom URL
            </Typography>
            <div className="flex items-center">
              <Typography
                className=" border-b border-neutral-600 bg-neutral-800 pr-0.5 text-end !leading-[28px] text-neutral-500  dark:border-neutral-400 dark:bg-neutral-200 dark:active:border-neutral-700"
                size="body"
              >
                clubrare.xyz/profile/
              </Typography>
              <Input
                className="w-full"
                control={control}
                defaultValue={userProfile?.customUrl}
                labelClassName=""
                name="custom_url"
                placeholder="MyURL"
                rules={{
                  minLength: { message: 'Custom URL length must be at least 6 Characters Long', value: 6 },
                }}
                type="text"
                variant="primary"
              />
            </div>
          </div>
          {errors.customUrl && typeof errors.customUrl === 'object' && (
            <Typography className="mt-1 flex items-center gap-1 text-error-800" size="small">
              <InfoIcon className="stroke-error-800" height={12} width={12} />
              {errors?.customUrl?.message ? 'Custom URL length must be at least 6 Characters Long' : ''}
            </Typography>
          )}
        </div>

        <Input
          className="w-full"
          control={control}
          defaultValue={userProfile?.email}
          label="Email"
          labelClassName="!font-normal"
          name="email"
          placeholder="Enter here"
          type="email"
          variant="primary"
        />
        <TextArea
          className="w-full"
          control={control}
          defaultValue={userProfile?.bio}
          label="Bio (max 100 characters)"
          name="bio"
          placeholder="Enter here"
          rows={12}
          type="text"
        />
      </div>
      <div className="mb-2 flex w-full">
        <Button
          className="text-md font-medium text-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-600"
          disabled={localLoading}
          fullWidth
          loading={localLoading}
          type="submit"
        >
          SAVE CHANGES
        </Button>
      </div>
    </form>
  )
}
