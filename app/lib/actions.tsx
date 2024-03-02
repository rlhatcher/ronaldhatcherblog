'use server'
import fs, { writeFileSync } from 'fs'
import unzipper from 'unzipper'
import { mergeRocket, removeRocket } from './neo4j'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadImage } from './cloudinary'
import { join } from 'path'
import { processOrkFile } from './openrocket'

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
  const orkFile: File | null = formData.get('ork') as unknown as File
  const rocketId: string = formData.get('rid') as string

  const orkPath = join('/', 'tmp', orkFile.name)
  const xmlPath = join('/', 'tmp', rocketId + '.xml')

  const bytes = await orkFile.arrayBuffer()
  const buffer = Buffer.from(bytes)

  writeFileSync(orkPath, buffer)

  fs.createReadStream(orkPath)
    .pipe(unzipper.Parse())
    .on('entry', function (entry) {
      const fileName = entry.path
      // const type = entry.type // 'Directory' or 'File'
      // const size = entry.vars.uncompressedSize // There is also compressedSize;
      if (fileName === 'rocket.ork') {
        entry.pipe(fs.createWriteStream(xmlPath))
      } else {
        entry.autodrain()
      }
    })

  await processOrkFile(xmlPath)

  revalidatePath(`/dashboard/designs/${rocketId}`)
  redirect(`/dashboard/designs/${rocketId}`)
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
