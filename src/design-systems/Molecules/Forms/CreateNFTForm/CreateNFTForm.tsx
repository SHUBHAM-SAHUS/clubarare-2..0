import { FieldValues, useForm } from 'react-hook-form'

import { inputs } from './utils'
import { CreateNFTFormProps } from './interface'

import { Typography } from 'design-systems/Atoms/Typography'
import { Button } from 'design-systems/Atoms/Button'
import { ProductType, FlowType } from 'design-systems/Organisms/Managers/NFTCreationManager'

export const CreateNFTForm: React.FC<CreateNFTFormProps> = ({
  description = '',
  email = '',
  initial,
  name = '',
  productType,
  title = '',
  onNext,
  onSelectFlowType,
  onSelectProductType,
}) => {
  const defaultValues: Record<string, string> = {
    email,
    name,
    title,
    description,
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues })

  const handleNext = handleSubmit((values: FieldValues) => {
    onNext?.(values)
  })

  const handleSelectProductType = (status: boolean) => {
    onSelectProductType?.(status ? ProductType.PHYGITAL : ProductType.DIGITAL)
    onSelectFlowType?.(status ? FlowType.PHYGITAL : FlowType.DIGITAL)
  }

  const isDisabled = (value: string) => {
    if (value === 'email' || value === 'name') {
      return !!initial[value]
    }
  }

  return (
    <form className="flex h-full flex-col items-center justify-between" onSubmit={handleNext}>
      <div className="w-full">
        <div className="flex flex-col gap-1 pb-8">
          <Typography className="uppercase" size="h4" variant="condensed">
            List your item
          </Typography>
          <Typography className="text-neutral-400 dark:text-neutral-700" size="caption" variant="condensed">
            Include the item’s Title and the item’s Description which will show on the item’s detail page.
          </Typography>
        </div>
        <div
          className={`flex ${
            !isDisabled('email') || !isDisabled('name') ? 'h-[40vh]' : 'h-[35vh]'
          }   flex-col gap-6 overflow-x-auto overflow-y-auto pr-4 xxl:h-auto xxl:px-0`}
        >
          {/* <div>
            <div className="flex w-full justify-between">
              <Typography size="lg" variant="condensed">
                Attach physical product
              </Typography>
              <Toggle disabled defaultCheck={productType === ProductType.PHYGITAL} onChange={handleSelectProductType} />
            </div>
            <Typography size="caption" variant="condensed" className="text-neutral-400 dark:text-neutral-700">
              Switch the toggle on if you would like to create a PHYGITAL NFT. (An NFT that attaches a physical product
              to your digital NFT. Learn more
            </Typography>
          </div> */}
          {inputs.map(
            ({ InputField, name, rules, ...rest }) =>
              !isDisabled(name) && (
                <InputField
                  control={control}
                  defaultValue={defaultValues[name]}
                  disabled={isDisabled(name)}
                  error={errors[name]?.message?.toString()}
                  innerClassName="!bg-transparent"
                  key={name}
                  name={name}
                  rules={rules}
                  {...rest}
                />
              )
          )}
        </div>
      </div>
      <div className="flex w-full items-center justify-end px-4 pb-2 pt-4 md:px-0 md:pt-7">
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
