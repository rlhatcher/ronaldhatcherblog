export async function orkUpload(fileUrl: string): Promise<Design> {
  const url = 'https://api.rocketclub.online/openrocket/orktojson'

  try {
    // Create a FormData object and append the file URL as a string
    const formData = new FormData()
    formData.append('file', fileUrl)

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const data: Design = await response.json()
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
