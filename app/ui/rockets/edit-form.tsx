'use client'

import Link from 'next/link'
import { Button } from '@/app/ui/button'
import { createRocket } from '@/app/lib/actions'
import { useFormState } from 'react-dom'
import { Input } from '@/app/ui/input'
import { Field, FieldGroup, Fieldset, Label } from '../fieldset'
import { Text } from '@/app/ui/text'

export default function Form ({
  rocket
}: {
  rocket: Rocket
}): JSX.Element {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(createRocket, initialState)

  return (
    <form action={dispatch}>
      <div className='space-y-6'>
        <div id='customer-error' aria-live='polite' aria-atomic='true'>
          {state.errors?.slug?.map((error: string) => (
            <p className='mt-2 text-sm text-red-500' key={error}>
              {error}
            </p>
          ))}
        </div>
        <Fieldset className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>Edit your Rocket</h2>
          <Text className="mt-1 text-sm leading-6 text-gray-600">Enter the details for your new rocket</Text>
          <FieldGroup className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
            <Field className='col-span-full'>
              <Label className="block text-sm font-medium leading-6 text-gray-900">Name</Label>
              <Input name='name' defaultValue={rocket.name} className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'/>
            </Field>
            <Field className='sm:col-span-4'>
              <Label>Slug</Label>
              <Input name='slug' defaultValue={rocket.slug} className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'/>
            </Field>
          </FieldGroup>
        </Fieldset>
      </div>
      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <Link
          href='/dashboard/rockets'
          className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
        >
          Cancel
        </Link>
        <Button type='submit'>Save</Button>
      </div>
    </form>
  )
}
