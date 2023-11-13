'use client'
import { CldImage } from 'next-cloudinary'
import { useRouter } from 'next/navigation'

interface Props {
  params: {
    publicId: string[]
  }
}

export default function ImagePage ({
  params: { publicId }
}: Props): React.JSX.Element {
  const publicIdString = publicId.join('/')
  const router = useRouter()

  const handleImageClick = (): void => {
    router.back()
  }

  return (
    <div className='container mx-auto px-5'>
      <div className='bg-gray-100 rounded-2xl py-4 sm:pt-4'>
        <CldImage
          width='600'
          height='600'
          sizes='100vw'
          src={publicIdString}
          alt='Description of my image'
          className='object-cover object-center px-2'
          onClick={handleImageClick}
        />
      </div>
    </div>
  )
}
