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
    <Link href={`/images/${imageMeta.publicId}`}>
      <CloudImage image={imageMeta.publicId} alt='Description of my image' crop='auto'/>
    </Link>
  )
}
