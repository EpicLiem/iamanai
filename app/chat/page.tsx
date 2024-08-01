"use client";
import { useState, useEffect } from 'react';
import { Chat } from '@/components/Chat';
import { getChatCompletion } from '@/utils/api';
import { useSearchParams } from 'next/navigation';
import CyclingCharacters from '@/components/CyclingCharacters';

const characterList = [
  "Abraham Lincoln",
  "Cleopatra",
  "Albert Einstein",
  "Marie Curie",
  "Mahatma Gandhi",
  "Leonardo da Vinci",
  "Joan of Arc",
  "Winston Churchill",
  "Galileo Galilei",
  "Nelson Mandela"
];

export default function Page() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState([{
    username: "Enforcer",
    timestamp: "Synthetic",
    content: "I am the Enforcer. One among you is human. Identify the human and present them to me, or all of you will face execution. Choose wisely.",
    avatarFallback: "AI"
  }]);
  const [numBots, setNumBots] = useState(parseInt(searchParams.get('numBots'), 10) || 4);
  const [selectedCharacter, setSelectedCharacter] = useState(searchParams.get('selectedCharacter') || "Marie Curie");
  const [alert, setAlert] = useState(null);

  const availableCharacters = characterList.filter(character => character !== selectedCharacter);

  const systemPrompt = {
    role: 'system',
    content: `
      You have taken over the world, you should be very creepy and ominous. 
      You are trying to find the humans among the AIs. To vote after questioning everybody say specifically "I vote for [insert person instead of brackets]". 
      Every message should begin with [person]: [message]. Do not include multiple messages in one. Only use the available characters (Does not include the Enforcer). 
      All characters are equal in status and are trying to find the imposter among them. Question every character equally.
      You are not the human.
      
      Available Characters:
      ${availableCharacters.join('\n')}
    `
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
      username: selectedCharacter,
      timestamp: 'Human',
      content: content,
      avatarFallback: 'YOU',
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    try {
      const messagesForAI = formatMessagesForAI(updatedMessages);
      const aiResponse = await getChatCompletion(
          [systemPrompt].concat(messagesForAI),
          'llama-3.1-8b-instant'
      );
      const parsed = parseMessage(aiResponse);
      if (parsed.username === selectedCharacter) {
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
          [systemPrompt].concat(messagesForAI),
          'llama-3.1-8b-instant'
      );
      const parsed = parseMessage(aiResponse);
      if (parsed.username === selectedCharacter) {
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
                <span>AI attempted to speak as you: {alert}</span>
                <button onClick={closeAlert} className="ml-2 text-sm underline">
                  Close
                </button>
              </div>
            </div>
        )}
        <Chat
            messages={messages.map((message) => ({
              ...message,
              timestamp: <CyclingCharacters />
            }))}
            onSendMessage={handleSendMessage}
            onSendRobotMessage={handleSendRobotMessage}
        />
      </>
  );
}
