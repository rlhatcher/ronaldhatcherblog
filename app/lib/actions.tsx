'use server'
import { mergeRocket, removeRocket, mergeDesign } from './neo4j'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadImage } from './cloudinary'

import { z } from 'zod'
import { Identifier } from '@/app/lib/schema/sharedTypes'

export interface State {
  errors?: {
    rid?: string[]
    name?: string[]
  }
  message?: string | null
}

export const CreateRocketSchema = z.object({
  id: Identifier,
  name: z.string(),
  description: z.string().optional(),
  image: z.instanceof(File).optional()
})

const CreateRocket = CreateRocketSchema.omit({ id: true })

export async function uploadDesign (
  prevState: State,
  formData: FormData
): Promise<State> {
  const url = 'http://localhost:3000/api/rest/ork'

  try {
    const response = await fetch(url, { method: 'POST', body: formData })
    const designId = formData.get('rid') as string

    if (response.ok) {
      const data: Design = await response.json()
      data.id = designId
      console.debug(JSON.stringify(data, null, 2))

      await mergeDesign(data)
      return {
        message: 'Design uploaded successfully'
      }
    } else {
      console.error('Failed to upload design:', response.statusText)
      throw new Error('Failed to upload design')
    }
  } catch (error) {
    console.error('Error during fetch operation:', error)
    throw error
  }
  revalidatePath('/dashboard/designs')
  redirect('/dashboard/designs')
}

export async function createRocket (
  prevState: State,
  formData: FormData
): Promise<State> {
  const url = 'http://localhost:3000/api/rest/ork'

  const { name, image, file, description } = CreateRocket.parse({
    name: formData.get('name'),
    image: formData.get('image'),
    file: formData.get('file'),
    description: formData.get('description')
  })

  if (image instanceof File) {
    const resImage = await uploadImage(image, {
      public_id: `rockets/${name}/main`,
      overwrite: true,
      tags: [name, 'createRocket']
    })
    if (resImage === null) {
      return {
        message: 'Failed to upload image.'
      }
    }
  }

  const rocketData: Rocket = { id: '', name, isModel: true, image: `rockets/${name}/main` }

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
  const rocketData: Rocket = { id: rocketId, name: rocketName, isModel: true }

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
