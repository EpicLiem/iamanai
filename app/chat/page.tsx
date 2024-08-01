"use client";
import { useState } from 'react';
import { Chat } from '@/components/Chat';
import { getChatCompletion } from '@/utils/api';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useSearchParams } from 'next/navigation';

export default function Page() {
    const [messages, setMessages] = useState([{
        username: "Enforcer",
        timestamp: "Synthetic",
        content: "I am the Enforcer. One among you is human. Identify the human and present them to me, or all of you will face execution. Choose wisely.",
        avatarFallback: "AI"
    }]);
    const [alert, setAlert] = useState(null);
    const searchParams = useSearchParams();

    const reservedUsernames = ["Marie Curie"];

    const system_prompt = {
        role: 'system',
        content: "You have taken over the world, you should be very creepy and ominous. You are trying to find the humans among the AIs. To vote after questioning everybody say \"I vote for [insert person instead of brackets]\". Every message should begin with [person]: [message]. Do not include multiple messages in one. Only use the available characters (Does not include the Enforcer). All characters are equal in status and are trying to find the imposter among them. Question every character equally.\n" +
            "\n" +
            "Available Characters:\n" +
            "Abraham Lincoln\n" +
            "Cleopatra\n" +
            "Albert Einstein\n" +
            "Marie Curie\n" +
            "Mahatma Gandhi"
    };

    const formatMessagesForAI = (messages) => {
        return messages.map((message) => ({
            role: message.username === 'You' ? 'user' : 'assistant',
            content: `${message.username}: ${message.content}`,
        }));
    };

    const parseMessage = (message) => {
        const match = message.match(/^(.+?):\s*(.*)$/);
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
            username: 'Marie Curie',
            timestamp: 'Human',
            content: content,
            avatarFallback: 'YOU',
        };
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);

        try {
            const messagesForAI = formatMessagesForAI(updatedMessages);
            const aiResponse = await getChatCompletion(
                [system_prompt].concat(messagesForAI),
                'llama-3.1-8b-instant'
            );
            const parsed = parseMessage(aiResponse);
            if (reservedUsernames.includes(parsed.username)) {
                setAlert(parsed.username);
            } else {
                const aiMessage = {
                    username: parsed.username,
                    timestamp: 'Synthetic',
                    content: parsed.content,
                    avatarFallback: 'AI',
                };
                setMessages((prevMessages) => [...prevMessages, aiMessage]);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSendRobotMessage = async () => {
        try {
            const messagesForAI = formatMessagesForAI(messages);
            const aiResponse = await getChatCompletion(
                [system_prompt].concat(messagesForAI),
                'llama-3.1-8b-instant'
            );
            const parsed = parseMessage(aiResponse);
            if (reservedUsernames.includes(parsed.username)) {
                setAlert(parsed.username);
            } else {
                const aiMessage = {
                    username: parsed.username,
                    timestamp: 'Synthetic',
                    content: parsed.content,
                    avatarFallback: 'AI',
                };
                setMessages((prevMessages) => [...prevMessages, aiMessage]);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const closeAlert = () => {
        setAlert(null);
    };

    return (
        <>
            {alert && (
                <div className="fixed bottom-24 right-4 z-50 bg-red-500 text-white p-3 rounded-md">
                    <div className="flex items-center justify-between">
                        <span>Reserved Username: {alert}</span>
                        <button onClick={closeAlert} className="ml-2 text-sm underline">
                            Close
                        </button>
                    </div>
                </div>
            )}
            <Chat
                messages={messages}
                onSendMessage={handleSendMessage}
                onSendRobotMessage={handleSendRobotMessage}
            />
        </>
    );
}
