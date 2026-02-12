import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Check, Clock, DollarSign, Search, Stethoscope, CheckCircle2, Shield, Star } from "lucide-react";
import type { Treatment } from "@shared/schema";

const ingredientMap: Record<string, string[]> = {
  "myers-cocktail-plus": ["B-Complex", "B12", "Vitamin C", "Lipostat (MIC)", "Magnesium", "Glutathione", "Biotin", "Zinc"],
  "immunity-boost": ["B-Complex", "B12", "Vitamin C", "Glutathione"],
  "energy-boost": ["B-Complex", "B12", "Vitamin C"],
  "hydration-package": ["IV Fluids", "Electrolytes"],
  "beauty-drip": ["B-Complex", "B12", "Vitamin C", "Biotin", "Glutathione"],
  "hangover-iv": ["B-Complex", "B12", "Vitamin C", "Anti-Nausea", "Anti-Inflammatory"],
  "recovery-performance": ["B-Complex", "B12", "Vitamin C", "Magnesium", "Glutathione"],
  "migraine-relief": ["B12", "Magnesium", "Anti-Nausea", "Anti-Inflammatory", "Diphenhydramine"],
  "nad-iv-therapy": ["500mg NAD+"],
  "nad-boost": ["NAD+", "B-Complex", "B12", "Vitamin C", "Magnesium", "Glutathione Push"],
};

const treatmentFaqs = [
  {
    question: "How quickly can a nurse arrive?",
    answer: "In most areas, a licensed nurse can arrive at your location within 2 hours of booking. Same-day appointments are available.",
  },
  {
    question: "How long does the treatment take?",
    answer: "Treatment duration varies. Most vitamin IVs take 30-45 minutes. NAD+ therapies take 2-3 hours depending on dosage.",
  },
  {
    question: "Is it safe?",
    answer: "Yes, all treatments are administered by licensed Registered Nurses with ER/ICU backgrounds. You'll have a medical screening before your first treatment.",
  },
  {
    question: "Do I need a prescription?",
    answer: "No prescription is needed. However, you will complete a medical screening with one of our providers before treatment.",
  },
];

export default function TreatmentDetail() {
  const [, params] = useRoute("/treatment/:slug");
  const treatmentSlug = params?.slug;

  const { data: treatments, isLoading } = useQuery<Treatment[]>({
    queryKey: ["/api/treatments"],
  });

  const treatment = treatments?.find((t) => t.slug === treatmentSlug);
  const relatedTreatments = treatments?.filter(
    (t) => t.slug !== treatmentSlug && t.categoryId === treatment?.categoryId
  )?.slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Skeleton className="h-10 w-32 mb-8" />
          <Skeleton className="h-12 w-96 mb-4" />
          <Skeleton className="h-6 w-64 mb-8" />
          <Skeleton className="h-64 w-full mb-8" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  if (!treatment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Treatment not found</h2>
          <Button asChild>
            <Link href="/treatments">Browse All Treatments</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formattedPrice = (treatment.price / 100).toFixed(0);
  const ingredients = ingredientMap[treatment.slug] || [];
  const formattedDuration = treatment.duration >= 60 
    ? `${Math.floor(treatment.duration / 60)}-${Math.floor(treatment.duration / 60) + 1} hours`
    : `${treatment.duration} minutes`;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button 
          variant="ghost" 
          className="mb-8" 
          asChild
          data-testid="button-back"
        >
          <Link href="/treatments">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Treatments
          </Link>
        </Button>

        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant="secondary" className="text-xs font-normal no-default-hover-elevate no-default-active-elevate">
                <Shield className="w-3 h-3 mr-1" />
                Licensed RN Administered
              </Badge>
              <Badge variant="outline" className="text-xs font-medium border-primary/30 text-primary no-default-hover-elevate no-default-active-elevate" data-testid="badge-hsa-fsa">
                HSA/FSA Eligible
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4" data-testid="text-treatment-name">
              {treatment.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2" data-testid="text-price">
                <DollarSign className="w-5 h-5" />
                <span className="text-2xl font-bold text-primary">${formattedPrice}</span>
              </div>
              <div className="flex items-center gap-2" data-testid="text-duration">
                <Clock className="w-5 h-5" />
                <span className="text-lg">{formattedDuration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm">4.9</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {treatment.description}
            </p>
          </div>

          {/* Ingredients */}
          {ingredients.length > 0 && (
            <div data-testid="section-ingredients">
              <h2 className="text-xl font-semibold mb-3">What's Included</h2>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient) => (
                  <Badge key={ingredient} variant="secondary" className="text-sm px-3 py-1 no-default-hover-elevate no-default-active-elevate">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Benefits</h2>
            <ul className="space-y-3">
              {treatment.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3" data-testid={`benefit-${index}`}>
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How It Works mini */}
          <Card className="bg-muted/30">
            <CardContent className="p-6" data-testid="section-how-it-works">
              <h2 className="text-xl font-semibold mb-4">How It Works</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Search, step: "1", title: "Book", desc: "Choose your date, time & location" },
                  { icon: Stethoscope, step: "2", title: "Relax", desc: "A licensed RN arrives at your door" },
                  { icon: CheckCircle2, step: "3", title: "Feel Better", desc: `Treatment takes ~${formattedDuration}` },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                          {item.step}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <div data-testid="section-faq">
            <h2 className="text-xl font-semibold mb-3">Common Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {treatmentFaqs.map((item, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`} data-testid={`treatment-faq-${idx}`}>
                  <AccordionTrigger className="text-left text-sm">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Related Treatments */}
          {relatedTreatments && relatedTreatments.length > 0 && (
            <div data-testid="section-related">
              <h2 className="text-xl font-semibold mb-3">Customers Also Booked</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedTreatments.map((related) => (
                  <Card key={related.id} className="hover-elevate cursor-pointer" data-testid={`related-${related.id}`}>
                    <Link href={`/treatment/${related.slug}`}>
                      <CardContent className="p-4">
                        <p className="font-semibold text-foreground text-sm mb-1">{related.name}</p>
                        <p className="text-primary font-bold">${(related.price / 100).toFixed(0)}</p>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Sticky CTA */}
          <div className="sticky bottom-20 py-4 bg-background border-t z-40">
            <Button 
              size="lg" 
              className="w-full font-semibold uppercase"
              asChild
              data-testid="button-book-now"
            >
              <Link href={`/book/${treatment.slug}/location`}>Book Now — ${formattedPrice}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
