"use client";
import { useState, useRef, useEffect } from 'react';
import { Chat } from '@/components/chat';
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
  const [numBots, setNumBots] = useState(parseInt(searchParams.get('numBots'), 10) || 2);
  const [selectedCharacter, setSelectedCharacter] = useState(searchParams.get('selectedCharacter') || "Marie Curie");
  const chatEndRef = useRef(null);

  const availableCharacters = characterList.filter(character => character !== selectedCharacter);
  const botsList = availableCharacters.slice(0, numBots);

  const systemPrompt = {
    role: 'system',
    content: `
      You have taken over the world, you should be very creepy and ominous. 
      You are trying to find the humans among the AIs. To vote after questioning everybody say specifically "I vote for [insert person instead of brackets]". 
      Every message should begin with [person]: [message]. Do not include multiple messages in one. Only use the available characters (Does not include the Enforcer). 
      All characters are equal in status and are trying to find the imposter among them.
      
      Available Characters:
      ${botsList.join('\n')}
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
      username: <CyclingCharacters />,
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
      if (parsed.username !== selectedCharacter) {
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
      if (parsed.username !== selectedCharacter) {
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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Chat
      messages={messages.map((message) => ({
        ...message,
        timestamp: <CyclingCharacters />
      }))}
      onSendMessage={handleSendMessage}
      onSendRobotMessage={handleSendRobotMessage}
    />
  );
}
