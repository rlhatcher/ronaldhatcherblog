import { getBuildsMeta } from '@/app/lib/github/builds'
import { getPostsMeta } from '@/app/lib/github/posts'
import { getProjectsMeta } from '@/app/lib/github/projects'

export async function getAllTags (): Promise<TagObject[]> {
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
      const count = tagCounts.get(tag)
      if (count !== undefined) {
        tagCounts.set(tag, count + 1)
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
