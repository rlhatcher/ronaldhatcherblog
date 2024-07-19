import { notFound, redirect } from 'next/navigation'

import { getSteps } from '@/lib/github/steps'

interface Props {
  params: {
    slug: string
  }
}

export default async function BuildPage({
  params: { slug },
}: Props): Promise<void> {
  const steps: Step[] = await getSteps(slug)

  if (steps[0] == null) notFound()

  redirect(`/builds/${slug}/${steps[0].meta.slug}`)
}
