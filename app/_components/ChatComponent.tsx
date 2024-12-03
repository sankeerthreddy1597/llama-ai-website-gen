import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { cn } from "@/lib/utils";
import { Markdown } from "./Markdown";

type ChatComponentType = {
    role: 'user' | 'Llama AI';
    description?: string;
    content: string;
}

export const ChatComponent = ({ role = 'user', description, content }: ChatComponentType) => {
    return (
        <Card className={cn("lg:w-3/5 w-4/5 justify-items-end", role === 'Llama AI' ? 'bg-green-50' : '')}>
            <CardHeader>
                <CardTitle className="flex flex-row items-center gap-x-2">
                    <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>{role === 'user' ? 'U' : 'AI'}</AvatarFallback>
                    </Avatar>

                    {role}
                </CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <Markdown>
                        {content}
                    </Markdown>
                </div>
            </CardContent>
        </Card>
    )
}