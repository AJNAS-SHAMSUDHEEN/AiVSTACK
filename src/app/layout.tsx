import type { Metadata } from "next";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aivstack.com"),
  title: "AIVSTACK | Your Vision. Our Innovation. | Digital Solutions Agency",
  description:
    "AIVSTACK is a premier digital solutions and technology agency providing web development, software engineering, AI & automation, brand identity, and creative production.",
  keywords: [
    "AIVSTACK",
    "Digital Agency",
    "Web Development",
    "Software Development",
    "AI Automation",
    "Mobile Apps",
    "UI/UX Design",
    "Branding",
  ],
  authors: [{ name: "AIVSTACK" }],
  openGraph: {
    title: "AIVSTACK | Your Vision. Our Innovation.",
    description:
      "Transforming ideas into meaningful digital experiences through technology, creativity, and innovation.",
    url: "https://aivstack.com",
    siteName: "AIVSTACK",
    images: [
      {
        url: "/brand/logo.jpg",
        width: 1200,
        height: 630,
        alt: "AIVSTACK - Innovation • Technology • Creativity",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/brand/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#FAFAFF] text-[#24202D] relative selection:bg-[#A78BFA]/30 selection:text-[#30224D]">
        <LiquidBackground />
        <CursorGlow />
        <div className="relative z-10 flex min-h-full flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
