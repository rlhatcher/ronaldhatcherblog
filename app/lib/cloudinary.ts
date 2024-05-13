import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export default cloudinary

export async function getMetaByPublicId(publicId: string): Promise<ImageMeta> {
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/ronaldhatcher/resources/image/upload/${publicId}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization:
          'Basic ' +
          Buffer.from(
            process.env.CLOUDINARY_API_KEY +
              ':' +
              process.env.CLOUDINARY_API_SECRET
          ).toString('base64'),
      },
    }
  )

  const data = await res.json()
  const imageMeta: ImageMeta = {
    assetId: data.asset_id,
    publicId: data.public_id,
    format: data.format,
    bytes: data.bytes,
    width: data.width,
    height: data.height,
    url: data.url,
  }

  return imageMeta
}

export async function getImagesByTag(tags: string[]): Promise<string[]> {
  const res = await cloudinary.v2.search
    .expression(tags.join(' AND '))
    .with_field('tags')
    .sort_by('public_id', 'desc')
    .max_results(400)
    .execute()
  const assets: string[] = []
  for (const result of res.resources) {
    assets.push(result.public_id as string)
  }
  return assets
}

export async function uploadImage(
  imageFile: File,
  options: cloudinary.UploadApiOptions | undefined
): Promise<any> {
  const arrayBuffer = await imageFile.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)
  return await new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream(options, (error: any, result: any) => {
        if (error != null && error !== undefined) {
          reject(error)
        } else {
          resolve(result)
        }
      })
      .end(buffer)
  })
}
