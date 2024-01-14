'use client'
import React from 'react'
import Link from 'next/link'
import CloudImage from '@/app/ui/CloudImage'

export default function GalleryItem ({
  publicId
}: {
  publicId: string
}): React.JSX.Element {
  return (
    <Link href={`/images/${publicId}`}>
      <CloudImage image={publicId} alt='Description of my image' crop='auto'/>
    </Link>
  )
}
