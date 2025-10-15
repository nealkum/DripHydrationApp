import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Droplet, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Treatments", href: "/treatments" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Droplet className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-semibold text-foreground">Drip Hydration</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={location === item.href ? "secondary" : "ghost"}
                asChild
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button asChild data-testid="button-book-treatment">
              <Link href="/treatments">Book Treatment</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-2" data-testid="mobile-menu">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={location === item.href ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`mobile-nav-${item.label.toLowerCase()}`}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
            <Button 
              className="w-full" 
              asChild
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-button-book-treatment"
            >
              <Link href="/treatments">Book Treatment</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
