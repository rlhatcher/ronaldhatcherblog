'use server'

import { z } from 'zod'
import { mrgRocket } from './neo4j'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const FormSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string()
})

const CreateRocket = FormSchema.omit({ id: true })

// This is temporary
export interface State {
  errors?: {
    slug?: string[]
    name?: string[]
  }
  message?: string | null
}

export async function createRocket (
  prevState: State,
  formData: FormData
): Promise<State> {
  // Validate form fields using Zod
  const validatedFields = CreateRocket.safeParse({
    slug: formData.get('slug'),
    name: formData.get('name')
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Rocket.'
    }
  }

  // Prepare data for insertion into the database
  const rocketData: Rocket = validatedFields.data

  const res = await mrgRocket(rocketData)
  if (res === null) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Rocket.'
    }
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/rockets')
  redirect('/dashboard/rockets')
}
