# Iteration 2: Portfolio & Business Content - Plan Overview

## Iteration Goal
Create a professional business homepage with portfolio showcase, "How I Work" section, and contact section. Transform the "Coming Soon" placeholder into a complete business presence.

## Scope Summary

Based on exploration findings and master-plan.yaml:

### What We're Building

1. **New Homepage (`app/page.tsx`)**
   - Hero section with professional headline
   - Portfolio section with 4 project cards
   - "How I Work" section introducing 2L methodology
   - Contact section with email and GitHub
   - Footer with Soul link

2. **Reusable Components**
   - `Navigation.tsx` - Business-focused navigation (Portfolio, How I Work, Contact, Soul)
   - `Footer.tsx` - Shared footer component
   - `PortfolioCard.tsx` - Project showcase card
   - `SectionHeading.tsx` - Consistent section headers

### Design Decisions

Based on exploration findings:

1. **Page Structure** - Use single-page layout with anchor sections (#portfolio, #how-i-work, #contact)
2. **Navigation** - Create new Navigation component (not reuse MobileNav which is Soul-specific)
3. **Card Design** - Adapt contemplative-card pattern for professional portfolio cards
4. **Animations** - Keep subtle: animate-fade-in for page load, hover transitions only
5. **Color Scheme** - Maintain existing purple/slate on #0a0f1a background

### Portfolio Projects (from master-plan.yaml)

1. **Mirror of Dreams** - AI Reflection Tool (Next.js, TypeScript, Claude API, PayPal, Supabase, tRPC)
2. **Wealth** - Personal Finance SaaS (Next.js, TypeScript, Prisma, PostgreSQL, Claude API, tRPC)
3. **StatViz** - Statistical Reports Platform (Next.js, TypeScript, Prisma, PostgreSQL, JWT)
4. **AI Research Pipeline** - Factorial Design Research Tool (Next.js 15, TypeScript, React 19, Tailwind CSS)

### Copy Content (from master-plan.yaml)

**Hero:**
- Headline: "I Build SaaS Systems Fast"
- Subheadline: "Full-stack development powered by AI orchestration. From idea to deployed product, independently."
- CTAs: [View Portfolio] [Work With Me]

**Portfolio Header:**
- Title: "What I've Built"
- Description: "Real systems, deployed and running. Each project showcases end-to-end development: architecture, implementation, and deployment."

**How I Work:**
- Title: "How I Work"
- Content about 2L methodology
- CTA: "Ask me about it →"

**Contact:**
- Title: "Work With Me"
- Description: "Looking for a developer who can own your next feature or MVP?"
- Email: ahiya.butman@gmail.com
- GitHub: github.com/Ahiya1

**Footer:**
- Soul link: "The philosophical side →"
- Copyright: "Built by Ahiya Butman"

## Builder Assignment

| Builder | Focus | Files |
|---------|-------|-------|
| Builder-1 | Homepage structure with Hero section | `app/page.tsx` (main structure), `app/components/SectionHeading.tsx` |
| Builder-2 | Portfolio section with 4 project cards | `app/components/PortfolioCard.tsx`, portfolio section in page.tsx |
| Builder-3 | How I Work + Contact sections | How I Work and Contact sections in page.tsx |
| Builder-4 | Navigation + Footer components | `app/components/Navigation.tsx`, `app/components/Footer.tsx`, integrate into page.tsx |

## Success Criteria

1. Clear business value proposition visible within 3 seconds
2. 4 projects displayed with accurate descriptions and tech stacks
3. Contact info accessible (email, GitHub)
4. Mobile responsive design
5. Professional appearance
6. All navigation links functional
7. Builds without errors

## Integration Strategy

- All builders work on same `app/page.tsx` but in clearly separated sections
- Builder-1 creates initial page structure with placeholders
- Other builders fill in their sections
- Builder-4 creates shared components first, then integrates into page
- Integration phase will merge all sections into cohesive page

## Risk Mitigations

1. **Content conflicts** - Clear section boundaries in page.tsx
2. **Style inconsistencies** - All use existing CSS classes from globals.css
3. **Animation performance** - Keep animations minimal per exploration recommendations
