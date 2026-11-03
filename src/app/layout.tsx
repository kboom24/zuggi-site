import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE, absoluteUrl } from "@/lib/site";

const inter = localFont({ src: "../fonts/Inter.woff2", variable: "--font-inter", weight: "100 900", display: "swap" });
const oswald = localFont({ src: "../fonts/Oswald.woff2", variable: "--font-oswald", weight: "200 700", display: "swap" });
const racing = localFont({ src: "../fonts/PassionOne.woff2", variable: "--font-racing", weight: "700", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: { default: `${SITE.name}: ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: { siteName: SITE.name, type: "website", images: [{ url: absoluteUrl("/og.jpg") }] },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#1A0D2E", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} ${racing.variable}`}>
      <body className="antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded focus:bg-magenta focus:px-3 focus:py-2">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
