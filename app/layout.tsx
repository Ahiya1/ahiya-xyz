import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ahiya - A Space Becoming Human",
  description:
    "Technology that serves presence, not productivity. Building mirrors, tools, languages, ways of seeing at the edge space where ambition meets awareness.",
  keywords: [
    "consciousness",
    "technology",
    "meditation",
    "contemplation",
    "AI",
    "spiritual tech",
    "human-centered design",
  ],
  authors: [{ name: "Ahiya Butman" }],
  creator: "Ahiya Butman",
  openGraph: {
    title: "Ahiya - A Space Becoming Human",
    description: "Technology that serves presence, not productivity",
    url: "https://ahiya.xyz",
    siteName: "Ahiya",
    images: [
      {
        url: "/logo-text.png",
        width: 300,
        height: 150,
        alt: "Ahiya - A space becoming human",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahiya - A Space Becoming Human",
    description: "Technology that serves presence, not productivity",
    images: ["/logo-text.png"],
    creator: "@ahiya",
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo-symbol.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
