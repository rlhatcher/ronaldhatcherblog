import { Button } from '@/app/ui/button'
import { PencilIcon, PlusIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'

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
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
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
