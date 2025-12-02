import type { PortfolioProject } from "@/app/components/PortfolioCard";

/**
 * Portfolio Projects Data
 *
 * A collection of projects showcasing technical capabilities and experience.
 * Each project demonstrates different aspects of full-stack development,
 * AI integration, and modern web technologies.
 */
export const portfolioProjects: PortfolioProject[] = [
  {
    id: "mirror-of-dreams",
    title: "Mirror of Dreams",
    subtitle: "AI Reflection Tool",
    description:
      "Tiered AI-powered reflection platform with PayPal subscriptions. Users explore dreams through 5 sacred questions and receive personalized insights.",
    status: "live",
    liveUrl: "https://selahmirror.xyz",
    detailUrl: "/projects/mirror-of-dreams",
    techStack: ["Next.js", "TypeScript", "Claude API", "PayPal", "Supabase", "tRPC"],
  },
  {
    id: "wealth",
    title: "Wealth",
    subtitle: "Personal Finance SaaS",
    description:
      "Complete financial tracking system with AI-powered categorization, Israeli bank connections, budgeting, and goal tracking.",
    status: "live",
    liveUrl: "https://selahwealth.xyz",
    detailUrl: "/projects/wealth",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Claude API", "tRPC"],
  },
  {
    id: "statviz",
    title: "StatViz",
    subtitle: "Statistical Reports Platform",
    description:
      "Secure B2B platform for delivering interactive statistical reports to academic students. Password-protected access with Hebrew support.",
    status: "live",
    liveUrl: "https://statviz.xyz",
    detailUrl: "/projects/statviz",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "JWT"],
  },
  {
    id: "ai-research-pipeline",
    title: "AI Research Pipeline",
    subtitle: "Factorial Design Research Tool",
    description:
      "Factorial design research tool for generating culturally nuanced, emotionally authentic questionnaire responses at scale. Supports any research domain with precise demographic control.",
    status: "live",
    detailUrl: "/projects/ai-research-pipeline",
    techStack: ["Next.js 15", "TypeScript", "React 19", "Tailwind CSS"],
  },
];

export default portfolioProjects;
