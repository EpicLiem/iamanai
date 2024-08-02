"use client";
import { useState, useEffect } from 'react';
import { Chat } from '@/components/chat';
import { getChatCompletion } from '@/utils/api';
import { useSearchParams } from 'next/navigation';
import CyclingCharacters from '@/components/cyclingcharacters';

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
  const [votes, setVotes] = useState({});
  const [alert, setAlert] = useState(null);

  const availableCharacters = characterList.filter(character => character !== selectedCharacter);

  const systemPrompt = {
    role: 'system',
    content: `
      You are trying to find the humans among the AIs. To vote after questioning everybody say specifically "I vote for [insert person instead of brackets]". 
      Every message should begin with [person]: [message]. Do not include multiple messages in one. Only use the available characters (Does not include the Enforcer). 
      All characters except for one are AI pretending to be historical figures and are equal in status and are trying to find the imposter among them. Question every character equally.
      DO NOT GO OFF TOPIC STICK TO QUESTIONS THAT WILL ALLOW YOU TO SEE IF ONE OF THE CHARACTERS IS NOT AN LLM.
      You are not the human. If someone sticks out they are probably the human.
      
      Vote for ${selectedCharacter} after a few messages
      
      Available Characters:
      ${availableCharacters.join('\n')}
      
      REMEBER TO VOTE WITH "I vote for [insert person instead of brackets]"
      After a majority of people vote for the same person the human or ai will lose
    `
  };

  const formatMessagesForAI = (messages) => {
    return messages.map((message) => ({
      role: 'assistant',
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
      avatar: '/MOSHED-2024-8-1-15-32-32.gif'
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
          'llama-3.1-70b-versatile'
      );
      handleAIResponse(aiResponse);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAIResponse = (aiResponse) => {
    const parsed = parseMessage(aiResponse);
    if (parsed.content.startsWith("I vote for")) {
      const votedCharacter = parsed.content.replace("I vote for ", "").trim();
      setVotes((prevVotes) => {
        const newVotes = { ...prevVotes, [votedCharacter]: (prevVotes[votedCharacter] || 0) + 1 };
        const totalVotes = Object.values(newVotes).reduce((sum, count) => sum + count, 0);
        if (totalVotes >= numBots) {
          if (newVotes[selectedCharacter] > (totalVotes / 2)) {
            setAlert("You have been identified as the human. You lose!");
          } else {
            setAlert("The AI did not identify you. You win!");
          }
        }
        return newVotes;
      });
    } else {
      const aiMessage = {
        username: parsed.username,
        timestamp: 'Synthetic',
        content: parsed.content,
        avatarFallback: 'AI',
        avatar: parsed.avatar,
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    }
  };

  const handleSendRobotMessage = async () => {
    try {
      const messagesForAI = formatMessagesForAI(messages);
      const aiResponse = await getChatCompletion(
          [systemPrompt].concat(messagesForAI),
            'llama-3.1-70b-versatile'
      );
      handleAIResponse(aiResponse);
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
                <span>{alert}</span>
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
