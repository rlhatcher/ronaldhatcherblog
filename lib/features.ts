import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import Video from '@/app/_components/Video'
import CoverImage from '@/app/_components/cover-image'

interface gitFile {
  name: string
  path: string
}

export async function getFeatureByName (
  fileName: string
): Promise<Feature | undefined> {
  const res = await fetch(
    `https://raw.githubusercontent.com/rlhatcher/rlhblog-content/main/${fileName}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  )
  if (!res.ok) return undefined

  const rawMDX = await res.text()

  if (rawMDX === '404: Not Found') return undefined

  const { frontmatter, content } = await compileMDX<{
    title: string
    icon: string
  }>({
    source: rawMDX,
    components: {
      Video,
      CoverImage
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          // @ts-expect-error not sure
          rehypeHighlight,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'prepend'
            }
          ]
        ]
      }
    }
  })

  const FeatureObj: Feature = {
    title: frontmatter.title,
    name: fileName.replace(/\.mdx$/, ''),
    icon: frontmatter.icon,
    content
  }

  return FeatureObj
}

export async function getFeaturesMeta (): Promise<Feature[]> {
  const res = await fetch(
    'https://api.github.com/repos/rlhatcher/rlhblog-content/contents',
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  )

  if (!res.ok) return []

  const repoFiletree: gitFile[] = await res.json()

  const filesArray = repoFiletree
    .map((obj) => obj.name)
    .filter((name) => name.endsWith('.mdx'))

  const features: Feature[] = []

  for (const file of filesArray) {
    const feature = await getFeatureByName(file)
    if (feature != null) {
      features.push(feature)
    }
  }

  return features.sort((a, b) => (a.name < b.name ? 1 : -1))
}
