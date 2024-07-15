import { notFound, redirect } from 'next/navigation'

import { getBuildByName } from '@/lib/github/builds'
import { getStepsMeta } from '@/lib/github/steps'

interface Props {
  params: {
    slug: string
  }
}

export default async function BuildPage({
  params: { slug },
}: Props): Promise<void> {
  const build = await getBuildByName(`${slug}.mdx`)
  const steps: Step[] = await getStepsMeta(slug)

  if (build == null) notFound()

  redirect(`/builds/${slug}/${steps[0].meta.slug}`)
}
