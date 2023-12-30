import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import Video from '@/app/components/Video'
import CloudImage from '@/app/components/CloudImage'
import Gallery from '@/app/components/Gallery'
import remarkToc from 'remark-toc'

interface gitFile {
  name: string
  path: string
}

const type: string = 'projects'

export async function getProjectByName (
  fileName: string
): Promise<Project | undefined> {
  const res = await fetch(
    `https://raw.githubusercontent.com/rlhatcher/rlhblog-content/main/${type}/${fileName}`,
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
        remarkPlugins: [
          remarkGfm,
          [
            remarkToc,
            {
              tight: true,
              heading: 'Contents'
            }
          ]
        ],
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

  const ProjectObj: Project = {
    meta: {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      image: frontmatter.image,
      tags: frontmatter.tags,
      description: frontmatter.description,
      type
    },
    content
  }

  return ProjectObj
}

export async function getProjectsMeta (): Promise<Project[]> {
  const res = await fetch(
    'https://api.github.com/repos/rlhatcher/rlhblog-content/contents/projects',
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

  const projects: Project[] = []

  for (const file of filesArray) {
    const project = await getProjectByName(file)
    if (project != null) {
      projects.push(project)
    }
  }

  return projects.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1))
}
