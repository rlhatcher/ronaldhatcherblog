'use server'
import { mergeRocket, removeRocket, mergeDesign } from './neo4j'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadImage } from './cloudinary'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

export interface State {
  errors?: {
    rid?: string[]
    name?: string[]
  }
  message?: string | null
}

/**
 * Rocket
 */
const CreateRocketSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  image: z.instanceof(File).optional()
})

const CreateRocket = CreateRocketSchema.omit({ id: true })

export async function createRocket (
  prevState: State,
  formData: FormData
): Promise<State> {
  const { name, image, description } = CreateRocket.parse({
    name: formData.get('name'),
    image: formData.get('image'),
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

  const rocketData: Rocket = {
    id: uuidv4(),
    name,
    isModel: true,
    image: `rockets/${name}/main`,
    description
  }

  const res = await mergeRocket(rocketData)

  if (res === null) {
    return {
      message: 'Database Error: Failed to Create Rocket.'
    }
  }

  revalidatePath('/dashboard/rockets')
  redirect('/dashboard/rockets')
}

export async function uploadDesign (
  prevState: State,
  formData: FormData
): Promise<State> {
  const url = 'https://api.ronaldhatcher.com/ork'
  const rocketId = formData.get('rocketId') as string
  const rocketName = formData.get('rocketName') as string

  try {
    const response = await fetch(url, { method: 'POST', body: formData })
    // making a new design so we need to generate an id
    const designId = uuidv4()

    if (response.ok) {
      const data: Design = await response.json()
      data.id = designId
      data.defines = {
        id: rocketId,
        name: rocketName,
        isModel: true
      } satisfies Rocket
      await mergeDesign(data)
    } else {
      console.error('Failed to upload design:', response.statusText)
      throw new Error('Failed to upload design')
    }
  } catch (error) {
    console.error('Error during fetch operation:', error)
    throw error
  }
  revalidatePath(`/dashboard/rockets/${rocketId}/designs`)
  redirect(`/dashboard/rockets/${rocketId}/designs`)
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
