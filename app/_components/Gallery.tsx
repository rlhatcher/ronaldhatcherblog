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
    <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8'>
        {metas.map((meta) => (
          <GalleryItem imageMeta={meta} key={meta.assetId} />
        ))}
      </div>
    </div>
  )
}
