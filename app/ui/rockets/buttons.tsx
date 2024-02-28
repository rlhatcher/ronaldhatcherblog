import { Button } from '@/app/ui/button'
import {
  ChevronRightIcon,
  PencilIcon,
  PlusIcon
} from '@heroicons/react/16/solid'
import Link from 'next/link'
import { Badge } from '../badge'

export function CreateRocket (): JSX.Element {
  return (
    <Button href='/dashboard/rockets/create'>
      <PlusIcon />
      <span className='hidden md:block'>Create Rocket</span>{' '}
    </Button>
  )
}

export function UpdateRocket ({ id }: { id: string }): JSX.Element {
  return (
    <Link
      href={`/dashboard/rockets/${id}/edit`}
      className='rounded-md border p-2 hover:bg-gray-100'
    >
      <PencilIcon className='w-5' />
    </Link>
  )
}

export function RocketNav ({ rocket }: { rocket: Rocket }): JSX.Element {
  return (
    <li
      key={rocket.name}
      className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6'
    >
      <div className='flex w-0 flex-1 items-center'>
        {rocket.id}
        <div className='ml-4 flex min-w-0 flex-1 gap-2'>
          <span className='truncate font-medium'>{rocket.name}</span>
          <span className='flex-shrink-0 text-gray-400'>{rocket.mfgID}</span>
          {rocket.labels?.map((mylabel) => {
            if (mylabel === 'Model') {
              return <Badge key='model' color='emerald'>Model</Badge>
            } else if (mylabel === 'Rocket') {
              return <Badge key='rocket' color='blue'>Rocket</Badge>
            }
            return <Badge key='kit' color='orange'>Kit</Badge>
          })}
        </div>
      </div>
      <div className='ml-4 flex-shrink-0'>
        <Link href={`/dashboard/rockets/${rocket.id}`}>
          <ChevronRightIcon
            className='h-5 w-5 flex-shrink-0 text-gray-400'
            aria-hidden='true'
          />
        </Link>
      </div>
    </li>
  )
}
// export function DeleteRocket ({ id }: { id: string }): JSX.Element {
//   const deleteRocketWithId = deleteRocket.bind(null, id)

//   return (
//     <form action={deleteRocketWithId}>
//       <button className="rounded-md border p-2 hover:bg-gray-100">
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-5" />
//       </button>
//     </form>
//   )
// }
