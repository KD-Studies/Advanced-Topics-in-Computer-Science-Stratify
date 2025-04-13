import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Stratify - Trading Intelligence',
  description: 'Simplify your strategy, amplify your success',
  icons: {
    icon: '/stratify-logo.png', // Standard Favicon
    shortcut: '/stratify-logo.png', // Shortcut Icon
    apple: '/stratify-logo.png', // Apple Touch Icon
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
