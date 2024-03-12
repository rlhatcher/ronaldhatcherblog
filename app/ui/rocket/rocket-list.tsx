import { RocketNav } from './buttons'
import { KitNav } from '../kits/kit-nav'

function isKit (item: Kit | Rocket): item is Kit {
  return (item as Kit).madeBy !== undefined
}

export default function RocketList ({
  listItems,
  label
}: {
  listItems: Array<Kit | Rocket> | undefined
  label: string
}): React.JSX.Element {
  if (listItems === undefined) {
    return <div>No Items</div>
  }

  return (
    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='text-sm font-medium leading-6 text-gray-900'>{label}</dt>
      <dd className='mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
        <ul
          role='list'
          className='divide-y divide-gray-100 rounded-md border border-gray-200'
        >
          {listItems.map((item) => {
            if (isKit(item)) {
              return <KitNav key={item.name} kit={item} />
            } else {
              return <RocketNav key={item.name} rocket={item} />
            }
          })}
        </ul>
      </dd>
    </div>
  )
}
