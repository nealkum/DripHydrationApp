import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, Zap, Heart, MapPin, Clock, Shield } from "lucide-react";

export default function Home() {
  const categories = [
    {
      id: "vitamin-wellness",
      name: "Vitamin & Wellness IVs",
      description: "Essential vitamins and hydration for energy, immunity, and recovery",
      icon: Droplet,
      slug: "vitamin-wellness",
    },
    {
      id: "nad-therapy",
      name: "NAD+ Therapy",
      description: "Advanced anti-aging and cellular health treatments",
      icon: Zap,
      slug: "nad-therapy",
    },
    {
      id: "injectable-boosters",
      name: "Injectable Boosters",
      description: "Quick vitamin shots for targeted wellness support",
      icon: Heart,
      slug: "injectable-boosters",
    },
  ];

  const features = [
    {
      icon: MapPin,
      title: "100+ Cities",
      description: "Available nationwide and internationally",
    },
    {
      icon: Clock,
      title: "Same-Day Booking",
      description: "Appointments available within 2 hours",
    },
    {
      icon: Shield,
      title: "Licensed Nurses",
      description: "ER/ICU experienced RNs at your service",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/20 py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-foreground">
                Premium IV Therapy
                <br />
                <span className="text-primary font-normal">Delivered to You</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Professional in-home IV hydration and wellness treatments. Same-day appointments with licensed nurses across 100+ cities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="h-12 text-base font-semibold"
                  asChild
                  data-testid="button-book-now"
                >
                  <Link href="/treatments">Book Your Treatment</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-12 text-base font-semibold"
                  asChild
                  data-testid="button-learn-more"
                >
                  <Link href="/treatments">Browse Services</Link>
                </Button>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
                <Droplet className="w-32 h-32 text-primary opacity-30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-16 border-b">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid sm:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4" data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Choose Your Treatment
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select from our curated collection of IV therapies and wellness treatments
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card 
                  key={category.id} 
                  className="hover-elevate transition-all duration-200 cursor-pointer"
                  data-testid={`card-category-${category.id}`}
                >
                  <Link href={`/treatments/${category.slug}`}>
                    <CardHeader className="space-y-4">
                      <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{category.name}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="w-full justify-between" data-testid={`button-view-${category.id}`}>
                        View Treatments
                        <span className="ml-2">→</span>
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
