import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import MotionProvider from "@/components/layout/MotionProvider";
import ScrollTrace from "@/components/effects/ScrollTrace";

// Poppins is self-hosted from ./fonts so `next dev` and `next build` never
// need to reach Google Fonts (a failed download breaks Turbopack builds).
const poppins = localFont({
  src: [
    { path: "./fonts/poppins-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/poppins-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "./fonts/poppins-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f5f8" },
    { media: "(prefers-color-scheme: dark)", color: "#111418" },
  ],
  colorScheme: "light dark",
};

const SITE_URL = "https://andrymldni.dev";
const SITE_TITLE = "Andry Syva Maldini – Data Scientist & BI Portfolio";
const SITE_DESCRIPTION =
  "Portfolio of Andry Syva Maldini, a Data Scientist & Business Intelligence specialist from Jakarta, Indonesia — data pipelines, predictive modeling, and BI dashboards built with Python, SQL, Spark & Power BI.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · Andry Syva Maldini",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Andry Syva Maldini",
    "Data Scientist",
    "Data Analyst",
    "Business Intelligence",
    "Data Engineer",
    "Portfolio",
    "Python",
    "SQL",
    "Machine Learning",
    "Jakarta Indonesia",
  ],
  authors: [{ name: "Andry Syva Maldini", url: SITE_URL }],
  creator: "Andry Syva Maldini",
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "Andry Syva Maldini — Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@andrymldni",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: { canonical: "/" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Andry Syva Maldini",
  url: SITE_URL,
  jobTitle: [
    "Data Scientist",
    "Business Intelligence",
    "Data Analyst",
    "Data Engineer",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta",
    addressCountry: "ID",
  },
  email: "mailto:andrymldni@gmail.com",
  sameAs: [
    "https://github.com/andrymldni",
    "https://www.linkedin.com/in/andrymldni",
    "https://www.instagram.com/andrymldni",
    "https://twitter.com/andrymldni",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${poppins.className} ${poppins.variable}`}>
        <MotionProvider>
          <div className="grain" aria-hidden="true" />
          <ScrollTrace />
          <ScrollProgress />
          <div className="app-shell">
            <Navbar />
            {children}
            <Footer />
          </div>
          <BackToTop />
        </MotionProvider>
      </body>
    </html>
  );
}
