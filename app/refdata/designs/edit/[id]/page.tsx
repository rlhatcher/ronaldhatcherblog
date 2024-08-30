import UserForm from './UserForm'

import { getUser } from '@/lib/getUser'

interface Props {
  params: {
    id: number
  }
}

export default async function EditUser({ params }: Props) {
  const { id } = params

  const user = await getUser(id)

  if (!user?.id) {
    return (
      <div className="max-w-md space-y-2 p-8">
        <h1 className="text-2xl">No User Found for that ID.</h1>
      </div>
    )
  }

  return (
    <div className="max-w-md space-y-2 p-8">
      <h1 className="text-2xl">Edit User {id}</h1>
      <UserForm user={user} />
    </div>
  )
}
