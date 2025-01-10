import { use } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getBook } from '@/helpers/api'


export function BookMetadata({ id }: { id: string }) {
  const book = use(getBook(id))

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-6">
        <div className="space-y-4">
          <p>{book.author}</p>

          <div className="space-y-2">
            {book?.note && (
              <ul className="list-disc list-inside text-sm">
                {Array.isArray(book?.note) ? book?.note.map((note: string) => (
                  <li key={note} className="break-words">{note}</li>
                )) :
                  <li className="break-words">{book.note}</li>
                }
              </ul>
            )}
            <p className="text-sm"><b>Credits: </b>{book.credits}</p>
            <details className="text-sm">
              <summary><b>Summary:</b></summary>
              <p>{book.summary}</p>
            </details>
            <p className="text-sm"><b>Language: </b>{book.language}</p>
            <p className="text-sm"><b>LoC Class: </b>{book.loCClass}</p>
            {book?.subjecty && (
              <><h3 className="font-semibold mb-2"><b>Subjects</b></h3>
                <ul className="list-disc list-inside text-sm">
                  {book?.subject.map((subject: string) => (
                    <li key={subject}>{subject}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-sm"><b>Category: </b>{book.category}</p>
            <p className="text-sm"><b>EBook-No.: </b>{book.eBookNo}</p>
            <p className="text-sm"><b>Most Recently </b>Updated: {book.mostRecentlyUpdated}</p>
            <p className="text-sm"><b>Release Date: </b>{book.releaseDate}</p>
            <p className="text-sm"><b>Copyright Status: </b>{book.copyrightStatus}</p>
            <p className="text-sm"><b>Downloads: </b>{book.downloads}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

