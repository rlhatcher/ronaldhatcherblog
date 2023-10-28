import cloudinary from '@/lib/cloudinary'

import React from 'react'
import GalleryItem from './GalleryItem'

interface GalleryProps {
  folder: string
}

export default async function Gallery ({
  folder
}: GalleryProps): Promise<React.JSX.Element | never[]> {
  const res = await cloudinary.v2.search
    .expression(`folder:${folder}/*`)
    .sort_by('public_id', 'desc')
    .max_results(400)
    .execute()
  const assets: string[] = []
  for (const result of res.resources) {
    assets.push(result.public_id)
  }

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8'>
        <h2 className='sr-only'>Gallery</h2>

        <div className='-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4'>
          {assets.map((asset) => (
            <GalleryItem publicid={asset} key={asset} />
          ))}
        </div>
      </div>
    </div>
  )
}
