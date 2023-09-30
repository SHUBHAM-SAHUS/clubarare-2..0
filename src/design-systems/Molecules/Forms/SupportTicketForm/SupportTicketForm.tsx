import { Form } from '../Form'

import type { SupportTicketFormProps } from './interface'

import { Button } from 'design-systems/Atoms/Button'
import { Input } from 'design-systems/Atoms/Input'
import { TextArea } from 'design-systems/Atoms/TextArea'

export const SupportTicketForm: React.FC<SupportTicketFormProps> = ({ className }) => {
  return (
    <Form
      className={`flex w-full flex-col justify-between px-3 ${className}`}
      defaultValues={undefined}
      onSubmit={function (): void {
        throw new Error('Function not implemented.')
      }}
    >
      <div className="space-y-4">
        <Input className="w-full" label="Email" placeholder="Add email address" type="email" variant="primary" />
        <Input className="w-full" label="Title" placeholder="Add name" required={true} type="text" variant="primary" />
        <Input className="w-full" label="Wallet Address" placeholder="Add custom URL" type="text" variant="primary" />
        <Input
          className="w-full"
          label="Transaction Hash"
          placeholder="Add email address"
          type="text"
          variant="primary"
        />
        <TextArea
          className="w-full"
          label="Description"
          placeholder="Write ticket description"
          required={true}
          rows={12}
          type="text"
        />
      </div>
      <div className="mb-2 flex w-full">
        <Button
          className="text-md font-medium text-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-600"
          fullWidth
          loading={false}
          type="submit"
        >
          SUBMIT TICKET
        </Button>
      </div>
    </Form>
  )
}
