import fs from 'fs/promises'

export async function processOrkFile (filePath: string): Promise<string> {
  try {
    const xmlData = await fs.readFile(filePath, 'utf8')
    console.log(xmlData)

    const result = fetch('/api/ork', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml'
      },
      body: xmlData
    })
      .then(async response => await response.json())

    return (JSON.stringify(result, null, 4))
  } catch (error) {
    console.error('Error processing the XML file:', error)
    return '{}'
  }
}
