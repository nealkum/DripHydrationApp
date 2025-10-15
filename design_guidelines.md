# Drip Hydration IV Therapy Booking App - Design Guidelines

## Design Approach

**Reference-Based Approach:** Drawing inspiration from modern healthcare and wellness booking platforms (Zocdoc, One Medical) combined with premium booking experiences (Airbnb). The design emphasizes trust, cleanliness, and ease-of-use while maintaining a premium wellness aesthetic.

**Core Principles:**
- Medical trust through clean, professional design
- Calming wellness aesthetic with soft visual language
- Effortless mobile-first booking flow
- Premium service positioning without being clinical

## Color Palette

### Light Mode
- **Primary Brand:** 200 85% 45% (Deep teal-blue - conveys trust, health, hydration)
- **Primary Hover:** 200 85% 38%
- **Secondary/Accent:** 180 70% 92% (Soft aqua background)
- **Text Primary:** 210 20% 15%
- **Text Secondary:** 210 15% 45%
- **Background:** 0 0% 100%
- **Background Secondary:** 210 20% 98%
- **Border:** 210 20% 90%
- **Success:** 150 60% 45%
- **Warning:** 40 90% 60%

### Dark Mode
- **Primary Brand:** 200 75% 55%
- **Primary Hover:** 200 75% 48%
- **Secondary/Accent:** 200 35% 20%
- **Text Primary:** 210 20% 95%
- **Text Secondary:** 210 15% 70%
- **Background:** 215 25% 10%
- **Background Secondary:** 215 20% 15%
- **Border:** 210 15% 25%

## Typography

**Font Stack:**
- **Primary Font:** 'Inter' (Google Fonts) - Clean, medical-grade readability
- **Accent Font:** 'Playfair Display' (Google Fonts) - For hero headlines only, adds premium wellness touch

**Type Scale:**
- Hero Headline: text-4xl md:text-6xl font-light (Playfair Display)
- Section Headers: text-2xl md:text-3xl font-semibold
- Treatment Names: text-xl font-semibold
- Body Text: text-base leading-relaxed
- Small Text: text-sm
- Labels/Metadata: text-xs uppercase tracking-wide

## Layout System

**Spacing Primitives:** Use Tailwind units of 3, 4, 6, 8, 12, 16, 20
- Tight spacing: p-3, gap-3
- Standard spacing: p-4, gap-4, m-6
- Section spacing: py-12, py-16, py-20
- Large spacing: mt-20, mb-20

**Container Strategy:**
- Mobile-first: px-4, max-w-7xl mx-auto
- Breakpoints: sm:px-6, lg:px-8
- Content max-width: max-w-4xl for text-heavy sections

## Component Library

### Navigation
- Fixed mobile header with logo, location indicator, menu icon
- Clean white background with subtle shadow (shadow-sm)
- Mobile menu: Full-screen overlay with large touch targets (min-h-14)
- Desktop: Horizontal nav with categories dropdown

### Treatment Cards
- Clean card design with subtle elevation (shadow-md hover:shadow-lg transition)
- Treatment image (3:2 aspect ratio, rounded-t-lg)
- Content padding: p-5
- Includes: Name, duration, price, brief benefit list
- CTA button: Full-width on mobile, inline on desktop

### Step Indicator
- Horizontal progress bar at booking flow top
- 4 steps: Treatment → Address → Schedule → Payment
- Active step: Primary color, Completed: Success color, Upcoming: Gray
- Mobile: Show only current step name, Desktop: Show all steps

### Form Inputs
- Consistent height: h-12
- Rounded corners: rounded-lg
- Border: 2px border with focus:ring-2 focus:ring-primary
- Labels: Block, font-medium, text-sm, mb-2
- Error states: Red border, red text helper below

### Buttons
- Primary: bg-primary text-white, h-12, rounded-lg, font-semibold
- Outline: border-2 border-primary text-primary with backdrop-blur-sm when over images
- Touch targets: Minimum h-12 on mobile
- Icons: Use Heroicons (outline style)

### City Selector
- Searchable dropdown with autocomplete
- Group cities by region/state
- Recently selected cities at top
- Coverage badge: "100+ cities worldwide"

### Date/Time Picker
- Calendar grid with available dates highlighted
- Time slots in 2-hour windows
- "Same-day available" badge for immediate slots
- Disabled styling for unavailable times

### Payment Form (Mocked)
- Card input with icons (Heroicons: credit-card)
- CVV tooltip helper
- Order summary card with treatment breakdown
- Trust badges: "Secure checkout" with lock icon

### Confirmation Screen
- Large checkmark icon (Heroicons: check-circle)
- Appointment summary card
- Estimated arrival time with countdown
- "Add to calendar" button
- Nurse profile preview (name, photo placeholder)

## Images

### Hero Section (Home Page)
- **Large Hero Image:** Professional image of IV therapy setup or nurse preparing treatment in modern home setting. Conveys trust and professionalism. Image should show warm, bright, clean environment
- Aspect ratio: 16:9 on desktop, 4:3 on mobile
- Overlay: Subtle dark gradient (bottom to top) for text readability
- CTA buttons with backdrop-blur-sm background

### Treatment Category Images
- **Category Headers:** Lifestyle images showing wellness results (energetic person, glowing skin, athletic recovery)
- Use as background images with text overlay in category browsing

### Treatment Detail Pages
- **Product Images:** Clean product shots of IV bags and medical equipment on white/light backgrounds
- Before/after style imagery where applicable (energy levels, skin glow)

### Trust Elements
- Nurse portraits: Professional headshots with warm smiles
- Certification badges/logos if available
- City location imagery for coverage areas

## Animations

**Minimal and Purposeful:**
- Card hover: Subtle lift with shadow transition (duration-200)
- Button press: Scale down slightly (active:scale-98)
- Form focus: Ring animation (transition-shadow)
- Step progression: Slide transition between booking steps (slide-in from right)
- Success state: Checkmark draw animation on confirmation

**Avoid:** Complex parallax, continuous animations, distracting motion

## Mobile-Specific Considerations

- Bottom navigation for key actions (sticky CTA bar)
- Thumb-zone optimization: Primary actions in lower third
- Swipeable treatment galleries
- Location services integration prompt for address autofill
- Collapsible sections for long treatment descriptions
- Large, spaced-out touch targets (minimum 44x44px)

## Accessibility & Consistency

- Maintain WCAG AA contrast ratios (4.5:1 for text)
- Dark mode fully implemented across all components including forms
- Focus indicators visible for keyboard navigation
- Alt text for all treatment and lifestyle images
- Loading states for async operations (skeleton screens)
- Error messages clear and actionable