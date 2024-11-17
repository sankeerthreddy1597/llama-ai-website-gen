'use client'

import { useState } from "react";

import { getChatResponse } from "@/actions/actions";
import { handleStreamingResponse } from "@/utils/streaming-utils";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator";
import { ChatComponent } from "./_components/ChatComponent";

const TypingPlaceHolder = () => (
  <div className="typing">
    <div className="typing__dot"></div>
    <div className="typing__dot"></div>
    <div className="typing__dot"></div>
  </div>
)


export default function Home() {
  const [userQuery, setUserQuery] = useState('');
  const [chatUserQuery, setChatUserQuery] = useState('');

  const [llamaResponse, setLlamaResponse] = useState('');

  const [selectedStreamOption, setSelectedStreamOption] = useState('stream');

  const [isLoading, setIsLoading] = useState(false);
  const [isStreamLoading, setIsStreamLoading] = useState(false);

  const handleOnClick = async () => {
    setChatUserQuery(userQuery);
    setIsLoading(true);
    setIsStreamLoading(true);
    setLlamaResponse('');

    const stream = selectedStreamOption === 'stream' ? true : false

    try {
      const response = await getChatResponse({ content: userQuery, stream });

      await handleStreamingResponse(response, setLlamaResponse, setIsStreamLoading);

      setIsLoading(false);
      setUserQuery('')
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setUserQuery('');
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-8 lg:px-16 gap-4 font-[family-name:var(--font-geist-sans)]">
      <h1>
        AI Web Gen
      </h1>
      <div className="flex flex-col lg:flex-row items-center justify-items-start w-full px-2 lg:px-32">
        <Textarea
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Enter Query"
          className="lg:w-96" />
        <div className="flex flex-row items-center">
          <Button
            variant="primary"
            onClick={handleOnClick}
            disabled={isLoading}
            className="m-2"
          >
            {isLoading ? 'Generating...' : 'Generate Response'}
          </Button>

          <Select
            value={selectedStreamOption}
            onValueChange={(value) => setSelectedStreamOption(value)}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stream">Stream</SelectItem>
              <SelectItem value="no-stream">No Stream</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Separator className="w-4/5" />
      <div className="flex flex-col justify-items-start w-full px-4 lg:px-32 gap-2">
        <div>
          {chatUserQuery && <ChatComponent role="user" content={chatUserQuery} />}
        </div>
        <div className="flex flex-col justify-items-end items-end">
          {isStreamLoading ?
            <TypingPlaceHolder /> :
            llamaResponse && <ChatComponent role="Llama AI" content={llamaResponse} />}
        </div>
      </div>
    </div>
  );
}
