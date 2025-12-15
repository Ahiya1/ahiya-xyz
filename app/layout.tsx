import "./globals.css";
import { Inter, Crimson_Text } from "next/font/google";
import type { Metadata, Viewport } from "next";

import { AmbientLayer } from "@/app/components/ambient";
import { TrackingProvider } from "@/app/components/TrackingProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const crimson = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-crimson",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ahiya.xyz"),
  title: {
    template: "%s | Ahiya Butman",
    default: "Ahiya Butman - Full-Stack Developer | SaaS & AI Systems",
  },
  description:
    "I build complete SaaS systems fast using AI-powered development. Full-stack, from idea to deployment. View my portfolio.",
  keywords: [
    "full-stack developer",
    "SaaS development",
    "AI integration",
    "freelance developer",
    "Next.js",
    "TypeScript",
    "startup MVP",
  ],
  authors: [{ name: "Ahiya Butman" }],
  creator: "Ahiya Butman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ahiya.xyz",
    siteName: "Ahiya Butman",
    title: "Ahiya Butman - Full-Stack Developer | SaaS & AI Systems",
    description:
      "I build complete SaaS systems fast using AI-powered development. Full-stack, from idea to deployment. View my portfolio.",
    images: [
      {
        url: "/logo-text.png",
        width: 420,
        height: 210,
        alt: "Ahiya Butman - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahiya Butman - Full-Stack Developer | SaaS & AI Systems",
    description:
      "I build complete SaaS systems fast using AI-powered development.",
    images: ["/logo-text.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo-symbol-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-symbol-16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/logo-symbol-32.png",
    apple: "/logo-symbol-180.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${crimson.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ahiya Butman",
              jobTitle: "Full-Stack Developer",
              description:
                "I build complete SaaS systems fast using AI-powered development.",
              url: "https://ahiya.xyz",
              sameAs: ["https://github.com/Ahiya1"],
              knowsAbout: [
                "Next.js",
                "TypeScript",
                "React",
                "SaaS Development",
                "AI Integration",
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <AmbientLayer />
        <TrackingProvider>
          {children}
        </TrackingProvider>
      </body>
    </html>
  );
}
