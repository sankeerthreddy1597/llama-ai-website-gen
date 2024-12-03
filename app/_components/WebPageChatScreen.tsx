import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowUp, Bot } from "lucide-react"
import { TypingPlaceHolder } from "../page"
import Markdown from "react-markdown"

type ChatScreenTypes = {
    messages: any[],
    input: string,
    setInput: any,
    handleSend: any,
    isLoading: boolean,
}

export const WebPageChatScreen = ({ messages, input, setInput, handleSend, isLoading }: ChatScreenTypes) => {
    return (
        <div className="flex flex-col h-screen pb-8 lg:w-2/5 justify-between">
            {/* Header */}
            <header className="bg-gray-100 p-4 text-center font-bold">
                Generate Web Page
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto p-4">
                {messages.map((msg: any, index: any) => (
                    <div
                        key={index}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`p-3 flex flex-row rounded-2xl gap-x-2 ${msg.role === "user"
                                ? "bg-gray-100 text-black max-w-xs"
                                : "text-black"
                                } my-1`}
                        >
                            {msg.role !== "user" &&
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="" />
                                    <AvatarFallback><Bot className="h-5 w-5 text-green-500" /></AvatarFallback>
                                </Avatar>}
                            <span className="pt-1"><Markdown>{msg.content as string}</Markdown></span>
                        </div>
                    </div>
                ))}
                {isLoading && <TypingPlaceHolder />}
            </main>

            {/* Footer */}
            <footer className="bg-white p-4">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Type web page description..."
                        className="w-full p-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={handleSend}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-950 text-white p-2 rounded-full hover:bg-gray-950/80 focus:outline-none"
                    >
                        <ArrowUp className="h-5 w-5" />
                    </button>
                </div>
            </footer>
        </div>
    )
}