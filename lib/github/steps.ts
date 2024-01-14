import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import Video from '@/app/ui/Video'
import CloudImage from '@/app/ui/CloudImage'
import Gallery from '@/app/ui/Gallery'

interface gitFile {
  name: string
  path: string
}

const type: string = 'steps'

export async function getStepByName (
  build: string,
  fileName: string
): Promise<Step | undefined> {
  const res = await fetch(
    `https://raw.githubusercontent.com/rlhatcher/blog_content/main/builds/${build}/${fileName}`,
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
    date: string
    image: string
    tags: string[]
    description: string
    weight: number
  }>({
    source: rawMDX,
    components: {
      Video,
      CloudImage,
      Gallery
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [[remarkGfm]],
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

  const slug = fileName.replace(/\.mdx$/, '')

  const StepObj: Step = {
    meta: {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      image: frontmatter.image,
      tags: frontmatter.tags,
      description: frontmatter.description,
      weight: frontmatter.weight,
      type
    },
    content
  }

  return StepObj
}

export async function getStepsMeta (
  build: string
): Promise<Step[] | undefined> {
  const res = await fetch(
    `https://api.github.com/repos/rlhatcher/blog_content/contents/builds/${build}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  )

  if (!res.ok) return undefined

  const repoFiletree: gitFile[] = await res.json()

  const filesArray = repoFiletree
    .map((obj) => obj.name)
    .filter((name) => name.endsWith('.mdx'))

  const steps: Step[] = []

  for (const file of filesArray) {
    const step = await getStepByName(build, file)
    if (step != null) {
      steps.push(step)
    }
  }

  return steps.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1))
}
