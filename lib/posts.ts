import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import Video from '@/app/_components/Video'

interface gitFile {
  name: string
  path: string
}

export async function getPostByName (
  fileName: string
): Promise<BlogPost | undefined> {
  const res = await fetch(
    `https://raw.githubusercontent.com/rlhatcher/rlhblog-content/main/posts/${fileName}`,
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
  }>({
    source: rawMDX,
    components: {
      Video
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

  const slug = fileName.replace(/\.mdx$/, '')

  const BlogPostObj: BlogPost = {
    meta: {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      image: frontmatter.image,
      tags: frontmatter.tags,
      description: '',
      weight: 0
    },
    content
  }

  return BlogPostObj
}

export async function getPostsMeta (): Promise<BlogPost[] | undefined> {
  const res = await fetch(
    'https://api.github.com/repos/rlhatcher/rlhblog-content/contents/posts',
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

  const posts: BlogPost[] = []

  for (const file of filesArray) {
    const post = await getPostByName(file)
    if (post != null) {
      posts.push(post)
    }
  }

  return posts.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1))
}
