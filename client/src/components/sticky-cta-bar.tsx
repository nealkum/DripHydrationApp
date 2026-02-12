import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

export function StickyCTABar() {
  const [location] = useLocation();

  const isBookingFlow = location.startsWith("/book/");
  const isConfirmation = location === "/booking/confirmation";
  const isTreatmentDetail = location.startsWith("/treatment/");

  if (isBookingFlow || isConfirmation || isTreatmentDetail) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 safe-area-bottom" data-testid="sticky-cta-bar">
      <div className="container mx-auto px-4 max-w-7xl py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>Same-Day Available</span>
          </div>
          <Button
            size="lg"
            className="flex-1 sm:flex-none font-semibold uppercase"
            asChild
            data-testid="sticky-button-book-now"
          >
            <Link href="/treatments">
              <Clock className="w-4 h-4 mr-2 sm:hidden" />
              Book Now — Nurse in 2 Hours
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
