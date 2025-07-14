import { chatbotConfig } from "@/config/chatbot-config";

export interface ChatRequest {
  message: string;
  conversation_id?: string;
}

export interface ChatResponse {
  response: string;
  conversation_id?: string;
  error?: string;
}

// Configure your backend API endpoint here
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const sendMessageToLLM = async (message: string, conversationId?: string): Promise<ChatResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversation_id: conversationId,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ChatResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error calling LLM API:', error);
    return {
      response: "Sorry, I'm having trouble connecting right now. Please try again in a moment!",
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Fallback responses for when the API is not available
export const getFallbackResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('who') || lowerMessage.includes('about')) {
    return chatbotConfig.fallbackResponses.aboutYou;
  }
  
  if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
    return chatbotConfig.fallbackResponses.projects;
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
    return chatbotConfig.fallbackResponses.contact;
  }
  
  return chatbotConfig.fallbackResponses.default;
};