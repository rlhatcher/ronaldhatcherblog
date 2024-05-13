import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import Video from '@/app/ui/images/Video'
import CloudImage from '@/app/ui/images/CloudImage'
import Gallery from '@/app/ui/images/Gallery'

interface gitFile {
  name: string
  path: string
}

const type: string = 'posts'

export async function getPostByName (
  fileName: string
): Promise<BlogPost | undefined> {
  const res = await fetch(
    `https://raw.githubusercontent.com/rlhatcher/blog_content/main/${type}/${fileName}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
      },
      next: { revalidate: 600 }
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
    project: string
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

  const BlogPostObj: BlogPost = {
    meta: {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      image: frontmatter.image,
      tags: frontmatter.tags,
      description: frontmatter.description,
      project: frontmatter.project,
      type
    },
    content
  }

  return BlogPostObj
}

export async function getPostsMeta (): Promise<BlogPost[]> {
  const res = await fetch(
    'https://api.github.com/repos/rlhatcher/blog_content/contents/posts',
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
      },
      next: { revalidate: 600 }
    }
  )

  if (!res.ok) return []

  const repoFiletree: gitFile[] = await res.json()

  const filesArray = repoFiletree
    .map((obj) => obj.name)
    .filter((name) => name.endsWith('.mdx'))

  const posts: BlogPost[] = []

  for (const file of filesArray) {
    const post = await getPostByName(file)
    if (post != null) {
      posts.push(post)
    }
  }

  return posts.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1))
}
