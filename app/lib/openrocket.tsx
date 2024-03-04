import fs from 'fs/promises'

export async function processOrkFile (filePath: string): Promise<string> {
  try {
    const xmlData = await fs.readFile(filePath, 'utf8')
    console.log(xmlData)

    const res = await fetch('/api/rest/ork', {
      headers: {
        'Content-Type': 'application/xml'
      },
      method: 'POST',
      body: xmlData
    })

    return JSON.stringify(res, null, 4)
  } catch (error) {
    console.error('Error processing the XML file:', error)
    return '{}'
  }
}
