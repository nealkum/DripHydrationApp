import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  name: string;
  status: "complete" | "current" | "upcoming";
}

interface StepIndicatorProps {
  steps: Step[];
}

export function StepIndicator({ steps }: StepIndicatorProps) {
  return (
    <nav aria-label="Progress" data-testid="step-indicator">
      <ol className="flex items-center justify-between gap-2">
        {steps.map((step, stepIdx) => (
          <li 
            key={step.id} 
            className={cn(
              "flex items-center flex-1",
              stepIdx !== steps.length - 1 && "pr-2"
            )}
          >
            <div className="flex items-center gap-2 flex-1">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                  step.status === "complete" && "bg-primary border-primary",
                  step.status === "current" && "border-primary bg-background",
                  step.status === "upcoming" && "border-border bg-background"
                )}
                data-testid={`step-${step.id}`}
              >
                {step.status === "complete" ? (
                  <Check className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <span
                    className={cn(
                      "text-sm font-medium",
                      step.status === "current" && "text-primary",
                      step.status === "upcoming" && "text-muted-foreground"
                    )}
                  >
                    {stepIdx + 1}
                  </span>
                )}
              </div>
              
              <span
                className={cn(
                  "text-sm font-medium hidden sm:inline",
                  step.status === "current" && "text-foreground",
                  step.status === "complete" && "text-muted-foreground",
                  step.status === "upcoming" && "text-muted-foreground"
                )}
              >
                {step.name}
              </span>
            </div>

            {stepIdx !== steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 flex-1 mx-2",
                  step.status === "complete" ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
