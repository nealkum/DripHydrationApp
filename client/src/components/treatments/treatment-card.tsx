import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign } from "lucide-react";
import type { Treatment } from "@shared/schema";

interface TreatmentCardProps {
  treatment: Treatment & { categorySlug?: string };
}

export function TreatmentCard({ treatment }: TreatmentCardProps) {
  const formattedPrice = (treatment.price / 100).toFixed(2);
  const formattedDuration = treatment.duration >= 60 
    ? `${Math.floor(treatment.duration / 60)}${treatment.duration % 60 > 0 ? `.${treatment.duration % 60}` : ''} hr${Math.floor(treatment.duration / 60) > 1 ? 's' : ''}`
    : `${treatment.duration} min`;

  return (
    <Card 
      className="hover-elevate transition-all duration-200 h-full flex flex-col"
      data-testid={`card-treatment-${treatment.id}`}
    >
      <CardHeader className="space-y-3 flex-1">
        {treatment.imageUrl && (
          <div className="aspect-[3/2] rounded-lg bg-muted overflow-hidden">
            <img 
              src={treatment.imageUrl} 
              alt={treatment.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardTitle className="text-xl" data-testid={`text-treatment-name-${treatment.id}`}>
          {treatment.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 leading-relaxed">
          {treatment.description}
        </CardDescription>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
          <div className="flex items-center gap-1" data-testid={`text-duration-${treatment.id}`}>
            <Clock className="w-4 h-4" />
            <span>{formattedDuration}</span>
          </div>
          <div className="flex items-center gap-1" data-testid={`text-price-${treatment.id}`}>
            <DollarSign className="w-4 h-4" />
            <span>${formattedPrice}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <Button 
          className="w-full" 
          asChild
          data-testid={`button-book-${treatment.id}`}
        >
          <Link href={`/treatment/${treatment.slug}`}>Book Now</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
