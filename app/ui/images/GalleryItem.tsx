import Link from 'next/link'
import React from 'react'

import CloudImage from './CloudImage'

interface GalleryItemProps {
  publicId: string
}

const GalleryItem: React.FC<GalleryItemProps> = ({ publicId }) => {
  return (
    <Link href={`/images/${publicId}`}>
      <CloudImage
        image={publicId}
        alt="Description of my image"
        crop="scale"
      />
    </Link>
  )
}

export default GalleryItem
