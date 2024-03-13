import Profile from '@/app/ui/dashboard/profile'
import DesignView from '@/app/ui/rocket/design'
import { fetchDesign } from '@/app/lib/neo4j'

export default async function Page ({
  params
}: {
  params: { rocket_id: string, design_id: string }
}): Promise<React.JSX.Element> {
  const designId = params.design_id
  const design = await fetchDesign(designId)

  if (design === null) {
    return <div>Failed to load design</div>
  }
  return (
    <main>
      <Profile />
      <DesignView design={design} />
      {/* <div className='mt-6 flex items-center justify-end gap-x-6'>
      </div> */}
    </main>
  )
}
