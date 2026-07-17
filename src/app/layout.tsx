import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const heading = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pathwise — Learn anything, on your schedule",
  description:
    "Pathwise generates a personalized, time-boxed learning roadmap after a short AI conversation about your skills, timeline, and availability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${body.variable} ${heading.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-bg text-foreground antialiased">
        <Providers>
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
