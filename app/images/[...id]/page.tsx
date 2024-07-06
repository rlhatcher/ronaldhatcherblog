import React from 'react'

import { BlogImage } from '@/components/cloud-image'
import { getMetaByPublicId } from '@/lib/cloudinary'

// export const revalidate = 10

interface Props {
  params: {
    id: string[]
  }
}

export default async function Image({
  params: { id },
}: Props): Promise<React.JSX.Element> {
  const publicId = id.join('/')
  const meta = await getMetaByPublicId(publicId)

  return (
    <>
      <div className="container mx-auto sm:px-8 lg:px-10">
        <BlogImage
          src={publicId}
          width="800"
          height="600"
          alt="TBD"
          crop="fit"
        />
      </div>
      <div>{meta.assetId}</div>
    </>
  )
}
