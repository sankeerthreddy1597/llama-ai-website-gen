type OptionType = {
    headers?: {},
    method: string;
    body: any
}

type ChatType = {
    content: string,
    stream: boolean
}

type GenerateChatType = {
    messages: any,
};

const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
}

export const getChatResponse = async ({ content, stream }: ChatType): Promise<any> => {

    const body = JSON.stringify({
        model: 'llama3.2',
        messages: [{ role: 'user', content }],
        stream
    });

    const options: OptionType = {
        headers: defaultHeaders,
        method: 'POST',
        body
    };
    return await fetch('http://localhost:11434/api/chat', options);
}

export const generateChatResponse = async ({ messages }: GenerateChatType): Promise<any> => {

    const body = JSON.stringify({
        model: 'llama3.2',
        messages,
        stream: true
    });

    const options: OptionType = {
        headers: defaultHeaders,
        method: 'POST',
        body
    };

    console.log(body);
    return await fetch('http://localhost:11434/api/chat', options);
}