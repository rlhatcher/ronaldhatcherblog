'use client'
import { CldImage } from 'next-cloudinary'

interface ImageFullProps {
  alt: string
  src: string
  height?: number
  width?: number
  crop?:
  | 'crop'
  | 'fill'
  | 'lfill'
  | 'fill_pad'
  | 'thumb'
  | 'scale'
  | 'fit'
  | 'limit'
  | 'mfit'
  | 'pad'
  | 'lpad'
  | 'mpad'
  | 'imagga_scale'
  | 'imagga_crop'
}

export default function ImageFull ({
  ...props
}: ImageFullProps): React.JSX.Element {
  return (
    <CldImage
      overlays={[
        {
          publicId: 'logo',
          position: {
            x: 10,
            y: 10,
            gravity: 'south_east'
          },
          effects: [
            {
              height: 75,
              width: 75
            }
          ],
          appliedEffects: [
            {
              overlay: true
            }
          ]
        }
      ]}
      {...props}
    />
  )
}
