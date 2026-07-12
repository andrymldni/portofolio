import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Starfield from "@/components/Starfield";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0E" },
  ],
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  title: "Andry – Portfolio",
  description: "A modern portfolio with smooth animations and fast performance",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={`${jakarta.className} ${jakarta.variable}`}>
        {/* Background Layers */}
        <Starfield />
        <div className="ambient-glow" />
        {/* App */}
        <div className="app-shell">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
