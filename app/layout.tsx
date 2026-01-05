import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { AppShell } from "@/components/app-shell";
import { TopContextProvider } from "@/lib/top-context/provider";
import { ReviewProvider } from "@/components/review/review-provider";
import { PracticeSeedProvider } from "@/components/practice/practice-seed-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Firsttimecontractor",
  description: "Contractor exam prep application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="ftc-theme"
        >
          <TopContextProvider>
            <ReviewProvider>
              <PracticeSeedProvider>
                <AppShell>{children}</AppShell>
              </PracticeSeedProvider>
            </ReviewProvider>
          </TopContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
