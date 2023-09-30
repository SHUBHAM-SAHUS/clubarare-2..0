import { FieldValues, useForm } from 'react-hook-form'

import { socials, strings, profile } from './utils'
import type { ProfileFormProps } from './interface'

import { Avatar } from 'design-systems/Molecules/Avatar'
import { Button } from 'design-systems/Atoms/Button'
import { ImageUploader } from 'design-systems/Molecules/Uploaders/ImageUploader'
import { Input } from 'design-systems/Atoms/Input'
import { Typography } from 'design-systems/Atoms/Typography'

export const ProfileForm: React.FC<ProfileFormProps> = () => {
  const { handleSubmit, register } = useForm()
  const onSubmit = (data: FieldValues) => {
    // TODO:
  }

  return (
    <form className="flex h-screen flex-col px-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex grow flex-col gap-y-6 overflow-scroll">
        <div className="flex flex-row items-center gap-x-4">
          <Avatar />
          <Button className="h-8" color="primary" size="small" variant="outlined">
            {strings.UPLOAD}
          </Button>
        </div>

        <ImageUploader />

        {profile.map(({ InputField, name, ...rest }) => (
          <InputField key={name} {...register(name)} {...rest} />
        ))}

        <div className="">
          <Typography size="sm">{strings.SOCIAL_PROFILES}</Typography>
          <div className="flex w-full flex-col gap-y-4">
            {socials.map(({ name, Icon }) => (
              <div className="flex flex-row items-center gap-x-2.5" key={name}>
                <Input
                  {...register(name)}
                  className="w-full"
                  icon={<Icon fill="fill-neutral-800" height={30} width={30} />}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-2 flex h-14 items-center justify-center">
        <Button fullWidth loading={false} type="submit">
          {strings.SAVE_CHANGES}
        </Button>
      </div>
    </form>
  )
}
