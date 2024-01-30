'use client'
import React, { useEffect, useState } from 'react'
import ImageFull from '@/app/ui/ImageFull'
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

  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Ensure window is available (client-side)
    if (typeof window !== 'undefined') {
      // Function to update screen size
      const handleResize = (): void => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }

      // Set initial size
      handleResize()

      // Add event listener
      window.addEventListener('resize', handleResize)

      // Remove event listener on cleanup
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  const handleImageClick = (): void => {
    router.back()
  }

  return (
    <div className='h-screen w-screen' onClick={handleImageClick}>
      <ImageFull
        src={publicIdString}
        crop='fill'
        alt='Description of my image'
        width={screenSize.width}
        height={screenSize.height}
      />
    </div>
  )
}
