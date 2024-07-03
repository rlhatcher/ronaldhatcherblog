const owner: string = process.env.GITHUB_OWNER ?? 'rlhatcher'
const repo: string = process.env.GITHUB_REPO ?? 'rocketry-files'
const branch: string = process.env.GITHUB_BRANCH ?? 'main'

export async function getFileByPath(filePath: string): Promise<Blob> {
  const res = await fetch(
    `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
      next: { revalidate: 600 },
    }
  )
  if (!res.ok) {
    throw new Error('Failed to fetch file')
  }

  const blob = await res.blob()
  return blob
}
