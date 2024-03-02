'use client'
import { useFormState } from 'react-dom'
import Link from 'next/link'
import { Button } from '@/app/ui/button'
import { uploadDesign } from '@/app/lib/actions'
import { Input } from '@/app/ui/input'
import { Field, FieldGroup, Fieldset, Label } from '../fieldset'
import { Text } from '@/app/ui/text'

export default function Form (): JSX.Element {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(uploadDesign, initialState)

  return (
    <form action={dispatch}>
      <div className='space-y-6'>
        <div id='customer-error' aria-live='polite' aria-atomic='true'>
          {state.errors?.rid?.map((error: string) => (
            <p className='mt-2 text-sm text-red-500' key={error}>
              {error}
            </p>
          ))}
        </div>
        <Fieldset className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Upload an OpenRocket file
          </h2>
          <Text className='mt-1 text-sm leading-6 text-gray-600'>
            Any simulation data will be automatically extracted and added to the
            database
          </Text>
          <FieldGroup className='mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6'>
            <Field className='sm:col-span-3'>
              <Label htmlFor='rid'>Rocket ID</Label>
              <Input
                id='rid'
                name='rid'
                type='text'
                defaultValue='phx'
                className='w-full border-slate-400'
              />
            </Field>
            <Field className='sm:col-span-2 font-mono'>
              <Label>Select an file to upload</Label>
              <Input
                id='ork'
                name='ork'
                type='file'
                className='w-full border-slate-400'
              />
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
        <Button type='submit'>Create Rocket</Button>
      </div>
    </form>
  )
}
