'use client'

import { useState } from "react";
import { ArrowUp, Bot } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { WebPageChatScreen } from "../_components/WebPageChatScreen";
import { PreviewAndCodeTabs } from "../_components/CodePreviewScreen";
import { Separator } from "@/components/ui/separator";
import { generateChatResponse } from "@/actions/actions";

const GeneratePage = () => {
    const systemMessage =
        {
            role: 'system',
            content: 'You are a helpful coding assistant. You will use the description from the user to return html and css code. First explain the html code in 2 sentences then add the html code. The HTML code should have the following format |START_HTML| the html code |END_HTML|. Then explain the css code in 2 sentences then add the css code. THe CSS code should have the following format |START_CSS| the css code |END_CSS|.'
        } as any;
    const [messages, setMessages] = useState([] as any);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (input.trim() !== "") {
            setIsLoading(true);
            setMessages([...messages, { content: input, role: "user" }]);
            setInput("");

            const response = await generateChatResponse({ messages: [systemMessage, ...messages, { content: input, role: "user" }] });

            console.log(response);

            const decoder = new TextDecoder();

            const reader = response.body?.getReader()
            if (!reader) {
                throw new Error("Failed to read response body")
            }
            setIsLoading(false);
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = JSON.parse(decoder.decode(value));
                console.log(chunk);

                setMessages((prevState: any) => {
                    const lastMessage = prevState[prevState.length - 1];

                    // Check if the last message is from the assistant
                    if (lastMessage?.role === 'assistant') {
                        // Create a new array with updated assistant's content
                        return [
                            ...prevState.slice(0, -1), // Include all except the last message
                            {
                                ...lastMessage, // Keep the assistant's message structure
                                content: lastMessage.content + chunk.message.content,
                            },
                        ];
                    } else {
                        // Add a new assistant message
                        return [
                            ...prevState,
                            { role: 'assistant', content: chunk.message.content },
                        ];
                    }
                });
            }
        }
    };
    return (
        <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-between gap-x-2 min-h-screen w-screen">
            <WebPageChatScreen
                messages={messages}
                input={input}
                setInput={setInput}
                handleSend={handleSend}
                isLoading={isLoading}
            />
            <div className="flex-1">
                <PreviewAndCodeTabs />
            </div>
        </div>
    )
}

export default GeneratePage;