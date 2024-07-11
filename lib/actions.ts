'use server'
import { mergeDesign } from '@/lib/neo4j'

export async function orkUpload(fileUrl: string): Promise<Design> {
  const url = 'https://api.rocketclub.online/openrocket/orktojson'

  try {
    const fileResponse = await fetch(fileUrl)
    if (!fileResponse.ok) {
      throw new Error('Failed to fetch the file from the provided URL')
    }
    const fileBlob = await fileResponse.blob()

    const formData = new FormData()
    formData.append('file', fileBlob, 'uploaded.ork')

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const data: Design = await response.json()
      await mergeDesign(data)
      return data
    } else {
      console.error('Failed to upload design:', response.statusText)
      throw new Error('Failed to upload design')
    }
  } catch (error) {
    console.error('Error during fetch operation:', error)
    throw error
  }
}
