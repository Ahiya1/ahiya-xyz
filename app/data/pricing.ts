/**
 * Pricing Data
 *
 * Service tier definitions and launch pricing configuration.
 * Update this file to adjust pricing, timelines, or promotional offers.
 */
export interface ServiceTier {
  id: string;
  name: string;
  timeline: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export const serviceTiers: ServiceTier[] = [
  {
    id: "landing-page",
    name: "Landing Page / Marketing Site",
    timeline: "1-2 weeks",
    price: "$2,500+",
    description: "Professional web presence that converts",
    features: [
      "Custom design matching your brand",
      "Mobile-responsive",
      "SEO optimized",
      "Contact form integration",
    ],
  },
  {
    id: "ai-agent",
    name: "AI Agent Integration",
    timeline: "2-3 weeks",
    price: "$5,000+",
    description: "Connect AI that does things to your product",
    features: [
      "Custom AI agent development",
      "API integration",
      "User-facing interface",
      "Testing and deployment",
    ],
    highlighted: true,
  },
  {
    id: "full-mvp",
    name: "Full MVP Build",
    timeline: "4-6 weeks",
    price: "$12,000+",
    description: "From idea to working product",
    features: [
      "Full-stack development",
      "Database design",
      "Authentication",
      "Deployment pipeline",
    ],
  },
  {
    id: "consulting",
    name: "Strategy Consulting",
    timeline: "Per session",
    price: "$100/hr",
    description: "Expert guidance on AI integration",
    features: [
      "Architecture review",
      "Technology selection",
      "Integration strategy",
      "Best practices",
    ],
  },
];

/**
 * Launch pricing configuration
 * Set `active: false` to hide the launch pricing banner
 */
export const launchPricingConfig = {
  message: "Launch Pricing",
  subtext: "Available for the next 5 clients or through March 2025",
  active: true,
};

export default serviceTiers;
