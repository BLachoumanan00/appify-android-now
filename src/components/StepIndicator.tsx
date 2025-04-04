
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center font-semibold text-sm",
                index <= currentStep 
                  ? "gradient-bg text-white" 
                  : "bg-muted text-muted-foreground"
              )}
            >
              {index + 1}
            </div>
            <span className="text-sm mt-2 text-center">{step}</span>
          </div>
        ))}
      </div>
      <div className="w-full h-1 mt-5 bg-muted relative">
        <div 
          className="absolute top-0 left-0 h-full gradient-bg transition-all duration-300"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default StepIndicator;
