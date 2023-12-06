import TopNav from '@/app/components/TopNav'
import TypeIcon from '@/app/components/TypeIcon'
import { getBuildsMeta } from '@/lib/builds'
import { getPostsMeta } from '@/lib/posts'
import { getProjectsMeta } from '@/lib/projects'
import { getAllTags } from '@/lib/tags'
import Link from 'next/link'
import React from 'react'

interface Props {
  params: {
    tag: string
  }
}

export async function generateStaticParams (): Promise<Array<{ tag: string }>> {
  const allTags = await getAllTags()

  return allTags.map((tag) => ({
    tag: tag.value
  }))
}

export async function generateMetadata ({
  params: { tag }
}: Props): Promise<{ title: string }> {
  return {
    title: `tag[${tag}]`
  }
}

export default async function TagPage ({
  params: { tag }
}: Props): Promise<React.JSX.Element> {
  const refs = await getTagRefs(tag)

  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav
        links={[{ href: '/tags', label: 'Tags' }]}
        page={{ title: `tag[${tag}]` }}
      />
      <ul
        role='list'
        className='mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 w-2/3 mx-auto'
      >
        {refs.map((detail, index) => (
          <li
            key={`/${detail.type}/${detail.slug}`}
            className='col-span-1 flex rounded-md shadow-sm bg-slate-50'
          >
            <div
              className={
                'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium bg-slate-100 text-slate-800'
              }
            >
              <TypeIcon type={detail.type} />
            </div>
            <div className='flex-1 truncate px-4 py-2 text-sm'>
              <Link
                href={`/${detail.type}/${detail.slug}`}
                className='font-medium text-gray-900 hover:text-gray-600'
              >
                {detail.slug}
              </Link>
              {/* <p className="text-gray-500">{project.members} Members</p> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

async function getTagRefs (
  tagToFilter: string
): Promise<Array<{ type: string, slug: string }>> {
  const posts = await getPostsMeta()
  const projects = await getProjectsMeta()
  const builds = await getBuildsMeta()

  const allMeta: Meta[] = [
    ...posts.map((post) => post.meta),
    ...projects.map((project) => project.meta),
    ...builds.map((build) => build.meta)
  ]

  const tagDetails: Array<{ type: string, slug: string }> = []

  allMeta.forEach((meta) => {
    if (meta.tags.includes(tagToFilter)) {
      tagDetails.push({ type: meta.type, slug: meta.slug })
    }
  })

  return tagDetails
}
