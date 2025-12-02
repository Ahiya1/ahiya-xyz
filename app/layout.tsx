import "./globals.css";
import { Inter, Crimson_Text } from "next/font/google";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://ahiya.xyz"),
  title: "Ahiya - Technology that serves presence",
  description:
    "Building contemplative technology from Sacred Potato energy. Each project is an exploration of consciousness through code.",
  keywords: [
    "contemplative technology",
    "consciousness",
    "sacred potato",
    "presence-first technology",
    "mindful development",
    "AI orchestration",
    "full-stack development",
    "meditation technology",
  ],
  authors: [{ name: "Ahiya Butman" }],
  creator: "Ahiya Butman",
  openGraph: {
    title: "Ahiya - Technology that serves presence",
    description: "Building contemplative technology from Sacred Potato energy",
    url: "https://ahiya.xyz",
    siteName: "Ahiya",
    images: [
      {
        url: "/logo-text.png",
        width: 420,
        height: 210,
        alt: "Ahiya - Building technology that serves presence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahiya - Technology that serves presence",
    description: "Building contemplative technology from Sacred Potato energy",
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
