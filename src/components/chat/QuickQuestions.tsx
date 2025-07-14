import { Button } from "@/components/ui/button";
import { quickQuestions } from "@/data/portfolio-qa";

interface QuickQuestionsProps {
  onQuestionClick: (question: string) => void;
  disabled?: boolean;
}

export const QuickQuestions = ({ onQuestionClick, disabled = false }: QuickQuestionsProps) => {
  return (
    <div className="px-4 py-2">
      <p className="text-xs text-muted-foreground mb-3 font-medium">Quick questions:</p>
      <div className="flex flex-wrap gap-2">
        {quickQuestions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onQuestionClick(question)}
            disabled={disabled}
            className="text-xs rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
};