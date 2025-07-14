import { chatbotConfig } from "@/config/chatbot-config";
import OpenAI from "openai";

console.log(import.meta.env.VITE_MOONSHOT_API_KEY);
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
  console.log("sendMessageToLLM");
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


    // use seperate server for this :) 
    // console.log(import.meta.env.VITE_MOONSHOT_API_KEY);
    // const client = new OpenAI({
    //     apiKey: import.meta.env.VITE_MOONSHOT_API_KEY,    
    //     baseURL: "https://api.moonshot.ai/v1",
    //     dangerouslyAllowBrowser: true
    // });
    
    // const response = await client.chat.completions.create({
    //         model: "moonshot-v1-8k",         
    //         messages: [ 
    //             {role: "system", content: "You are Kimi, an AI assistant provided by Moonshot AI. You are proficient in Chinese and English conversations. You provide users with safe, helpful, and accurate answers. You will reject any questions involving terrorism, racism, or explicit content. Moonshot AI is a proper noun and should not be translated."},
    //             {role: "user", content: "Hello, my name is Li Lei. What is 1+1?"}
    //         ],
    //         temperature: 0.3
    //     });
    //   console.log(response);
    //   console.log(response.choices[0].message.content);

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

  if (lowerMessage.includes('cv')) {
    return chatbotConfig.fallbackResponses.cv;
  }
  if (lowerMessage.includes('resume')) {
    return chatbotConfig.fallbackResponses.cv;
  }

  if (lowerMessage.includes('tech')) {
    return chatbotConfig.fallbackResponses.technology;
  }

  if (lowerMessage.includes('technology')) {
    return chatbotConfig.fallbackResponses.technology;
  }

  if (lowerMessage.includes('experience')) {
    return chatbotConfig.fallbackResponses.experience;
  }
  return chatbotConfig.fallbackResponses.default;
};