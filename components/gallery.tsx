import React from 'react'

import { TileImage } from './cloud-image'

import { getImagesByTag } from '@/lib/cloudinary'

interface TagGalleryProps {
  tags: string[]
}

export async function TagGallery({
  tags,
}: TagGalleryProps): Promise<JSX.Element> {
  const images = await getImagesByTag(tags)

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="flex-shrink-0 flex-grow basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
        >
          <TileImage
            src={image}
            alt="gallery"
          />
        </div>
      ))}
    </div>
  )
}
