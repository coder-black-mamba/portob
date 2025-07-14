import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput = ({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "Ask me anything about my portfolio..." 
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-2">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 rounded-full bg-gray-900 border border-gray-100 focus:bg-gray-900 focus:border-gray-100 focus:ring-rose-500 focus:ring-2 focus:outline-none transition-colors"
      />
      <Button
        type="submit"
        size="icon"
        disabled={disabled || !message.trim()}
        className="rounded-full bg-primary hover:bg-primary/90 transition-colors bg-rose-500 focus:ring-rose-500 focus:ring-2 focus:outline-none"
      >
        <Send className="h-4 w-6" />
      </Button>
    </form>
  );
};