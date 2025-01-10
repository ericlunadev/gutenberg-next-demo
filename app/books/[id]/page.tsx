import { Suspense } from 'react'
import { BookContent } from '@/components/BookContent'
import { BookMetadata } from '@/components/BookMetadata'
import { BookContentSkeleton } from '@/components/BookContentSkeleton'
import { BookMetadataSkeleton } from '@/components/BookMetadataSkeleton'
import { ErrorBoundary } from 'react-error-boundary'

export default function BookPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-4">
      <div className="mt-4 flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] gap-4">
        <div className="flex-1 lg:max-w-[calc(100%-20rem)]">
          <ErrorBoundary fallback={<div>Failed to load book content</div>}>
            <Suspense fallback={<BookContentSkeleton />}>
              <BookContent id={params.id} />
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className="lg:w-80">
          <ErrorBoundary fallback={<div>Failed to load book metadata</div>}>
            <BookMetadata id={params.id} />
            <Suspense fallback={<BookMetadataSkeleton />}>
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

