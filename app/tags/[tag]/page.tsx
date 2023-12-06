import TopNav from '@/app/components/TopNav'
import { getBuildsMeta } from '@/lib/builds'
import { getPostsMeta } from '@/lib/posts'
import { getProjectsMeta } from '@/lib/projects'
import Link from 'next/link'
import React from 'react'

interface Props {
  params: {
    tag: string
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
      <div>
        {refs.map((detail, index) => (
          <div key={index} className='mb-3'>
            <Link href={`/${detail.type}/${detail.slug}`}>
              {detail.type}: {detail.slug}
            </Link>
          </div>
        ))}
      </div>
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
