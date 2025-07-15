import { useState, useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { QuickQuestions } from "./QuickQuestions";
import { User, MessageCircle, Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendMessageToLLM, getFallbackResponse } from "@/services/chatApi";

import { chatbotConfig } from "@/config/chatbot-config";
// import console from "console";

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
      text: chatbotConfig.welcomeMessage,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string>();
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("scrollToBottom");
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Periodically send conversation snapshot to backend
  useEffect(() => {
    const interval = setInterval(() => {
      const convId = localStorage.getItem("conversation_id");
      if (!convId) return;

      fetch("https://portob-backend.onrender.com/api/end-conversation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          conversation_id: convId,
          user_email: "abusayed@gmail.com"
        })
      })
        .then(res => res.json())
        .then(data => console.log("Snapshot sent", data))
        .catch(err => console.log(err));
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async (messageText: string) => {
    console.log(messageText);
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Call your LLM backend
      const response = await sendMessageToLLM(messageText, conversationId);
      
      if (response.error) {
        setIsOnline(false);
        toast({
          title: "Connection Issue",
          description: "Using fallback responses. Connect your LLM backend for full functionality.",
          variant: "destructive"
        });
      } else {
        setIsOnline(true);
        if (response.conversation_id) {
          setConversationId(response.conversation_id);
        }
      }

      // Simulate natural typing delay
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

      const botResponse = response.error ? getFallbackResponse(messageText) : response.response;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date()
      };

      setIsTyping(false);
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      setIsTyping(false);
      setIsOnline(false);
      console.error('Chat error:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getFallbackResponse(messageText),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border bg-card/50 backdrop-blur">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="p-1 rounded-full bg-gray-900 border border-gray-100">
              <div className="w-16 h-16">
                <img src="/images/casual-dp.jpg" alt="Abu Sayed" className="rounded-full w-full h-full" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border border-gray-100"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-rose-400 to-rose-600 bg-clip-text text-white">
              {chatbotConfig.name || "Abu Sayed"}
            </h1>
            <p className="text-sm text-muted-foreground">A Passionate AI Engineer • Let's Build Together!</p>
          </div>
        </div>
        
        {/* Connection Status */}
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <div className="flex items-center space-x-1 text-green-500 text-xs hidden md:flex">
              <Wifi className="h-3 w-3" />
              <span>LLM Connected</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-orange-500 text-xs hidden md:flex">
              <WifiOff className="h-3 w-3" />
              <span>Demo Mode</span>
            </div>
          )}
        </div>
      </div>

      {/* Connection Notice */}
      {!isOnline && (
        <div className="px-4 py-2 bg-orange-500/10 border-b border-orange-500/20">
          <p className="text-xs text-orange-600 text-center">
            💡 Running in demo mode. Connect your LLM backend at <code className="bg-orange-500/20 px-1 rounded">API_URL/chat</code> for full functionality
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-background/95 pb-64">
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
      <div className="w-full overflow-x-auto fixed bottom-16 left-0 right-0 max-w-4xl mx-auto bg-card/30 backdrop-blur">
        <QuickQuestions 
          onQuestionClick={handleSendMessage} 
          disabled={isTyping}
        />
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card/30 backdrop-blur fixed bottom-0 left-0 right-0 max-w-4xl mx-auto ">
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={isTyping}
          placeholder="Ask me about my projects, experience, or anything else..."
        />
      </div>
    </div>
  );
};