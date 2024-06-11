'use client'
import Link from 'next/link'
import { CldImage as NextCldImage, type CldImageProps } from 'next-cloudinary'
import React from 'react'

export const CloudImage = (props: CldImageProps): React.JSX.Element => {
  return <NextCldImage {...props} />
}

export const BlogImage = ({
  src,
  ...restProps
}: CldImageProps): React.JSX.Element => {
  return (
    <Link href={`/images/${src}`}>
      <NextCldImage
        sizes="(min-width: 480px ) 50vw, (min-width: 728px) 33vw, (min-width: 976px) 25vw, 100vw"
        height={400}
        width={600}
        crop="thumb"
        src={src}
        {...restProps}
      />
    </Link>
  )
}

interface BlogGalleryProps {
  images: CldImageProps[]
}

export const BlogGallery = ({
  images,
}: BlogGalleryProps): React.JSX.Element => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {images.map((imageProps, index) => (
        <BlogImage
          key={index}
          {...imageProps}
        />
      ))}
    </div>
  )
}
