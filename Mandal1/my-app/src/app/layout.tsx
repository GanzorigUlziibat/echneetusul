// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "My App",
  description: "Next.js demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="flex space-x-6 p-4 border-b border-neutral-800">
  <Link
    href="/"
    className="text-slate-200 visited:text-slate-200 hover:text-white hover:underline"
  >
    Нүүр
  </Link>
  <Link
    href="/about"
    className="text-slate-200 visited:text-slate-200 hover:text-white hover:underline"
  >
    Тухай
  </Link>
</nav>
        <main className="mx-auto max-w-4xl p-6">
  {children}
</main>
      </body>
    </html>
  );
}
