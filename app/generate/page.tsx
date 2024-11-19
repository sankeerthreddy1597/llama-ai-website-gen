'use client'

import { useState } from "react";
import { ArrowUp, Bot } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { WebPageChatScreen } from "../_components/WebPageChatScreen";
import { PreviewAndCodeTabs } from "../_components/CodePreviewScreen";
import { Separator } from "@/components/ui/separator";

const GeneratePage = () => {
    const [messages, setMessages] = useState([{ text: "Hello, describe the details of the web page and I will do my best to generate the code for the site in real time", user: "AI" }] as any);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim() !== "") {
            setMessages([...messages, { text: input, user: "me" }]);
            setInput("");
        }
    };
    return (
        <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-between gap-x-2 min-h-screen w-screen">
            <WebPageChatScreen
                messages={messages}
                input={input}
                setInput={setInput}
                handleSend={handleSend}
            />
            <div className="flex-1">
                <PreviewAndCodeTabs />
            </div>
        </div>
    )
}

export default GeneratePage;