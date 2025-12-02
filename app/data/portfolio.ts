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
    liveUrl: "https://mirror-of-truth.xyz",
    techStack: ["Next.js", "TypeScript", "Claude API", "PayPal", "Supabase", "tRPC"],
  },
  {
    id: "wealth",
    title: "Wealth",
    subtitle: "Personal Finance SaaS",
    description:
      "Complete financial tracking system with AI-powered categorization, Israeli bank connections, budgeting, and goal tracking.",
    status: "live",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Claude API", "tRPC"],
  },
  {
    id: "statviz",
    title: "StatViz",
    subtitle: "Statistical Reports Platform",
    description:
      "Secure B2B platform for delivering interactive statistical reports to academic students. Password-protected access with Hebrew support.",
    status: "live",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "JWT"],
  },
  {
    id: "ai-research-pipeline",
    title: "AI Research Pipeline",
    subtitle: "Factorial Design Research Tool",
    description:
      "Research tool for generating controlled prompts for academic study on youth sports dropout in Israel. Supports random, equal, and weighted distributions.",
    status: "live",
    techStack: ["Next.js 15", "TypeScript", "React 19", "Tailwind CSS"],
  },
];

export default portfolioProjects;
