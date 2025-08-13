import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0E" },
  ],
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  title: "Andry – Portfolio",
  description: "Portfolio modern dengan animasi halus dan performa cepat",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Andry – Portfolio",
    description: "AI & Web Modern Portfolio",
    url: "https://andry.dev",
    siteName: "andrymldni.dev",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "Andry Portfolio" },
    ],
    type: "website",
  },
  alternates: { canonical: "/" },
};

// Inisialisasi tema secepat mungkin (hindari FOUC)
const themeInit = `(() => {
  try {
    const key = 'theme';
    const saved = localStorage.getItem(key);
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const theme = saved || (mql.matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
  } catch {}
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={inter.className}>
        {/* Background Layers (partikel dipindah ke CSS util) */}
        <div className="particles" />
        <div className="app-shell">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
