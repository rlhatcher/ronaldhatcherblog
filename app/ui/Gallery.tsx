import { getImagesByTag, getMetaByPublicId } from '@/lib/cloudinary'

import React from 'react'
import GalleryItem from './GalleryItem'
interface GalleryProps {
  tags: string[]
}

export default async function Gallery ({
  tags
}: GalleryProps): Promise<React.JSX.Element | never[]> {
  const assets: string[] = await getImagesByTag(tags)
  const metas: ImageMeta[] = []

  for (const asset of assets) {
    const meta = await getMetaByPublicId(asset)
    metas.push(meta)
  }

  return (
    <div className='mx-auto max-w-full px-2 md:px-4'>
        {metas.map((meta) => (
          <GalleryItem publicId={meta.publicId} key={meta.publicId} />
        ))}
    </div>
  )
}
