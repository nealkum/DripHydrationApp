import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Treatment } from "@shared/schema";
import ivBagImg1 from "@assets/stock_images/drip_hydration_iv_ba_2af79b96.jpg";
import ivBagImg2 from "@assets/stock_images/drip_hydration_iv_ba_e103c1ef.jpg";
import ivBagImg3 from "@assets/stock_images/drip_hydration_iv_ba_c0a4d315.jpg";
import ivBagImg4 from "@assets/stock_images/drip_hydration_iv_ba_3392b673.jpg";
import ivBagImg5 from "@assets/stock_images/drip_hydration_iv_ba_98e8bb0b.jpg";

interface TreatmentCardProps {
  treatment: Treatment & { categorySlug?: string };
}

const ivImages = [ivBagImg1, ivBagImg2, ivBagImg3, ivBagImg4, ivBagImg5];

export function TreatmentCard({ treatment }: TreatmentCardProps) {
  const formattedPrice = (treatment.price / 100).toFixed(0);
  
  const imageIndex = (typeof treatment.id === 'number' ? treatment.id : parseInt(treatment.id)) % ivImages.length;
  const ivImage = ivImages[imageIndex];
  
  const benefits = treatment.benefits ? treatment.benefits.slice(0, 3) : [];
  
  const isFeatured = treatment.name.includes("All-Inclusive") || 
                     treatment.name.includes("NAD+") ||
                     treatment.price >= 39900;

  return (
    <Card 
      className="hover-elevate transition-all duration-200 overflow-hidden group h-full flex flex-col"
      data-testid={`card-treatment-${treatment.id}`}
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        <img 
          src={treatment.imageUrl || ivImage}
          alt={treatment.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isFeatured && (
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground font-semibold uppercase text-xs px-3 py-1">
            Most Popular
          </Badge>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <h3 
          className="text-xl font-semibold mb-2" 
          data-testid={`text-treatment-name-${treatment.id}`}
        >
          {treatment.name}
        </h3>
        
        <p 
          className="text-2xl font-bold text-primary mb-3"
          data-testid={`text-price-${treatment.id}`}
        >
          ${formattedPrice}
        </p>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {treatment.description}
        </p>

        {benefits.length > 0 && (
          <ul className="text-sm text-muted-foreground mb-4 space-y-1">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2">•</span>
                <span className="line-clamp-1">{benefit}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-4">
          <Button 
            className="w-full font-semibold uppercase" 
            asChild
            data-testid={`button-book-${treatment.id}`}
          >
            <Link href={`/treatment/${treatment.slug}`}>Book Now</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
