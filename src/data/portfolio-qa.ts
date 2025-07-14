export interface QAItem {
  id: string;
  question: string;
  answer: string;
  tags?: string[];
}

export const portfolioQA: QAItem[] = [
  {
    id: "1",
    question: "Who are you?",
    answer: "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating innovative solutions that make a real impact. This portfolio chatbot is actually one of my projects - pretty cool, right?",
    tags: ["intro", "about"]
  },
  {
    id: "2",
    question: "What technologies do you work with?",
    answer: "I specialize in React, TypeScript, Node.js, Python, and cloud technologies like AWS and Supabase. I'm always exploring new tech and staying up-to-date with the latest trends in web development.",
    tags: ["skills", "tech"]
  },
  {
    id: "3",
    question: "What projects have you built?",
    answer: "I've built various projects including e-commerce platforms, SaaS applications, AI-powered tools, and this interactive portfolio chatbot! Each project taught me something new and pushed my skills further.",
    tags: ["projects", "experience"]
  },
  {
    id: "4",
    question: "What's your experience level?",
    answer: "I have several years of experience in full-stack development, working on both personal projects and client work. I've collaborated with teams and solo projects, always focusing on clean code and user experience.",
    tags: ["experience", "background"]
  },
  {
    id: "5",
    question: "Are you available for work?",
    answer: "Yes! I'm always open to discussing new opportunities, whether it's full-time positions, freelance projects, or collaboration. Feel free to reach out if you think we'd be a good fit!",
    tags: ["availability", "work"]
  },
  {
    id: "6",
    question: "How can I contact you?",
    answer: "You can reach me through email, LinkedIn, or GitHub. I'm pretty responsive and love connecting with fellow developers and potential collaborators. Links should be available in my contact section!",
    tags: ["contact", "communication"]
  },
  {
    id: "7",
    question: "What makes you unique as a developer?",
    answer: "I believe in combining technical excellence with creative problem-solving. I don't just write code - I craft solutions that are maintainable, scalable, and actually solve real problems. Plus, I built this chatbot portfolio, which shows I like to think outside the box!",
    tags: ["unique", "skills"]
  },
  {
    id: "8",
    question: "What's your development philosophy?",
    answer: "I believe in clean, readable code, continuous learning, and building with the user in mind. Every line of code should have a purpose, and every feature should enhance the user experience. Quality over quantity, always.",
    tags: ["philosophy", "approach"]
  }
];

export const quickQuestions = [
  "Who are you?",
  "What technologies do you use?",
  "Show me your projects",
  "Are you available for work?",
  "How can I contact you?"
];

export const findAnswer = (question: string): string => {
  const normalizedQuestion = question.toLowerCase().trim();
  
  // Direct matches
  const exactMatch = portfolioQA.find(qa => 
    qa.question.toLowerCase() === normalizedQuestion
  );
  if (exactMatch) return exactMatch.answer;
  
  // Keyword matching
  const keywordMatch = portfolioQA.find(qa => {
    const questionWords = normalizedQuestion.split(' ');
    const qaWords = qa.question.toLowerCase().split(' ');
    const tagWords = qa.tags?.join(' ').toLowerCase().split(' ') || [];
    
    return questionWords.some(word => 
      qaWords.some(qaWord => qaWord.includes(word)) ||
      tagWords.some(tagWord => tagWord.includes(word))
    );
  });
  
  if (keywordMatch) return keywordMatch.answer;
  
  // Default response
  return "That's an interesting question! While I don't have a specific answer for that, feel free to ask me about my experience, projects, technologies I use, or how to get in touch. You can also try one of the suggested questions below!";
};