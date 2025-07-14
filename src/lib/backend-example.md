# LLM Backend Integration Guide

This portfolio chatbot is designed to connect to your own LLM backend. Here's how to set it up:

## Environment Variables

Add to your `.env` file:
```
REACT_APP_API_URL=http://localhost:3001/api
```

## Backend API Endpoint

Your backend should have a `POST /api/chat` endpoint that accepts:

```json
{
  "message": "User's question",
  "conversation_id": "optional-conversation-id"
}
```

And returns:
```json
{
  "response": "Your LLM response",
  "conversation_id": "conversation-id-for-context"
}
```

## Example Node.js/Express Backend

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Your LLM integration (OpenAI, Anthropic, etc.)
const callLLM = async (message, conversationId) => {
  // Your LLM logic here
  // This should include your portfolio context and personality
  const systemPrompt = `You are [YOUR NAME], a passionate developer. 
  Answer questions about your experience, projects, and skills in first person.
  Be friendly, professional, and showcase your expertise.
  
  Your background:
  - Technologies: React, TypeScript, Node.js, etc.
  - Experience: X years in development
  - Projects: List your key projects
  - Contact: Your contact information
  `;
  
  // Call your preferred LLM API
  // Return the response
};

app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversation_id } = req.body;
    
    const response = await callLLM(message, conversation_id);
    
    res.json({
      response: response,
      conversation_id: conversation_id || Date.now().toString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Portfolio chatbot backend running on port 3001');
});
```

## Popular LLM APIs to integrate:
- OpenAI GPT-4
- Anthropic Claude
- Google Gemini
- Cohere
- Local models with Ollama

The chatbot will automatically fall back to demo responses if your backend is not available.