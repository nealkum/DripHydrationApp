import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MobileApp } from "./mobile/MobileApp";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MobileApp />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
