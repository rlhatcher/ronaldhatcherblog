'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { saveUserAction } from '@/app/actions/actions'
import { DisplayServerActionResponse } from '@/components/DisplayServerActionResponse'
import { InputWithLabel } from '@/components/InputWithLabel'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { UserSchema } from '@/schemas/User'
import type { User } from '@/schemas/User'

interface Props {
  user: User
}

export default function UserForm({ user }: Props) {
  const router = useRouter()
  const { execute, result, isExecuting } = useAction(saveUserAction)

  const form = useForm<User>({
    resolver: zodResolver(UserSchema),
    defaultValues: { ...user },
  })

  useEffect(() => {
    // boolean value to indicate form has not been saved
    localStorage.setItem('userFormModified', form.formState.isDirty.toString())
  }, [form.formState.isDirty])

  async function onSubmit() {
    /* No need to validate here because 
        react-hook-form already validates with 
        our Zod schema */

    // Test validation errors:
    // execute({
    //     id: 9,
    //     firstname: "D",
    //     lastname: "G",
    //     email: "davegray.codes",
    // })
    execute(form.getValues())
    router.refresh() // could grab a new timestamp from db
    // reset dirty fields
    form.reset(form.getValues())
    // }
  }

  return (
    <div>
      <DisplayServerActionResponse result={result} />

      <Form {...form}>
        <form
          onSubmit={e => {
            e.preventDefault()
            form.handleSubmit(onSubmit)()
          }}
          className="flex flex-col gap-4"
        >
          <InputWithLabel
            fieldTitle="First Name"
            nameInSchema="firstname"
          />
          <InputWithLabel
            fieldTitle="Last Name"
            nameInSchema="lastname"
          />
          <InputWithLabel
            fieldTitle="Email"
            nameInSchema="email"
          />
          <div className="flex gap-4">
            <Button>{isExecuting ? 'Working...' : 'Submit'}</Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                form.reset()
              }}
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
