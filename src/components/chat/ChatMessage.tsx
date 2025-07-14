import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  isTyping?: boolean;
}

export const ChatMessage = ({ message, isUser, isTyping = false }: ChatMessageProps) => {
  const markdownComponents = {
    a: ({ node, ...props }: any) => (
      <a
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        className="underline break-words text-blue-600 hover:text-blue-800"
      />
    ),
    code({ node, inline, className, children, ...props }: any) {
      if (inline) {
        return (
          <code className="bg-muted px-1 py-0.5 rounded text-xs" {...props}>
            {children}
          </code>
        );
      }
      return (
        <pre className="bg-muted rounded p-3 overflow-auto">
          <code {...props}>{children}</code>
        </pre>
      );
    },
  };
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
            ? "bg-chat-user text-chat-user-foreground ml-4 bg-rose-500"
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
          <ReactMarkdown
            remarkPlugins={[remarkGfm as any]}
            components={markdownComponents}
            className="text-sm leading-relaxed whitespace-pre-wrap break-words"
          >
            {message}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};