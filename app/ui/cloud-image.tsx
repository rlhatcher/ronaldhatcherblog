'use client'
import { CldImage as NextCldImage, type CldImageProps } from 'next-cloudinary'

const CloudImage = (props: CldImageProps): React.JSX.Element => {
  return <NextCldImage {...props} />
}

export default CloudImage
