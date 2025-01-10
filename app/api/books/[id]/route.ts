import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'
import { camelCase } from 'lodash'

const GUTENBERG_API_BASE = 'https://www.gutenberg.org/ebooks/'


async function extractMetadata(html: string) {
  const $ = cheerio.load(html);
  const metadata: { [key: string]: string | string[] } = {};

  $('#bibrec table.bibrec tr').each((_index, row) => {
    const key = camelCase($(row).find('th').text());
    const value = $(row).find('td').text().trim();

    if (key) {
      if (metadata[key]) {
        if (Array.isArray(metadata[key])) {
          (metadata[key] as string[]).push(value);
        } else {
          metadata[key] = [metadata[key] as string, value];
        }
      } else {
        metadata[key] = value;
      }
    }
  });
  return metadata;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  try {
    const response = await fetch(`${GUTENBERG_API_BASE}${id}`)
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 })
      }
      throw new Error('Failed to fetch book data')
    }
    const html = await response.text()
    const data = await extractMetadata(html)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching book:', error)
    return NextResponse.json({ error: 'Failed to fetch book data' }, { status: 500 })
  }
}

