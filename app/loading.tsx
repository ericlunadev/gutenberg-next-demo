import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] gap-4 p-4">
      <div className="flex-1 lg:max-w-[calc(100%-20rem)]">
        <Card className="h-full">
          <CardHeader>
            <Skeleton className="h-8 w-[200px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="lg:w-80 h-fit">
        <CardHeader>
          <Skeleton className="h-6 w-[100px]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-[120px] mb-2" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5 mt-1" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

