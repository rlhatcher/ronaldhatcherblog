import matter from 'gray-matter'

interface gitFile {
  name: string
  path: string
}

const owner: string = process.env.GITHUB_OWNER ?? 'rlhatcher'
const repo: string = process.env.GITHUB_REPO ?? 'blog_content'
const branch: string = process.env.GITHUB_BRANCH ?? 'main'
const type: string = 'projects'

export async function getProjectRefs(slug: string): Promise<string[]> {
  const repoPath = `https:/raw.githubusercontent.com/${owner}/${repo}/${branch}/${type}/${slug}.bib`
  const res = await fetch(repoPath, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
    next: { revalidate: 600 },
  })

  return res.ok ? [repoPath] : []
}

export async function getProject(slug: string): Promise<Project | undefined> {
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
    },
    content,
  }
}

export async function getProjectSlugs(): Promise<string[]> {
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

  const slugs = repoFiletree
    .map(obj => obj.name)
    .filter(name => name.endsWith('.mdx'))
    .map(name => name.replace(/\.mdx$/, ''))

  return slugs
}

export async function getProjects(): Promise<Project[]> {
  const slugs = await getProjectSlugs()
  const projects: Project[] = []

  for (const slug of slugs) {
    const project = await getProject(slug)
    if (project != null) {
      projects.push(project)
    }
  }

  return projects
}
