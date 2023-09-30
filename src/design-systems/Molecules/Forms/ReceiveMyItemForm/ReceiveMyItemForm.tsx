import { FieldValues, useForm } from 'react-hook-form'

import { ReceiveMyItemFormParamProps, ReceiveMyItemFormProps } from './interface'
import { initialFormState } from './utils'

import { useToggle } from 'hooks/useToggle'
import { MarketplaceService } from 'api-services'
import { Button } from 'design-systems/Atoms/Button'
import { Typography } from 'design-systems/Atoms/Typography'
import { FormInput as Input } from 'design-systems/Molecules/Forms/Form'
import { EMAIL_REGEX } from 'utils/regex'

export const ReceiveMyItemForm: React.FC<ReceiveMyItemFormParamProps> = ({ asset, onClose, refetchVaultDetails }) => {
  const [isLoading, , , showLoading, hideLoading] = useToggle(false)

  const {
    handleSubmit,
    formState: { errors, isDirty, isValid },
    control,
  } = useForm<FieldValues | ReceiveMyItemFormProps>({
    defaultValues: initialFormState,
    mode: 'onChange',
  })

  // form Submit
  const onSubmit = async (data: FieldValues) => {
    showLoading()
    const collectible_id = 'collectible_id'
    const network_id = 'network_id'
    data[collectible_id] = asset?.id
    data[network_id] = asset?.networkId
    await MarketplaceService.receivedItem(data)
    hideLoading()
    onClose()
    refetchVaultDetails()
  }

  return (
    <form className="relative flex flex-col justify-between py-2" onSubmit={handleSubmit(onSubmit)}>
      <Typography className="Neutral-400 !normal-case" size="sm" variant="condensed">
        You can redeem this product to receive the physical item. We need some details first to process the order
      </Typography>
      <div className="px-1 pb-4">
        <div className="mt-4">
          <div className="divide-y divide-neutral-600 rounded-sm bg-transparent px-2 dark:bg-neutral-200">
            {/* <div className="mt-4 rounded bg-neutral-800 px-3 py-4"> */}
            <div className="space-y-6">
              <Input
                className="w-full !font-normal !normal-case"
                control={control}
                error={errors?.full_name?.message?.toString()}
                label="Full Name"
                name="full_name"
                placeholder="Add full name"
                required={true}
                rules={{
                  maxLength: { message: 'Name must not be greater than 20 characters long', value: 20 },
                  minLength: { message: 'Name must be greater than 2 characters long', value: 2 },
                  required: { message: 'Name can not be empty', value: true },
                }}
                type="text"
                variant="primary"
              />

              <Input
                className="w-full !normal-case"
                control={control}
                error={errors?.email?.message?.toString()}
                label="Email"
                name="email"
                placeholder="Enter email"
                required={true}
                rules={{
                  pattern: {
                    message: 'Please enter a valid email address',
                    value: EMAIL_REGEX,
                  },
                  required: { message: 'Email can not be empty', value: true },
                }}
                type="email"
                variant="primary"
              />
              <Input
                className="w-full !normal-case"
                control={control}
                error={errors?.phone_number?.message?.toString()}
                innerClassName="!bg-transparent"
                label="Phone Number"
                name="phone_number"
                placeholder="Add your phone number"
                required={true}
                rules={{
                  required: { message: 'Phone number can not be empty!', value: true },
                }}
                type="number"
                variant="primary"
              />
              <Input
                className="w-full !normal-case"
                control={control}
                error={errors?.address?.message?.toString()}
                label="Address"
                name="address"
                placeholder="Enter address"
                required={true}
                rules={{
                  maxLength: { message: 'Please enter shorter address', value: 120 },
                  minLength: { message: 'Please enter valid address', value: 6 },
                  required: { message: 'Address can not be empty', value: true },
                }}
                type="text"
                variant="primary"
              />

              <div className="grid grid-cols-2 gap-8">
                <Input
                  className="w-full !normal-case"
                  control={control}
                  error={errors?.city?.message?.toString()}
                  innerClassName="!bg-transparent"
                  label="City"
                  name="city"
                  placeholder="Add city"
                  required={true}
                  rules={{
                    maxLength: { message: 'Please enter shorter city name', value: 20 },
                    minLength: { message: 'Please enter valid city name', value: 2 },
                    required: { message: 'City can not be empty', value: true },
                  }}
                  type="text"
                  variant="primary"
                />
                <Input
                  className="w-full !normal-case"
                  control={control}
                  error={errors?.zip_code?.message?.toString()}
                  innerClassName="!bg-transparent"
                  label="Zip/Postal"
                  name="zip_code"
                  placeholder="Add zip/postal"
                  required={true}
                  rules={{
                    maxLength: { message: 'Please enter valid zip code', value: 10 },
                    required: { message: 'Zip code can not be empty', value: true },
                  }}
                  type="text"
                  variant="primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <Input
                  className="w-full !normal-case"
                  control={control}
                  error={errors?.state?.message?.toString()}
                  innerClassName="!bg-transparent"
                  label="State"
                  name="state"
                  placeholder="Add state"
                  required={true}
                  rules={{
                    maxLength: { message: 'Please enter shorter State/Region', value: 20 },
                    minLength: { message: 'Please enter valid State/Region', value: 2 },
                    required: { message: 'State/Region can not be empty', value: true },
                  }}
                  type="text"
                  variant="primary"
                />
                <Input
                  className="w-full !normal-case"
                  control={control}
                  error={errors?.country?.message?.toString()}
                  id="country"
                  innerClassName="!bg-transparent"
                  label="Country"
                  name="country"
                  placeholder="Add country"
                  required={true}
                  rules={{
                    maxLength: { message: 'Please enter shorter country name', value: 20 },
                    minLength: { message: 'Please enter valid country name', value: 2 },
                    required: { message: 'Country name can not be empty', value: true },
                  }}
                  type="text"
                  variant="primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="!mb-2 mt-2 flex flex-col px-4 md:flex-row  md:items-center md:justify-between md:px-0">
        <Button className="hidden md:flex" color="primary" size="medium" variant="outlined" onClick={() => onClose()}>
          CANCEL
        </Button>
        <Button
          className="w-full !px-10 uppercase md:w-auto"
          color="primary"
          disabled={!isDirty || !isValid}
          loading={isLoading}
          size="medium"
          type="submit"
          variant="solid"
        >
          RECEIVE MY ITEM
        </Button>
      </div>
    </form>
  )
}
