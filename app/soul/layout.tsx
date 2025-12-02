import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soul | Ahiya - Consciousness-First Technology",
  description:
    "A space for consciousness exploring itself through contemplative technology, writing, and the sacred art of building with reverence.",
  keywords: [
    "consciousness",
    "contemplative technology",
    "sacred potato",
    "presence",
    "AI with soul",
    "Ahiya Butman",
  ],
  authors: [{ name: "Ahiya Butman" }],
  openGraph: {
    title: "Soul | Ahiya - Consciousness-First Technology",
    description:
      "A space for consciousness exploring itself through contemplative technology, writing, and the sacred art of building with reverence.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soul | Ahiya - Consciousness-First Technology",
    description:
      "A space for consciousness exploring itself through contemplative technology.",
  },
};

export default function SoulLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
