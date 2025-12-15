import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Timelines",
  description:
    "Transparent pricing for full-stack development services. Landing pages from $2,500, AI integration from $5,000, full MVP builds from $12,000. Book a free discovery call.",
  openGraph: {
    title: "Pricing & Timelines | Ahiya Butman",
    description:
      "Transparent pricing for full-stack development services. Landing pages, AI integration, and full MVP builds. Book a free discovery call.",
    url: "https://ahiya.xyz/pricing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing & Timelines | Ahiya Butman",
    description:
      "Transparent pricing for full-stack development services. Book a free discovery call.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
