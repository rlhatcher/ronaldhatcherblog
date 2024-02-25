// import React, { Suspense } from 'react'
// import Search from '@/app/ui/dashboard/search'
// import Table from '@/app/ui/table'
import { CreateRocket } from '@/app/ui/rockets/buttons'
// import { InvoicesTableSkeleton } from '@/app/ui/skeletons'

export default async function Page (): Promise<React.JSX.Element> {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Rockets</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <Search placeholder="Search invoices..." /> */}
        <CreateRocket />
      </div>
      {/*  <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  )
}
