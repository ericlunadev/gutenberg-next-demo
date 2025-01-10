import { getBookLanguage } from '@/helpers/api'
import { use } from 'react'


export function BookLanguage({ id }: { id: string }) {
  const { content } = use(getBookLanguage(id))

  return (
    <div className="whitespace-pre-wrap font-mono text-sm">
      {content}
    </div>
  )
}

