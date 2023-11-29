import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import { type Readable } from 'stream'

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: accessKeyId ?? '',
    secretAccessKey: secretAccessKey ?? ''
  }
})

async function streamToBuffer (stream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = []
  for await (const chunk of stream) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export async function getFileString (objectKey: string): Promise<string> {
  const getObjectParams = {
    Bucket: bucketName,
    Key: objectKey
  }

  const command = new GetObjectCommand(getObjectParams)
  const response = await s3Client.send(command)

  const pdfBuffer = await streamToBuffer(response.Body as Readable)
  const pdfBase64 = pdfBuffer.toString('base64')

  // Prepend the necessary prefix for a data URL of a PDF
  return `data:application/pdf;base64,${pdfBase64}`
}

export async function getBucketFiles (): Promise<PublishedDoc[] | undefined> {
  const command = new ListObjectsV2Command({ Bucket: bucketName })
  const data = await s3Client.send(command)

  const filesList = data.Contents?.map((file) => {
    if (file.Key == null) {
      return null
    }
    const objectKey = file.Key
    const url = `https://${bucketName}.s3.${region}.amazonaws.com/${objectKey}`
    const date = file.LastModified ?? new Date('1999-06-23')
    const size = file.Size ?? 0
    const doc: PublishedDoc = { objectKey, url, date, size }
    return doc
  }).filter((doc): doc is PublishedDoc => doc != null)

  return filesList
}
