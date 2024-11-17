export const handleStreamingResponse = async (response: any, onUpdate: any, setIsStreamLoading: any) => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    // Once reader gets data and stars streaming, streamer loading state can be turned off
    setIsStreamLoading(false);
    while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = JSON.parse(decoder.decode(value));
        console.log(chunk);

        onUpdate((prevState: string) => prevState + chunk.message.content);
    }
}