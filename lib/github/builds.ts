import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'

import SimTabs from '@/components/blog/simulations'
import { BlogGallery, BlogImage } from '@/components/cloud-image'
import Video from '@/components/Video'

interface gitFile {
  name: string
  path: string
}

const owner: string = process.env.GITHUB_OWNER ?? 'rlhatcher'
const repo: string = process.env.GITHUB_REPO ?? 'blog_content'
const branch: string = process.env.GITHUB_BRANCH ?? 'main'
const type: string = 'builds'

export async function getBuildByName(
  fileName: string
): Promise<Build | undefined> {
  const res = await fetch(
    `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${type}/${fileName}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  )
  if (!res.ok) return undefined

  const rawMDX = await res.text()

  if (rawMDX === '404: Not Found') return undefined

  const { frontmatter, content } = await compileMDX<BuildMeta>({
    source: rawMDX,
    components: {
      Video,
      BlogImage,
      BlogGallery,
      SimTabs,
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
              heading: 'Contents',
            },
          ],
        ],
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'prepend',
            },
          ],
        ],
      },
    },
  })

  const slug = fileName.replace(/\.mdx$/, '')

  const BuildObj: Build = {
    meta: {
      ...frontmatter,
      slug,
      type,
    },
    content,
  }

  return BuildObj
}

export async function getBuildsMeta(): Promise<Build[]> {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${type}?ref=${branch}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  )

  if (!res.ok) return []

  const repoFiletree: gitFile[] = await res.json()

  const filesArray = repoFiletree
    .map(obj => obj.name)
    .filter(name => name.endsWith('.mdx'))

  const builds: Build[] = []

  for (const file of filesArray) {
    const build = await getBuildByName(file)
    if (build != null) {
      builds.push(build)
    }
  }

  return builds.sort((a, b) => {
    const dateA = a.meta.date ?? new Date(0)
    const dateB = b.meta.date ?? new Date(0)
    return dateA < dateB ? 1 : -1
  })
}
