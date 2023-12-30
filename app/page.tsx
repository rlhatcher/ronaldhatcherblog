import PostsSection from './components/posts-section'
import FeatureSection from './components/FeatureSection'
import React from 'react'
import { MdOutlineManageAccounts } from 'react-icons/md'
import Link from 'next/link'

export const revalidate = 10

function Intro (): JSX.Element {
  return (
    <section className='flex-col md:flex-row flex font-mono items-center md:justify-between mt-2 mb-4 md:mb-4'>
      <h1 className='text-3xl md:text-3xl font-bold flex-grow tracking-tighter leading-tight md:pr-8'>
        Ronald Hatcher.
      </h1>
      <h2 className='text-center md:text-left text-xl mt-2 md:pl-8'>
        Personal notes and projects.
      </h2>
      <Link href={'/dashboard'}>
        <MdOutlineManageAccounts className='text-2xl ml-2' />
      </Link>
    </section>
  )
}

export default async function Page (): Promise<JSX.Element> {
  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <Intro />
      <FeatureSection />
      <PostsSection limit={3} />
    </div>
  )
}
