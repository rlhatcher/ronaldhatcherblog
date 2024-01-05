import Tags from '@/app/components/Tags'
import TopNav from '@/app/components/TopNav'
import { getAllTags } from '@/lib/github/tags'

export default async function TagsPage (): Promise<React.JSX.Element | never[]> {
  const links: BreadCrumb[] = []
  const tags = await getAllTags()

  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: 'Tags' }} />
      <div className='bg-gray-100 rounded-2xl p-4'>
        <section>
          <Tags tags={tags} />
        </section>
      </div>
    </div>
  )
}
