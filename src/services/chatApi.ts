import { chatbotConfig } from "@/config/chatbot-config";
import OpenAI from "openai";
import { getSystemPrompt } from "../config/chatbot-config";
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

function getConversationId() {
  return localStorage.getItem('conversation_id') || '';
}

function setConversationId(conversationId: string) {
  localStorage.setItem('conversation_id', conversationId);
}

// Configure your backend API endpoint here
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portob-backend.onrender.com/api';

export const sendMessageToLLM = async (message: string, conversationId?: string): Promise<ChatResponse> => {
  console.log("sendMessageToLLM");
  try {

    let prompt = getSystemPrompt();
    prompt += "\n\n User: " + message;
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message:prompt,
        conversation_id: getConversationId(),
      }),
    });
    const responseJson = await response.json();

    // {
    //   "conversation_id": "a90eeb14-38f2-4bcf-8300-e9b79c265ce1",
    //   "response": "## Hello!\nWelcome to Abu Sayed's developer portfolio. I'm glad you're here. How can I assist you today? Are you looking for information about Abu's projects, skills, or experience?"
    // }

    setConversationId(responseJson.conversation_id);


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

    if (response.status !== 200 || !responseJson.response) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ChatResponse = responseJson;
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