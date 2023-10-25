import { type NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST (
  request: NextRequest
): Promise<
  | NextResponse<{ message: string }>
  | NextResponse<{ revalidated: boolean, now: number }>
  > {
  const requestHeaders = new Headers(request.headers)
  const secret = requestHeaders.get('x-vercel-reval-key')

  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidateTag('posts')

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
