'use server'
import { mergeRocket, removeRocket, mergeConfigs } from './neo4j'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadImage } from './cloudinary'

export interface State {
  errors?: {
    rid?: string[]
    name?: string[]
  }
  message?: string | null
}

export async function uploadDesign (
  prevState: State,
  formData: FormData
): Promise<State> {
  const url = 'http://localhost:3000/api/rest/ork'

  try {
    const response = await fetch(url, { method: 'POST', body: formData })
    const designId = formData.get('rid') as string

    if (response.ok) {
      const data: ConfigurationDetail[] = await response.json()
      console.debug(JSON.stringify(data, null, 2))
      await mergeConfigs(designId, data)
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
}

export async function createRocket (
  prevState: State,
  formData: FormData
): Promise<State> {
  const rocketId = formData.get('rid') as string
  const rocketName = formData.get('name') as string
  const file = formData.get('image') as File

  const resImage = await uploadImage(file, {
    public_id: `rockets/${rocketId}/main`,
    overwrite: true,
    tags: [rocketId, rocketName, 'createRocket']
  })

  if (resImage === null) {
    return {
      message: 'Failed to upload image.'
    }
  }

  const rocketData: Rocket = { id: rocketId, name: rocketName, isModel: true, image: `rockets/${rocketId}/main` }

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
