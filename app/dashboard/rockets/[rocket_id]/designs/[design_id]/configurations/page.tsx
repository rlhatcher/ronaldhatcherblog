import Profile from '@/app/ui/dashboard/profile'
import DesignView from '@/app/ui/rocket/design'
import { fetchDesign } from '@/app/lib/neo4j'

export default async function Page ({
  params
}: {
  params: { id: string }
}): Promise<React.JSX.Element> {
  const id = params.id
  const design = await fetchDesign(id)

  if (design === null) {
    return <div>Failed to load design</div>
  }
  return (
    <main>
      <Profile />
      <DesignView design={design}/>
      {/* <div className='mt-6 flex items-center justify-end gap-x-6'>
      </div> */}
    </main>
  )
}
