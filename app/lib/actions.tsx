'use server'

import { mergeRocket, removeRocket } from './neo4j'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// This is temporary
export interface State {
  errors?: {
    rid?: string[]
    name?: string[]
  }
  message?: string | null
}

export async function createRocket (
  prevState: State,
  formData: FormData
): Promise<State> {
  const rocketId = formData.get('rid') as string
  const rocketName = formData.get('name') as string

  const rocketData: Rocket = { id: rocketId, name: rocketName }

  const res = await mergeRocket(rocketData)
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

export async function deleteRocket (
  prevState: State,
  formData: FormData
): Promise<State> {
  const rocketId = formData.get('id') as string
  const rocketName = formData.get('name') as string

  // Prepare data for insertion into the database
  const rocketData: Rocket = { id: rocketId, name: rocketName }

  const res = await removeRocket(rocketData)
  if (res === null) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to remove Rocket.'
    }
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/rockets')
  redirect('/dashboard/rockets')
}
