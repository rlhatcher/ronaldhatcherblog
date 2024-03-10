import { CreateDesign, DesignNav } from './buttons'
export default function DesignList ({
  listItems = [],
  rocketId,
  label
}: {
  listItems: Design[] | undefined
  rocketId: string
  label: string
}): React.JSX.Element {
  const content =
    listItems.length === 0
      ? (
      <CreateDesign rocketId={rocketId}/>
        )
      : (
      <ul
        role='list'
        className='divide-y divide-gray-100 rounded-md border border-gray-200'
      >
        {listItems.map((design) => (
          <DesignNav key={design.name} design={design} />
        ))}
      </ul>
        )

  return (
    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='text-sm font-medium leading-6 text-gray-900'>{label}</dt>
      <dd className='mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
        {content}
      </dd>
    </div>
  )
}
