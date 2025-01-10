import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getBook(id: string) {
  const res = await fetch(`${API_URL}/api/books/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch book')
  }
  return res.json()
}

export async function getBookContent(id: string) {
  const res = await fetch(`${API_URL}/api/books/${id}/content`)
  if (!res.ok) {
    throw new Error('Failed to fetch book content')
  }
  return res.json()
}

export async function getBookLanguage(id: string) {
  const res = await fetch(`${API_URL}/api/books/${id}/language`)
  if (!res.ok) {
    throw new Error('Failed to analyze book languages')
  }
  return res.json()
}

export async function getGroqChatCompletion(id: string) {
  const result = await getBookContent(id)
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Detect the language from this book only return the language: ${result.content.slice(2000, 4000)}`
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}
