'use client'
import TopNav from '@/app/_components/top-nav'
import { CldImage } from 'next-cloudinary'

interface Props {
  params: {
    publicId: string[]
  }
}

export default function ImagePage ({ params: { publicId } }: Props): React.JSX.Element {
  const publicIdString = publicId.join('/')

  return (
    <div className="container mx-auto px-5">
    <TopNav
      links={[
        { href: '/', label: 'Ω' },
        { href: '/posts', label: 'Posts' }
      ]}
      page={{ title: publicIdString }}
    />
    <article>
      <div className="bg-gray-100 rounded-2xl py-4 sm:pt-4">
      <CldImage
        width='1600'
        height='1600'
        sizes='100vw'
        src={publicIdString}
        alt='Description of my image'
        className='object-cover object-center px-2'
      />
    </div>
    </article>
    </div>
  )
}
