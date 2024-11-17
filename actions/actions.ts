type OptionType = {
    headers?: {},
    method: string;
    body: any
}

type ChatType = {
    content: string,
    setUserQuery: any,
    setIsLoading: any,
    setLlamaResponse: any
}

const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
}

export const getChatResponse = async ({ content, setUserQuery, setIsLoading, setLlamaResponse }: ChatType) => {

    const body = JSON.stringify({
        model: 'llama3.2',
        messages: [{ role: 'user', content }],
        stream: false
    });

    const options: OptionType = {
        headers: defaultHeaders,
        method: 'POST',
        body
    };
    try {
        fetch('http://localhost:11434/api/chat', options)
            .then(res => res.json())
            .then(data => {
                setLlamaResponse(data?.message?.content);
                setIsLoading(false);
                setUserQuery('')
            });
    } catch (e) {
        console.log(e);
        setIsLoading(false);
        setUserQuery('');
    }
}