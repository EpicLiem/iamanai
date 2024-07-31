"use client"
import {Chat} from "@/components/chat";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {useRef} from "react";
export default function Home() {
    const messages = [
        {
            username: '@iamwillpursell',
            timestamp: '5 minutes ago',
            content: "I really love the ecosystem Vercel is creating. The way each component can be added and modified with ease really makes these tools attractive.",
            avatarFallback: 'AC',
        },
        {
            username: '@jdoe',
            timestamp: '10 minutes ago',
            content: "I agree, Vercel's tools are really impressive. The ease of deployment and the seamless integration with Next.js make it a great choice for building modern web applications.",
            avatarFallback: 'JD',
        },
        {
            username: '@emilyjones',
            timestamp: '15 minutes ago',
            content: "I'm really excited to see what the Vercel team comes up with next. Their focus on developer experience and performance is truly impressive.",
            avatarFallback: 'EM',
        },
        {
            username: '@samantha',
            timestamp: '20 minutes ago',
            content: "I'm really impressed with the way Vercel's tools integrate with other popular frameworks and libraries. It makes building complex web applications so much easier.",
            avatarFallback: 'SA',
        },
    ];
    const audioRef = useRef();

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play()
        } else {
            throw error
        }
    }
    return (
        <div>
            <Chat messages={messages}/>
        </div>
    )
}