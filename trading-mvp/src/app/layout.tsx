import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from '@/components/ClientLayout';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Now this export is allowed since this file doesn't use "use client"
export const metadata: Metadata = {
  title: 'Stratify - Trading Intelligence',
  description: 'Simplify your strategy, amplify your success',
  icons: {
    icon: '/stratify-logo.png',
    shortcut: '/stratify-logo.png',
    apple: '/stratify-logo.png',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
