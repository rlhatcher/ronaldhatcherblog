'use client'
import { useFormState } from 'react-dom'
import Link from 'next/link'
import { Button } from '@/app/ui/button'
import { uploadDesign } from '@/app/lib/actions'
import { Input } from '@/app/ui/input'
import { Field, FieldGroup, Fieldset, Label } from '../fieldset'
import { Text } from '@/app/ui/text'

export default function Form ({
  rocketId
}: { rocketId: string }): JSX.Element {
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
            Add a Design
          </h2>
          <Text className='mt-1 text-sm leading-6 text-gray-600'>
            Enter details or upload an Openrocket design file
          </Text>
          <FieldGroup className='mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6'>
            <Field className='sm:col-span-2 font-mono'>
              <Label>Select an ORK File</Label>
              <Input
                id='file'
                name='file'
                type='file'
                className='w-full border-slate-400'
              />
            </Field>
            <Field hidden>
              <Label>rocketId</Label>
              <Input
                id='rocketId'
                name='rocketId'
                type='text'
                value={rocketId}
                readOnly
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
        <Button type='submit'>Save Design</Button>
      </div>
    </form>
  )
}
