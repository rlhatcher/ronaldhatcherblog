import React from 'react'
import Link from 'next/link'

export default function NotFound (): React.JSX.Element {
  return (
        <div className="text-center">
            <p className="mt-10">Sorry, the requested post does not exist.</p>
            <Link href="/">Back to Home</Link>
        </div>
  )
}
