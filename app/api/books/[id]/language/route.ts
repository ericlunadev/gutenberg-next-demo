
import { getGroqChatCompletion } from '@/helpers/api';
import { NextResponse } from 'next/server'

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const id = params.id

	try {
		const response = await getGroqChatCompletion(id)
		const content = response.choices[0].message.content;
		return NextResponse.json({ content })
	} catch (error) {
		console.error('Error fetching book content:', error)
		return NextResponse.json({ error: 'Failed to fetch book content' }, { status: 500 })
	}
}

