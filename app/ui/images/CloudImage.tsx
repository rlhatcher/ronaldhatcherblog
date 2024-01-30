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
  zoom = true,
  height = 400,
  width = 600,
  crop = 'thumb'
}: {
  title?: string
  image: string
  slug?: string
  className?: string | undefined
  alt?: string
  zoom?: boolean
  height?: number
  width?: number
  crop?: string
}): React.JSX.Element {
  const theImage = (
    <CldImage
      height={height}
      width={width}
      crop={crop}
      gravity='faces:auto'
      src={image}
      sizes='(min-width: 480px ) 50vw,
      (min-width: 728px) 33vw,
      (min-width: 976px) 25vw,
      100vw'
      alt='Description of my image'
      className={className}
    />
  )

  return zoom ? <Link href={`/images/${image}`}>{theImage}</Link> : theImage
}
