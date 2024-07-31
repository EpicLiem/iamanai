export async function getChatCompletion(messages: { role: string, content: string }[], model: string) {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages, model }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch chat completion');
    }

    const data = await response.json();
    return data.content;
}
