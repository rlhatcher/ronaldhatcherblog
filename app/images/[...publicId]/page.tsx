'use client'
import CloudImage from '@/app/components/CloudImage'
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
    <div
      className='h-screen w-screen absolute mx-auto px-5 bg-blue-100 rounded-2xl py-4 sm:pt-4'
      onClick={handleImageClick}
    >
      <CloudImage
        image={publicIdString}
        alt='Description of my image'
        className='object-contain object-center rounded-xl px-2'
      />
    </div>
  )
}
