import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import Video from '@/app/ui/images/Video'
import { BlogImage } from '@/components/cloud-image'

interface gitFile {
  name: string
  path: string
}

const owner: string = process.env.GITHUB_OWNER ?? 'rlhatcher'
const repo: string = process.env.GITHUB_REPO ?? 'blog_content'
const branch: string = process.env.GITHUB_BRANCH ?? 'main'
const type: string = 'posts'

export async function getPostByName(
  fileName: string
): Promise<BlogPost | undefined> {
  const res = await fetch(
    `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${type}/${fileName}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
      next: { revalidate: 600 },
    }
  )
  if (!res.ok) return undefined

  const rawMDX = await res.text()

  if (rawMDX === '404: Not Found') return undefined

  const { frontmatter, content } = await compileMDX<BlogPostMeta>({
    source: rawMDX,
    components: {
      Video,
      BlogImage,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [[remarkGfm]],
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

  const BlogPostObj: BlogPost = {
    meta: {
      ...frontmatter,
      slug,
      type,
    },
    content,
  }

  return BlogPostObj
}

export async function getPostsMeta(): Promise<BlogPost[]> {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${type}?ref=${branch}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
      next: { revalidate: 600 },
    }
  )

  if (!res.ok) return []

  const repoFiletree: gitFile[] = await res.json()

  const filesArray = repoFiletree
    .map(obj => obj.name)
    .filter(name => name.endsWith('.mdx'))

  const posts: BlogPost[] = []

  for (const file of filesArray) {
    const post = await getPostByName(file)
    if (post != null) {
      posts.push(post)
    }
  }

  return posts.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1))
}
