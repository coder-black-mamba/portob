import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  isTyping?: boolean;
}

export const ChatMessage = ({ message, isUser, isTyping = false }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full animate-slide-up",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-lg",
          isUser
            ? "bg-chat-user text-chat-user-foreground ml-4"
            : "bg-chat-assistant text-chat-assistant-foreground mr-4 border border-border"
        )}
      >
        {isTyping ? (
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-current rounded-full animate-bounce-slow"></div>
              <div className="w-2 h-2 bg-current rounded-full animate-bounce-slow" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-current rounded-full animate-bounce-slow" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-xs opacity-70 ml-2">typing...</span>
          </div>
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        )}
      </div>
    </div>
  );
};