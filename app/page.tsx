'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { isEmpty, isNaN, isNumber } from 'lodash'
import Link from 'next/link'

export default function Home() {
  const [bookId, setBookId] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('bookSearchHistory') || '[]')
    setSearchHistory(history)
  }, [])

  const saveToSearchHistory = (id: string) => {
    const updatedHistory = [id, ...searchHistory.filter((item) => item !== id)].slice(0, 5)
    localStorage.setItem('bookSearchHistory', JSON.stringify(updatedHistory))
    setSearchHistory(updatedHistory)
  }

  const clearHistory = () => {
    localStorage.removeItem('bookSearchHistory')
    setSearchHistory([])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = parseInt(bookId.trim())
    if (isEmpty(bookId) || isNaN(value)) {
      setError('Please enter a valid book ID')
      return
    }
    setIsLoading(true)
    saveToSearchHistory(value.toString())
    router.push(`/books/${value}`)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Welcome to Project Gutenberg Explorer</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <Label htmlFor="bookId">Enter Project Gutenberg Book ID</Label>
          <Input
            type="text"
            id="bookId"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            placeholder="e.g., 1342"
            className="mt-1"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Fetching...' : 'Fetch Book'}
        </Button>
      </form>
      {error && (
        <Alert variant="destructive" className="mt-4 w-full max-w-xs">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {searchHistory.length > 0 && (
        <div className="mt-8 w-full max-w-xs">
          <h2 className="text-xl font-semibold mb-4">Recent Searches</h2>
          <ul className="space-y-2">
            {searchHistory.map((bookId) => (
              <li key={bookId}>
                <Link href={`/books/${bookId}`} className="text-blue-600 hover:underline">
                  Book ID: {bookId}
                </Link>
              </li>
            ))}
          </ul>
          <Button onClick={clearHistory} variant="outline" className="mt-4">
            Clear History
          </Button>
        </div>
      )}
    </div>
  )
}

