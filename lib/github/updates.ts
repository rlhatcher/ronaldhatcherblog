import matter from 'gray-matter'

interface gitFile {
  name: string
  path: string
}

const owner: string = process.env.GITHUB_OWNER ?? 'rlhatcher'
const repo: string = process.env.GITHUB_REPO ?? 'blog_content'
const branch: string = process.env.GITHUB_BRANCH ?? 'main'
const type: string = 'updates'

/**
 * Retrieves an Update based on the provided slug.
 * @param slug - The slug of the update.
 * @returns A Promise that resolves to the retrieved Update, or undefined if not found.
 */
export async function getUpdate(slug: string): Promise<Update | undefined> {
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

/**
 * Retrieves the slugs of all update files from the GitHub repository.
 * @returns A promise that resolves to an array of slug strings
 */
export async function getUpdateSlugs(): Promise<string[]> {
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
    .map(name => name.replace(/\.mdx$/, ''))

  return filesArray
}

/**
 * Retrieves a list of all updates.
 * @returns A promise that resolves to an array of Updates.
 */
export async function getUpdates(): Promise<Update[]> {
  const slugs = await getUpdateSlugs()
  const updates: Update[] = []

  for (const slug of slugs) {
    const update = await getUpdate(slug)
    if (update != null) {
      updates.push(update)
    }
  }
  return updates.sort((a, b) => {
    if (a.meta.date != null && b.meta.date != null) {
      return b.meta.date.getTime() - a.meta.date.getTime()
    }
    return 0
  })
}
