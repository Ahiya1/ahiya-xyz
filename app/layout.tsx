import "./globals.css";
import { Inter, DM_Sans, Cormorant_Garamond } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ahiya.xyz"),
  title: "Ahiya - A Space Becoming Human",
  description:
    "Technology that serves presence, not productivity. Building mirrors, tools, languages, ways of seeing at the edge space where ambition meets awareness.",
  keywords: [
    "consciousness technology",
    "contemplative computing",
    "spiritual tech",
    "human-centered design",
    "mindfulness apps",
    "sacred technology",
    "consciousness software",
    "meditation technology",
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
        width: 420,
        height: 210,
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
    icon: "/logo-symbol.png",
    shortcut: "/logo-symbol.png",
    apple: "/logo-symbol.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable} ${cormorant.variable}`}
    >
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
