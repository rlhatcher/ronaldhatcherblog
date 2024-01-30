import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export async function getUser (): Promise<Person> {
  const { getUser } = getKindeServerSession()

  const user = await getUser()
  if (user == null) {
    return {
      id: '',
      email: '',
      given_name: 'Unknown',
      family_name: 'Unknown',
      picture: ''
    }
  }
  const person: Person = {
    id: user.id,
    email: user.email ?? '',
    given_name: user.given_name ?? 'Unknown',
    family_name: user.family_name ?? 'Unknown',
    picture: user.picture ?? ''
  }
  return person
}
