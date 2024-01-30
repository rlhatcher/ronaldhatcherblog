import React from 'react'
import { format } from 'date-fns'

export default function DateComponent ({
  dateString
}: {
  dateString: string
}): React.JSX.Element {
  return (
    <time dateTime={dateString}>
      {format(new Date(dateString), 'LLLL d, yyyy')}
    </time>
  )
}
