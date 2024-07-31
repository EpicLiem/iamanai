import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request) {
    const { messages, model } = await request.json();

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages,
            model,
        });

        const responseContent = chatCompletion.choices[0]?.message?.content || '';
        return NextResponse.json({ content: responseContent });
    } catch (error) {
        console.error('Error fetching chat completion:', error);
        return NextResponse.json({ error: 'Failed to fetch chat completion' }, { status: 500 });
    }
}
