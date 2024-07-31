import { Inter } from 'next/font/google';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";


const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

export function Chat({ messages }) {
    return (
        <div className="w-screen h-screen flex flex-col">
            <Header />
            <MessageList messages={messages} />
            <MessageInput />
        </div>
    );
}

function Header() {
    return (
        <div className="border-b p-4 flex items-center justify-between gap-4 sticky top-0 bg-background z-10">
            <div>
                <div className="font-medium">Neural Network Network</div>
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

function MessageInput() {
    return (
        <div className="border-t p-4 flex-shrink-0 sticky bottom-0 bg-background z-10">
            <form className="flex items-center gap-2">
                <Input
                    placeholder="Type your message..."
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
            viewBox="0 0 15 15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path xmlns="http://www.w3.org/2000/svg"
                  d="M7.5 2.5C10.2614 2.5 12.5 4.73858 12.5 7.5V13.5C12.5 14.0523 12.0523 14.5 11.5 14.5H3.5C2.94772 14.5 2.5 14.0523 2.5 13.5V7.5C2.5 4.73858 4.73858 2.5 7.5 2.5ZM7.5 2.5V0M4 11.5H11M0.5 8V12M14.5 8V12M5.5 9.5C4.94772 9.5 4.5 9.05228 4.5 8.5C4.5 7.94772 4.94772 7.5 5.5 7.5C6.05228 7.5 6.5 7.94772 6.5 8.5C6.5 9.05228 6.05228 9.5 5.5 9.5ZM9.5 9.5C8.94772 9.5 8.5 9.05228 8.5 8.5C8.5 7.94772 8.94772 7.5 9.5 7.5C10.0523 7.5 10.5 7.94772 10.5 8.5C10.5 9.05228 10.0523 9.5 9.5 9.5Z"
                  />
        </svg>
    );
}

function XIcon(props) {
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
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
        </svg>
    );
}

// Example usage of the Chat component
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

export default function App() {
    return <Chat messages={messages} />;
}
