import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import { Copy } from "lucide-react";

export const PreviewAndCodeTabs = () => {
    const [htmlContent, setHtmlContent] = useState("<p>Hello, this is a preview!</p>");
    const [cssContent, setCssContent] = useState("p { color: red; font-size: 20px; }");

    const [prevHtmlContent, setPrevHtmlContent] = useState(htmlContent);
    const [prevCssContent, setPrevCssContent] = useState(cssContent);
    const [activeTab, setActiveTab] = useState('preview');

    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    useEffect(() => {
        if (activeTab === "preview" && iframeRef.current) {
            const iframe = iframeRef.current;

            // Ensure iframe is fully loaded before accessing content
            const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;

            if (iframeDocument) {
                // Set HTML content inside the iframe
                iframeDocument.open();
                iframeDocument.write(htmlContent);
                iframeDocument.close();

                // Set CSS content inside the iframe
                const styleTag = iframeDocument.createElement("style");
                styleTag.innerHTML = cssContent;
                iframeDocument.head.appendChild(styleTag);
            }
        }
    }, [htmlContent, cssContent, prevHtmlContent, prevCssContent, activeTab]);

    // Highlight syntax when HTML or CSS content changes
    useEffect(() => {
        Prism.highlightAll(); // Apply syntax highlighting
    }, [htmlContent, cssContent]);

    const copyToClipboard = (content: string) => {
        navigator.clipboard.writeText(content)
            .then(() => alert("Copied to clipboard!"))
            .catch((err) => alert("Failed to copy: " + err));
    };

    return (
        <div className="w-full max-w-4xl h-full">
            <Tabs defaultValue={activeTab} onValueChange={(v) => setActiveTab(v)} className="h-full">
                <TabsList className="flex items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0">
                    <TabsTrigger
                        value="preview"
                        className="py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                    >
                        Preview
                    </TabsTrigger>
                    <TabsTrigger
                        value="html"
                        className="py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                    >
                        HTML
                    </TabsTrigger>
                    <TabsTrigger
                        value="css"
                        className="py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                    >
                        CSS
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="bg-white rounded-lg shadow-sm h-full pb-4">
                    <div className="border p-4 bg-gray-50 rounded-md h-full">
                        <h3 className="text-xl font-bold mb-4">Live Preview</h3>
                        {/* iframe that will show the HTML/CSS content */}
                        <iframe
                            ref={iframeRef}
                            title="Preview"
                            className="w-full border p-2 rounded-md"
                            style={{ borderColor: "#ccc", height: "90%" }}
                        ></iframe>
                    </div>
                </TabsContent>

                <TabsContent value="html" className="bg-white rounded-lg shadow-sm h-full pb-4">
                    <div className="border p-4 bg-gray-50 rounded-md h-full relative">
                        <h3 className="text-xl font-bold mb-4">HTML</h3>
                        <button
                            onClick={() => copyToClipboard(htmlContent)}
                            className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                            <Copy className="w-4 h-4 text-gray-600" />
                        </button>
                        <pre className="language-html">
                            <code>{htmlContent}</code>
                        </pre>
                    </div>
                </TabsContent>

                <TabsContent value="css" className="bg-white rounded-lg shadow-sm h-full pb-4">
                    <div className="border p-4 bg-gray-50 rounded-md h-full relative">
                        <h3 className="text-xl font-bold mb-4">CSS</h3>
                        <button
                            onClick={() => copyToClipboard(cssContent)}
                            className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                            <Copy className="w-4 h-4 text-gray-600" />
                        </button>
                        <pre className="language-css">
                            <code>{cssContent}</code>
                        </pre>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};
