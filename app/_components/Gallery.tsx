import cloudinary from '@/lib/cloudinary'

import React from 'react'
import GalleryItem from './GalleryItem'

interface GalleryProps {
  tags: string[]
}

export default async function Gallery ({
  tags
}: GalleryProps): Promise<React.JSX.Element | never[]> {
  const res = await cloudinary.v2.search
    .expression(tags.join(' AND '))
    .with_field('tags')
    .sort_by('public_id', 'desc')
    .max_results(400)
    .execute()
  const assets: string[] = []
  for (const result of res.resources) {
    assets.push(result.public_id)
  }

  return (
    <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8'>
        {assets.map((asset) => (
          <GalleryItem publicid={asset} key={asset} />
        ))}
      </div>
    </div>
  )
}
