import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from 'react';

export function Chat({ messages, onSendMessage }) {
    const [input, setInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.trim() !== '') {
            onSendMessage(input);
            setInput('');
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col">
            <Header />
            <MessageList messages={messages} />
            <MessageInput
                input={input}
                setInput={setInput}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

function Header() {
    return (
        <div className="border-b p-4 flex items-center justify-between gap-4 sticky top-0 bg-background z-10">
            <div>
                <div className="font-medium">Plato's Republic</div>
                <div className="text-sm text-muted-foreground">Online</div>
            </div>
            <div className="space-x-4">
                <Button>New Game</Button>
            </div>
        </div>
    );
}

function MessageList({ messages }) {
    return (
        <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message, index) => (
                <Message key={index} {...message} />
            ))}
        </div>
    );
}

function Message({ username, timestamp, content, avatarFallback }) {
    return (
        <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1.5">
                <div className="flex items-center gap-2">
                    <div className="font-semibold">{username}</div>
                    <div className="text-xs text-muted-foreground">{timestamp}</div>
                </div>
                <div>{content}</div>
            </div>
        </div>
    );
}

function MessageInput({ input, setInput, handleSubmit }) {
    return (
        <div className="border-t p-4 flex-shrink-0 sticky bottom-0 bg-background z-10">
            <form className="flex items-center gap-2" onSubmit={handleSubmit}>
                <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm bg-transparent rounded-lg focus-visible:ring-0 ring-0 focus-visible:ring-offset-0"
                />
                <Button type="submit" variant="ghost" size="icon">
                    <SendIcon className="h-5 w-5" />
                    <span className="sr-only">Send</span>
                </Button>
                <Button variant="ghost" size="icon">
                    <RobotIcon className="h-5 w-5" />
                    <span className="sr-only">Robot</span>
                </Button>
            </form>
        </div>
    );
}

function SendIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
        </svg>
    );
}

function RobotIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M6 7V4a2 2 0 0 1 4 0v3" />
            <path d="M14 7V4a2 2 0 1 1 4 0v3" />
            <circle cx="12" cy="14" r="3" />
        </svg>
    );
}
