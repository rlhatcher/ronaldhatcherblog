'use client'
import Link from 'next/link'
import { CldImage as NextCldImage, type CldImageProps } from 'next-cloudinary'
import React from 'react'

export const CloudImage = (props: CldImageProps): React.JSX.Element => {
  return <NextCldImage {...props} />
}

export const BlogImage = (props: CldImageProps): React.JSX.Element => {
  return (
    <Link href={`/images/${props.src}`}>
      <NextCldImage
        sizes="(min-width: 480px ) 50vw, (min-width: 728px) 33vw, (min-width: 976px) 25vw, 100vw"
        height={400}
        width={600}
        crop="thumb"
        {...props}
      />
    </Link>
  )
}
