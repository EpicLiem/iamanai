"use client";
import { useState } from 'react';
import { Chat } from '@/components/Chat';
import { getChatCompletion } from '@/utils/api';

export default function Page() {
    const [messages, setMessages] = useState([]);

    const formatMessagesForAI = (messages) => {
        return messages.map((message) => ({
            content: message.content,
        }));
    };

    const handleSendMessage = async (content) => {
        const newMessage = {
            username: 'You',
            timestamp: 'just now',
            content,
            avatarFallback: 'YOU',
        };
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);

        try {
            const aiResponse = await getChatCompletion(
                formatMessagesForAI(updatedMessages),
                'mixtral-8x7b-32768'
            );
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

    const handleSendRobotMessage = async () => {
        try {
            const aiResponse = await getChatCompletion(
                formatMessagesForAI(messages),
                'mixtral-8x7b-32768'
            );
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

    return (
        <Chat
            messages={messages}
            onSendMessage={handleSendMessage}
            onSendRobotMessage={handleSendRobotMessage}
        />
    );
}
