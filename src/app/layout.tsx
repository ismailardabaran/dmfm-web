import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InteractiveEffects } from "@/components/InteractiveEffects";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digital Music For Migrants (DMFM) | Erasmus+ Project",
  description: "An Erasmus+ project to foster social integration of migrant students using digital music recording and collaborative compositions across Europe.",
  keywords: ["Erasmus+", "Digital Music", "Migrant Students", "Social Integration", "Music Education", "Europe"],
  authors: [{ name: "DMFM Project Consortium" }],
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-canvas-white text-midnight-charcoal font-sans">
        <LanguageProvider>
          <Header />
          <InteractiveEffects />
          <main className="relative z-10 flex-1 flex flex-col bg-transparent">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
