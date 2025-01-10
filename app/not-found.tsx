'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function BookNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      Not Found
      <Button asChild className="mt-4">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}

