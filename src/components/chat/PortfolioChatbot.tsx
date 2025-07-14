import { useState, useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { QuickQuestions } from "./QuickQuestions";
import { findAnswer } from "@/data/portfolio-qa";
import { Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const PortfolioChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi there! 👋 I'm your personal portfolio assistant. I can tell you everything about my skills, projects, and experience. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (messageText: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Get AI response
    const answer = findAnswer(messageText);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: answer,
      isUser: false,
      timestamp: new Date()
    };

    setIsTyping(false);
    setMessages(prev => [...prev, aiMessage]);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-center p-6 border-b border-border bg-card/50 backdrop-blur">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-gradient-to-r from-primary to-purple-600">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Portfolio AI Assistant
            </h1>
            <p className="text-sm text-muted-foreground">Ask me anything about my work!</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-background/95">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isUser={message.isUser}
          />
        ))}
        {isTyping && (
          <ChatMessage message="" isUser={false} isTyping={true} />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <QuickQuestions 
        onQuestionClick={handleSendMessage} 
        disabled={isTyping}
      />

      {/* Input */}
      <div className="border-t border-border bg-card/30 backdrop-blur">
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={isTyping}
        />
      </div>
    </div>
  );
};