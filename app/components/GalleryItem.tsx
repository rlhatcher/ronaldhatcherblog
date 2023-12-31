'use client'
import React from 'react'
import Link from 'next/link'
import CloudImage from './CloudImage'

export default function GalleryItem ({
  imageMeta
}: {
  imageMeta: ImageMeta
}): React.JSX.Element {
  return (
    <Link
      href={`/images/${imageMeta.publicId}`}
      className='relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80'
    >
      <CloudImage
        image={imageMeta.publicId}
        alt='Description of my image'
        className='absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110'
        height={600}
      />
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50'></div>
    </Link>
  )
}
