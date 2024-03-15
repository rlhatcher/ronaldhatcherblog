import Profile from '@/app/ui/dashboard/profile'
import { fetchDesign } from '@/app/lib/neo4j'
import ConfigView from '@/app/ui/rocket/config'

export default async function Page ({
  params
}: {
  params: { design_id: string }
}): Promise<React.JSX.Element> {
  const id = params.design_id
  const design = await fetchDesign(id)

  if (design === null) {
    return <div>Failed to load design</div>
  }
  return (
    <main>
      <Profile />
      <ConfigView config={design.supports[0]}/>
      {/* <div className='mt-6 flex items-center justify-end gap-x-6'>
      </div> */}
    </main>
  )
}
