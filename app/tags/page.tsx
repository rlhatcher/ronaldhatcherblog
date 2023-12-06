import { getBuildsMeta } from '@/lib/builds'
import { getPostsMeta } from '@/lib/posts'
import { getProjectsMeta } from '@/lib/projects'
import Tags from '@/app/components/Tags'
import TopNav from '@/app/components/TopNav'

export default async function TagsPage (): Promise<React.JSX.Element | never[]> {
  const links: BreadCrumb[] = []
  const tags = await getAllTags()

  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: 'Tags' }} />
      <div className='bg-gray-100 rounded-2xl p-4'>
        <section>
          <Tags tags={tags} />
        </section>
      </div>
    </div>
  )
}

async function getAllTags (): Promise<TagObject[]> {
  const posts = await getPostsMeta()
  const projects = await getProjectsMeta()
  const builds = await getBuildsMeta()

  const allMeta: Meta[] = [
    ...posts.map((post) => post.meta),
    ...projects.map((project) => project.meta),
    ...builds.map((build) => build.meta)
  ]

  const tagCounts = new Map<string, number>()

  allMeta.forEach((meta) => {
    meta.tags.forEach((tag) => {
      if (tagCounts.has(tag)) {
        tagCounts.set(tag, (tagCounts.get(tag) as number) + 1)
      } else {
        tagCounts.set(tag, 1)
      }
    })
  })
  return Array.from(tagCounts.entries()).map(([tag, count]) => ({
    value: tag,
    count
  }))
}
