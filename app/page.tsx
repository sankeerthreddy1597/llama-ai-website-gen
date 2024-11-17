'use client'

import { useState } from "react";

import { getChatResponse } from "@/actions/actions";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";



export default function Home() {
  const [userQuery, setUserQuery] = useState('');
  const [llamaResponse, setLlamaResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    setIsLoading(true);
    await getChatResponse({ content: userQuery, setUserQuery, setIsLoading, setLlamaResponse })
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>
        Welcome Screen
      </h1>
      <div className="flex items-center">
        <Textarea value={userQuery} onChange={(e) => setUserQuery(e.target.value)} placeholder="Enter Query" className="m-4 w-96" />
        <Button variant="secondary" onClick={handleOnClick} disabled={isLoading}> {isLoading ? 'Generating...' : 'Generate Response'}</Button>
      </div>
      <span>{llamaResponse}</span>
    </div>
  );
}
