"use client"
import { useState } from 'react';
import { Chat } from '@/components/Chat';
import { getChatCompletion } from '@/utils/api';

export default function Page() {
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async (content) => {
        const newMessage = {
            username: 'You',
            timestamp: 'just now',
            content,
            avatarFallback: 'YOU',
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        try {
            const aiResponse = await getChatCompletion([{ role: 'assistant', content }], 'mixtral-8x7b-32768');
            const aiMessage = {
                username: 'AI',
                timestamp: 'just now',
                content: aiResponse,
                avatarFallback: 'AI',
            };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return <Chat messages={messages} onSendMessage={handleSendMessage} />;
}
