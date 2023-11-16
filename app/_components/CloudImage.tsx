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
      sizes='(min-width: 60em) 24vw,
      (min-width: 28em) 45vw,
      100vw'
      alt='Description of my image'
      className={className}
    />
  )

  return zoom
    ? (
      <Link href={`/images/${image}`}>{theImage}</Link>
      )
    : (
        theImage
      )
}
