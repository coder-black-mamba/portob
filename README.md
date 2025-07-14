# Portfolio Chatbot

A modern, interactive portfolio website built as a chatbot interface. Users can chat with an LLM-powered version of you to learn about your skills, experience, and projects.

## Features

- 🤖 **LLM-Powered Conversations**: Real chatbot experience powered by your backend LLM
- 💬 **Modern Chat UI**: Beautiful message bubbles with typing indicators
- 🎨 **Stunning Design**: Dark theme with purple gradients and smooth animations
- 📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- 🔌 **Easy Backend Integration**: Simple API interface for your LLM backend
- 🚀 **Fallback Mode**: Graceful degradation when backend is unavailable

## Quick Start

1. **Clone and Install**
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
```

2. **Set up Environment**
```bash
# Create .env file
REACT_APP_API_URL=http://localhost:3001/api
```

3. **Run Development Server**
```bash
npm run dev
```

4. **Connect Your LLM Backend**
   - See `src/lib/backend-example.md` for backend integration guide
   - The chatbot runs in demo mode until you connect your backend

## Backend Integration

Your backend needs a `POST /api/chat` endpoint that:
- Accepts: `{ message: string, conversation_id?: string }`
- Returns: `{ response: string, conversation_id?: string }`

Example integrations available for:
- OpenAI GPT-4
- Anthropic Claude  
- Google Gemini
- Local LLMs with Ollama

## Customization

1. **Update Your Info**: Edit the system prompts and fallback responses in `src/services/chatApi.ts`
2. **Modify Quick Questions**: Update `src/data/portfolio-qa.ts`
3. **Customize Styling**: Adjust colors and animations in `src/index.css` and `tailwind.config.ts`
4. **Add Features**: Extend the chat interface with more components

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Build Tool**: Vite
- **Animations**: Custom Tailwind animations
- **Icons**: Lucide React
- **Backend**: Your choice of LLM API

## Deployment

The frontend can be deployed to any static hosting service:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Your own server

Your LLM backend can be deployed to:
- Railway
- Render
- Heroku
- AWS Lambda
- Your own VPS

---

Built with ❤️ using modern web technologies
