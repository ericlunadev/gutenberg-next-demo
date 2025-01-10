import { BookLanguage } from "@/components/BookLanguage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SquareChevronLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function AnalyzeBookLanguage({ params }: { params: { id: string } }) {
  return (
    <Card className="h-fit m-4">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <Link href="/"><SquareChevronLeft /></Link>
            <span>Book Language</span>
          </div>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-6">
        <Suspense fallback={<div>Loading...</div>}>
          <BookLanguage id={params.id} />
        </Suspense>
      </CardContent>
    </Card>
  )
}

