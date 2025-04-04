
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
          <div key={index} className="flex flex-col items-center relative">
            <div
              className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center font-medium text-sm",
                index <= currentStep 
                  ? "gradient-bg text-white shadow-lg" 
                  : "bg-gray-100 dark:bg-gray-700 text-muted-foreground"
              )}
            >
              {index + 1}
            </div>
            <span className={cn(
              "text-sm mt-3 text-center",
              index <= currentStep ? "font-medium" : "text-muted-foreground"
            )}>{step}</span>
            
            {/* Connect lines between steps */}
            {index < steps.length - 1 && (
              <div className="absolute h-[2px] w-[100px] top-6 left-[calc(100%_-_12px)] -z-10">
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
                <div 
                  className={cn(
                    "absolute top-0 left-0 h-full gradient-bg transition-all duration-300",
                    index < currentStep ? "w-full" : "w-0"
                  )}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
