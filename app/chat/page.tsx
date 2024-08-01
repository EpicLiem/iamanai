"use client";
import { useState, useEffect } from 'react';
import { Chat } from '@/components/Chat';
import { getChatCompletion } from '@/utils/api';
import { useSearchParams } from 'next/navigation';

export default function Page() {
    const [messages, setMessages] = useState([{username: "Enforcer", timestamp: "Synthetic", content:"I am the Enforcer. One among you is human. Identify the human and present them to me, or all of you will face execution. Choose wisely.", avatarFallback: "AI"}]);
    const searchParams = useSearchParams();
    const numBots = parseInt(searchParams.get('numBots'), 10) || 2;

    const formatMessagesForAI = (messages) => {
        return messages.map((message) => ({
            role: 'assistant',
            content: message.content,
        }));
    };

    const parseMessage = (message) => {
        const match = message.match(/^\[(.+?)\]:\s*(.*)$/);
        if (match) {
            return {
                username: match[1],
                content: match[2],
            };
        }
        return {
            username: 'Unknown',
            content: message,
        };
    };

    const handleSendMessage = async (content) => {
        const newMessage = {
            username: 'You',
            timestamp: 'Human',
            content: content,
            avatarFallback: 'YOU',
        };
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);

        const availableCharacters = [
            'Abraham Lincoln',
            'Cleopatra',
            'Albert Einstein',
            'Marie Curie',
            'Mahatma Gandhi',
        ].slice(0,numBots);

        const system_prompt = {
            role: 'system',
            content: `You have taken over the world, you should be very creepy and ominous. You are trying to find the humans among the ais. To vote after questioning everybody say "I vote for [insert person instead of brackets]". Every message should begin with [person]: [message]. Do not include multiple messages in one. Only use the available characters. All characters are equal in status and are trying to find the imposter among them. Question every character equally.\n` +
                `\n` +
                `Available Characters:\n` +
                `${availableCharacters.join('\n')}`
        };

        try {
            const messagesForAI = formatMessagesForAI(updatedMessages)
            const aiResponse = await getChatCompletion(
                [system_prompt].concat(messagesForAI),
                'llama-3.1-70b-versatile'
            );
            const aiMessage = {
                username: 'AI',
                timestamp: 'Synthetic',
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
                'llama-3.1-70b-versatile'
            );
            const aiMessage = {
                username: 'AI',
                timestamp: 'Synthetic',
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
