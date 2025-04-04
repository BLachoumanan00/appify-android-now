
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative">
            <div
              className={cn(
                "h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center font-medium text-sm",
                index <= currentStep 
                  ? "gradient-bg text-white shadow-lg" 
                  : "bg-gray-100 dark:bg-gray-700 text-muted-foreground"
              )}
            >
              {index + 1}
            </div>
            <span className={cn(
              "text-xs md:text-sm mt-2 md:mt-3 text-center",
              isMobile ? "max-w-[60px]" : "",
              index <= currentStep ? "font-medium" : "text-muted-foreground"
            )}>{step}</span>
            
            {/* Connect lines between steps */}
            {index < steps.length - 1 && (
              <div className={cn(
                "absolute h-[2px] top-5 md:top-6 -z-10",
                isMobile ? "w-[40px] left-[calc(100%_-_6px)]" : "w-[100px] left-[calc(100%_-_12px)]"
              )}>
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
