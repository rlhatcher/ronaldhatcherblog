import matter from 'gray-matter'

interface gitFile {
  name: string
  path: string
}

const owner: string = process.env.GITHUB_OWNER ?? 'rlhatcher'
const repo: string = process.env.GITHUB_REPO ?? 'blog_content'
const branch: string = process.env.GITHUB_BRANCH ?? 'main'
const type: string = 'steps'

export async function getStep(
  build: string,
  slug: string
): Promise<Step | undefined> {
  const res = await fetch(
    `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/builds/${build}/${slug}.mdx`,
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
      weight: data.weight ?? 0,
      slug,
      type,
    },
    content,
  }
}

export async function getStepSlugs(build: string): Promise<string[]> {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/builds/${build}?ref=${branch}`,
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
    .map(name => name.replace(/\.mdx$/, ''))

  return filesArray
}

export async function getSteps(build: string): Promise<Step[]> {
  const slugs = await getStepSlugs(build)
  const steps: Step[] = []

  for (const slug of slugs) {
    const step = await getStep(build, slug)
    if (step != null) {
      steps.push(step)
    }
  }

  return steps.sort((a, b) => (a.meta.weight < b.meta.weight ? -1 : 1))
}
