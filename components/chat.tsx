import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { useRouter} from "next/navigation";


export function Chat({ messages, onSendMessage, onSendRobotMessage }) {
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
                onSendRobotMessage={onSendRobotMessage}
            />
        </div>
    );
}

function Header() {
    const router = useRouter()

    const handleclick = async () => {
        router.push('/')
    }
    return (
        <div className="border-b p-4 flex items-center justify-between gap-4 sticky top-0 bg-background z-10">
            <div>
                <div className="font-medium">Neural Network Network</div>
                <div className="text-sm text-muted-foreground">Online</div>
            </div>
            <div className="space-x-4">
                <Button onClick={handleclick}>Home</Button>
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

function Message({ username, timestamp, content, avatarFallback, avatar=null }) {
    return (
        <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10 border">
                <AvatarImage src={avatar ? avatar : "/placeholder-user.jpg"} />
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

function MessageInput({ input, setInput, handleSubmit, onSendRobotMessage }) {
    return (
        <div className="border-t p-4 flex-shrink-0 sticky bottom-0 bg-background z-10 flex items-center gap-2">
            <form className="flex items-center gap-2 flex-1" onSubmit={handleSubmit}>
                <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm bg-transparent rounded-lg focus-visible:ring-0 ring-0 focus-visible:ring-offset-0"
                />
                <Button type="submit" variant="ghost" size="icon">
                    <SendIcon className="h-5 w-5"/>
                    <span className="sr-only">Send</span>
                </Button>
            </form>
            <Button type="button" variant="ghost" size="icon" onClick={onSendRobotMessage}>
                <RobotIcon className="h-5 w-5"/>
                <span className="sr-only">Robot</span>
            </Button>
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
            <path d="m22 2-7 20-4-9-9-4Z"/>
            <path d="M22 2 11 13"/>
        </svg>
    );
}

function RobotIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/1999/svg"
            width="24"
            height="24"
            viewBox="0 0 57.006 57.006"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <g xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M57.006,57.006H28.503C12.786,57.006,0,44.22,0,28.503S12.786,0,28.503,0s28.503,12.786,28.503,28.503V57.006z M28.503,4   C14.992,4,4,14.992,4,28.503s10.992,24.503,24.503,24.503h24.503V28.503C53.006,14.992,42.014,4,28.503,4z"/>
                <circle cx="42.657" cy="28.503" r="4.206"/>
                <circle cx="28.503" cy="28.504" r="4.207"/>
                <circle cx="14.348" cy="28.503" r="4.206"/>
            </g>
        </svg>

    );
}
