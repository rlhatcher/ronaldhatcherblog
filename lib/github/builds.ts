import matter from 'gray-matter'

interface gitFile {
  name: string
  path: string
}

const owner: string = process.env.GITHUB_OWNER ?? 'rlhatcher'
const repo: string = process.env.GITHUB_REPO ?? 'blog_content'
const branch: string = process.env.GITHUB_BRANCH ?? 'main'
const type: string = 'builds'

export async function getBuild(slug: string): Promise<Build | undefined> {
  const res = await fetch(
    `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${type}/${slug}.mdx`,
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

  const { data, content } = matter(rawMDX)

  return {
    meta: {
      ...data,
      slug,
      type,
      project: data.project ?? '',
    },
    content,
  }
}

export async function getBuildSlugs(): Promise<string[]> {
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

  const slugs: string[] = repoFiletree
    .map(obj => obj.name)
    .filter(name => name.endsWith('.mdx'))
    .map(name => name.replace(/\.mdx$/, ''))
  return slugs
}

export async function getBuilds(): Promise<Build[]> {
  const slugs = await getBuildSlugs()
  const builds: Build[] = []

  for (const slug of slugs) {
    const build = await getBuild(slug)
    if (build != null) {
      builds.push(build)
    }
  }

  return builds
}
