import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "LibrAspire — Find and Read Books Easily",
  description:
    "LibrAspire adalah platform pencarian dan pembacaan buku gratis menggunakan Open Library API. Temukan ribuan buku dari berbagai kategori dan baca langsung secara online.",
  keywords: ["library", "books", "open library", "free books", "read online"],
  authors: [{ name: "LibrAspire Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
        {children}
      </body>
    </html>
  );
}
