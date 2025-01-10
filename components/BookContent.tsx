import { use } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from './ui/button';
import Link from 'next/link';
import { SquareChevronLeft } from 'lucide-react';
import { getBookContent } from '@/helpers/api';


export function BookContent({ id }: { id: string }) {
  const { content } = use(getBookContent(id))

  return (
    <Card className="h-full">
      <CardHeader className="border-b border-gray-200 p-4">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/"><SquareChevronLeft /></Link>
            <span>Book Content</span></div>
          <div className="flex flex-col">
            <Button asChild>
              <Link href={`/books/${id}/language`}>Detect Language</Link>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="whitespace-pre-wrap font-mono text-sm">
            {content}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

