import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import type { Treatment } from "@shared/schema";

const ingredientMap: Record<string, string[]> = {
  "myers-cocktail-plus": ["B-Complex", "B12", "Vitamin C", "Magnesium", "Glutathione", "Biotin", "Zinc"],
  "immunity-boost": ["B-Complex", "B12", "Vitamin C", "Glutathione"],
  "energy-boost": ["B-Complex", "B12", "Vitamin C"],
  "hydration-package": ["IV Fluids", "Electrolytes"],
  "beauty-drip": ["B-Complex", "B12", "Vitamin C", "Biotin", "Glutathione"],
  "hangover-iv": ["B-Complex", "B12", "Vitamin C", "Anti-Nausea", "Anti-Inflammatory"],
  "recovery-performance": ["B-Complex", "B12", "Vitamin C", "Magnesium", "Glutathione"],
  "migraine-relief": ["B12", "Magnesium", "Anti-Nausea", "Anti-Inflammatory"],
  "nad-iv-therapy": ["500mg NAD+"],
  "nad-boost": ["NAD+", "B-Complex", "B12", "Vitamin C", "Magnesium", "Glutathione"],
};

interface TreatmentCardProps {
  treatment: Treatment & { categorySlug?: string };
}

export function TreatmentCard({ treatment }: TreatmentCardProps) {
  const formattedPrice = (treatment.price / 100).toFixed(0);
  const ingredients = ingredientMap[treatment.slug] || [];
  
  const isFeatured = treatment.name.includes("Myers Cocktail") || 
                     treatment.name.includes("NAD+ Boost") ||
                     treatment.price >= 39900;

  const isBestSeller = treatment.name.includes("Hangover") || treatment.name.includes("Immunity");

  const durationText = treatment.duration >= 60 
    ? `${Math.floor(treatment.duration / 60)}-${Math.floor(treatment.duration / 60) + 1} hrs`
    : `${treatment.duration} min`;

  return (
    <Card 
      className="hover-elevate transition-all duration-200 overflow-visible group h-full flex flex-col"
      data-testid={`card-treatment-${treatment.id}`}
    >
      <div className="p-6 flex flex-col flex-1 relative">
        <div className="flex items-center gap-2 absolute top-3 right-3">
          {isFeatured && (
            <Badge className="bg-primary text-primary-foreground font-semibold uppercase text-xs" data-testid={`badge-popular-${treatment.id}`}>
              Most Popular
            </Badge>
          )}
          {isBestSeller && !isFeatured && (
            <Badge variant="secondary" className="font-semibold uppercase text-xs" data-testid={`badge-bestseller-${treatment.id}`}>
              Best Seller
            </Badge>
          )}
        </div>
        
        <h3 
          className="text-xl font-semibold mb-1 pr-24" 
          data-testid={`text-treatment-name-${treatment.id}`}
        >
          {treatment.name}
        </h3>

        <div className="flex items-baseline gap-3 mb-3">
          <span 
            className="text-2xl font-bold text-primary"
            data-testid={`text-price-${treatment.id}`}
          >
            ${formattedPrice}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {durationText}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {treatment.description}
        </p>

        {ingredients.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4" data-testid={`ingredients-${treatment.id}`}>
            {ingredients.slice(0, 5).map((ingredient) => (
              <Badge key={ingredient} variant="secondary" className="text-xs font-normal no-default-hover-elevate no-default-active-elevate">
                {ingredient}
              </Badge>
            ))}
            {ingredients.length > 5 && (
              <Badge variant="secondary" className="text-xs font-normal no-default-hover-elevate no-default-active-elevate">
                +{ingredients.length - 5} more
              </Badge>
            )}
          </div>
        )}

        <div className="mt-auto pt-3 flex gap-2">
          <Button 
            className="flex-1 font-semibold uppercase" 
            asChild
            data-testid={`button-book-${treatment.id}`}
          >
            <Link href={`/book/${treatment.slug}/location`}>Book Now</Link>
          </Button>
          <Button 
            variant="outline" 
            className="font-semibold uppercase"
            asChild
            data-testid={`button-details-${treatment.id}`}
          >
            <Link href={`/treatment/${treatment.slug}`}>Details</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
