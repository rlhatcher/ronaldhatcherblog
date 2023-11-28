import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

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

export async function getBucketFiles (): Promise<PublishedDoc[] | undefined> {
  const command = new ListObjectsV2Command({ Bucket: bucketName })
  const data = await s3Client.send(command)

  const filesList = data.Contents?.map((file) => {
    if (file.Key == null) {
      return null
    }
    const key = file.Key
    const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`
    const name = key?.split('/')[1]
    const date = file.LastModified ?? new Date('1999-06-23')
    const size = file.Size ?? 0
    const doc: PublishedDoc = { key, url, name, date, size }
    return doc
  }).filter((doc): doc is PublishedDoc => doc != null)

  return filesList
}
