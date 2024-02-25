'use client'

import Link from 'next/link'
import { Button } from '@/app/ui/button'
import { createRocket } from '@/app/lib/actions'
import { useFormState } from 'react-dom'
import { Input } from '@/app/ui/input'
import { Field, FieldGroup, Fieldset, Label, Legend } from '../fieldset'
import { Text } from '@/app/ui/text'

export default function Form (): JSX.Element {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(createRocket, initialState)

  return (
    <form action={dispatch}>
      <div id='customer-error' aria-live='polite' aria-atomic='true'>
        {state.errors?.slug?.map((error: string) => (
          <p className='mt-2 text-sm text-red-500' key={error}>
            {error}
          </p>
        ))}
      </div>
      <Fieldset>
        <Legend>Add a Rocket</Legend>
        <Text>Enter the details for your new rocket</Text>
        <FieldGroup>
          <Field>
            <Label>Name</Label>
            <Input name='name' />
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input name='slug' />
          </Field>
        </FieldGroup>
      </Fieldset>

      <div className='mt-6 flex justify-end gap-4'>
        <Link
          href='/dashboard/invoices'
          className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
        >
          Cancel
        </Link>
        <Button type='submit'>Create Rocket</Button>
      </div>
    </form>
  )
}
