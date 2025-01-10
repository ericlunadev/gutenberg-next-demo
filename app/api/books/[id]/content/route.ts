import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  try {
    // const response = await fetch(`https://www.gutenberg.org/files/${id}/${id}-0.txt`)
    // const response = await fetch(`https://www.gutenberg.org/ebooks/${id}.txt.utf-8`)
    // const response = await fetch(`https://www.gutenberg.org/ebooks/${id}.html.images`)
    const response = await fetch(`https://www.gutenberg.org/cache/epub/${id}/pg${id}.txt`)
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'Book content not found' }, { status: 404 })
      }
      throw new Error('Failed to fetch book content')
    }
    const text = await response.text()
    return NextResponse.json({ content: text })
  } catch (error) {
    console.error('Error fetching book content:', error)
    return NextResponse.json({ error: 'Failed to fetch book content' }, { status: 500 })
  }
}

