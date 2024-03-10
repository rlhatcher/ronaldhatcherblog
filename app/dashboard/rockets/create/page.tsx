import Form from '@/app/ui/rocket/create-form'
// import { fetchCustomers } from '@/app/lib/data'

export default async function Page (): Promise<React.JSX.Element> {
  // const customers = await fetchCustomers()

  return (
    <main>
      <Form />
    </main>
  )
}
