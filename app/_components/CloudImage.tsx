'use client'
import React from 'react'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'

export default function CloudImage ({
  title,
  image,
  slug,
  className,
  alt,
  zoom = true
}: {
  title?: string
  image: string
  slug?: string
  className?: string | undefined
  alt?: string
  zoom?: boolean
}): React.JSX.Element {
  const theImage = (
    <CldImage
      fill={true}
      src={image}
      sizes='100vw'
      alt='Description of my image'
      className={className}
    />
  )

  return zoom
    ? (
    <div>
      <Link href={`/images/${image}`}>{theImage}</Link>
    </div>
      )
    : (
        theImage
      )
}
