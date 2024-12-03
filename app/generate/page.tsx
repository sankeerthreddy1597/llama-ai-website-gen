'use client'

import { useState } from "react";
import { WebPageChatScreen } from "../_components/WebPageChatScreen";
import { PreviewAndCodeTabs } from "../_components/CodePreviewScreen";
import { generateChatResponse } from "@/actions/actions";

const GeneratePage = () => {
    // const systemMessage = {
    //     role: 'system',
    //     content: `You are a helpful coding assistant. You will use the description from the user to return HTML and CSS code. 
    //     First explain the HTML code in 2 sentences then add the HTML code. 
    //     The HTML code should have the following format |START_HTML| the html code |END_HTML|. 
    //     Then explain the CSS code in 2 sentences then add the CSS code. 
    //     The CSS code should have the following format |START_CSS| the css code |END_CSS|.`
    // };

    const systemMessage = {
        role: 'system',
        content: `You are a helpful coding assistant. You will use the description from the user to return HTML code. No explanation, just html code`
    };

    const [messages, setMessages] = useState([] as any);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [htmlContent, setHtmlContent] = useState("");
    const [cssContent, setCssContent] = useState("p { color: red; }");
    const [activeTab, setActiveTab] = useState("preview"); // Track active tab

    const handleSend = async () => {
        if (input.trim() !== "") {
            setIsLoading(true);
            setMessages([...messages, { content: input, role: "user" }]);
            setInput("");
            setActiveTab('html');

            const response = await generateChatResponse({ messages: [systemMessage, ...messages, { content: input, role: "user" }] });
            const decoder = new TextDecoder();
            const reader = response.body?.getReader();
            if (!reader) throw new Error("Failed to read response body");

            setIsLoading(false);

            let buffer = ""; // Buffer to hold partial chunks
            let partialHtml = "";
            let partialCss = "";
            let isParsingHtml = false;
            let isParsingCss = false;

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = JSON.parse(decoder.decode(value));
                buffer += chunk.message.content; // Add current chunk to the buffer
                // console.log(buffer);
                // console.log(buffer.endsWith('|START_HTML|'))
                setActiveTab('html');
                setHtmlContent(prevState => chunk.message.content === '```' ? prevState : prevState + chunk.message.content)

                // if (buffer.toString().endsWith('|START_HTML|')) {
                //     isParsingHtml = true;
                //     setActiveTab('html');
                //     setHtmlContent('');
                // } else if (isParsingHtml) {
                //     setHtmlContent(prevState => prevState + chunk.message.content)
                // } else if (buffer.endsWith('|END_HTML|')) {
                //     isParsingHtml = false
                // } else if (buffer.toString().endsWith('|START_CSS|')) {
                //     isParsingCss = true;
                //     setActiveTab('css');
                //     setHtmlContent('');
                // } else if (isParsingCss) {
                //     setCssContent(prevState => prevState + chunk.message.content)
                // } else if (buffer.endsWith('|END_CSS|')) {
                //     isParsingCss = false
                // }

                // Process HTML
                // if (buffer.includes("|START_HTML|")) {
                //     isParsingHtml = true;
                //     const htmlStart = buffer.indexOf("|START_HTML|") + "|START_HTML|".length;
                //     const htmlEnd = buffer.indexOf("|END_HTML|");

                //     if (htmlEnd !== -1) {
                //         // HTML ends in the same chunk
                //         partialHtml += buffer.slice(htmlStart, htmlEnd).trim();
                //         setHtmlContent(partialHtml);
                //         setActiveTab("html");
                //         buffer = buffer.slice(htmlEnd + "|END_HTML|".length); // Remove processed content
                //         isParsingHtml = false;
                //     } else {
                //         // HTML spans multiple chunks
                //         partialHtml += buffer.slice(htmlStart).trim();
                //         buffer = ""; // Clear buffer since it's incomplete
                //     }
                // } else if (isParsingHtml) {
                //     // Continue parsing HTML across chunks
                //     const htmlEnd = buffer.indexOf("|END_HTML|");
                //     if (htmlEnd !== -1) {
                //         partialHtml += buffer.slice(0, htmlEnd).trim();
                //         setHtmlContent(partialHtml);
                //         setActiveTab("html");
                //         buffer = buffer.slice(htmlEnd + "|END_HTML|".length);
                //         isParsingHtml = false;
                //     } else {
                //         partialHtml += buffer.trim();
                //         buffer = "";
                //     }
                // }

                // // Process CSS
                // if (buffer.includes("|START_CSS|")) {
                //     isParsingCss = true;
                //     const cssStart = buffer.indexOf("|START_CSS|") + "|START_CSS|".length;
                //     const cssEnd = buffer.indexOf("|END_CSS|");

                //     if (cssEnd !== -1) {
                //         // CSS ends in the same chunk
                //         partialCss += buffer.slice(cssStart, cssEnd).trim();
                //         setCssContent(partialCss);
                //         setActiveTab("css");
                //         buffer = buffer.slice(cssEnd + "|END_CSS|".length); // Remove processed content
                //         isParsingCss = false;
                //     } else {
                //         // CSS spans multiple chunks
                //         partialCss += buffer.slice(cssStart).trim();
                //         buffer = ""; // Clear buffer since it's incomplete
                //     }
                // } else if (isParsingCss) {
                //     // Continue parsing CSS across chunks
                //     const cssEnd = buffer.indexOf("|END_CSS|");
                //     if (cssEnd !== -1) {
                //         partialCss += buffer.slice(0, cssEnd).trim();
                //         setCssContent(partialCss);
                //         setActiveTab("css");
                //         buffer = buffer.slice(cssEnd + "|END_CSS|".length);
                //         isParsingCss = false;
                //     } else {
                //         partialCss += buffer.trim();
                //         buffer = "";
                //     }
                // }

                // Add plain text to assistant message
                if (!isParsingHtml && !isParsingCss) {
                    setMessages((prevState: any) => {
                        const lastMessage = prevState[prevState.length - 1];

                        if (lastMessage?.role === "assistant") {
                            return [
                                ...prevState.slice(0, -1),
                                { ...lastMessage, content: lastMessage.content + chunk.message.content },
                            ];
                        } else {
                            return [...prevState, { role: "assistant", content: chunk.message.content }];
                        }
                    });
                }
            }

            // After streaming ends, switch to the "Preview" tab
            setActiveTab("preview");
        }
    };


    return (
        <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-between gap-x-2 h-screen w-screen">
            <WebPageChatScreen
                messages={messages}
                input={input}
                setInput={setInput}
                handleSend={handleSend}
                isLoading={isLoading}
            />
            <div className="flex-1">
                <PreviewAndCodeTabs
                    htmlContent={htmlContent}
                    cssContent={cssContent}
                    setActiveTab={setActiveTab}
                    activeTab={activeTab}
                />
            </div>
        </div>
    );
};


export default GeneratePage;