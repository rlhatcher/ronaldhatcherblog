import PostsSection from './_components/posts-section'
import FeatureSection from './_components/FeatureSection'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/server'
import React from 'react'
import { MdOutlineManageAccounts } from 'react-icons/md'

export const revalidate = 10

function Intro (): JSX.Element {
  return (
    <section className='flex-col md:flex-row flex font-mono items-center md:justify-between mt-2 mb-4 md:mb-4'>
      <h1 className='text-3xl md:text-3xl font-bold tracking-tighter leading-tight md:pr-8'>
        Ronald Hatcher.
      </h1>
      <h2 className='text-center md:text-left text-xl mt-2 md:pl-8'>
        Personal notes and projects.<LoginLink><MdOutlineManageAccounts /></LoginLink>
      </h2>
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
