import { Button } from "@/components/ui/button";
import { chatbotConfig } from "@/config/chatbot-config";

interface QuickQuestionsProps {
  onQuestionClick: (question: string) => void;
  disabled?: boolean;
}

export const QuickQuestions = ({ onQuestionClick, disabled = false }: QuickQuestionsProps) => {
  return (
    <div className="px-4 py-2">
      <p className="text-xs text-muted-foreground mb-1 font-medium">Quick questions:</p>
      <div className="flex gap-2">
        {chatbotConfig.quickQuestions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onQuestionClick(question)}
            disabled={disabled}
            className="text-xs rounded-full hover:bg-rose-500  transition-colors"
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
};