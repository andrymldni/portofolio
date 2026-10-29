import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import MotionProvider from "@/components/layout/MotionProvider";
import OpeningLoader from "@/components/layout/OpeningLoader";
import PageTransition from "@/components/layout/PageTransition";
import { CONTACT_EMAIL, socialLinks } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

// Geist is self-hosted from ./fonts so `next dev` and `next build` never
// need to reach Google Fonts (a failed download breaks Turbopack builds).
const geistSans = localFont({
  src: "./fonts/geist-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-geist-sans",
  display: "swap",
  preload: true,
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-geist-mono",
  display: "swap",
  // Small labels can load on demand instead of competing with the hero.
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#111418",
  colorScheme: "dark light",
};

const SITE_TITLE = "Andry Syva Maldini – Data Analyst & Data Scientist Portfolio";
const SITE_DESCRIPTION =
  "Portfolio of Andry Syva Maldini, a Data Analyst and Data Scientist from Jakarta, Indonesia — data pipelines, predictive modeling, and BI dashboards built with Python, SQL, Spark & Power BI.";

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
    "Data Analyst",
    "Data Engineer",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta",
    addressCountry: "ID",
  },
  email: `mailto:${CONTACT_EMAIL}`,
  sameAs: Object.values(socialLinks).map((social) => social.href),
};

// Inisialisasi tema secepat mungkin (hindari FOUC)
const themeInit = `(() => {
  try {
    const key = 'theme';
    const saved = localStorage.getItem(key);
    const theme = saved === 'light' || saved === 'dark' ? saved : 'dark';
    document.documentElement.dataset.theme = theme;
  } catch {}
})();`;

const loaderInit = `(() => {
  try {
    const key = 'portfolio-loader-seen';
    if (sessionStorage.getItem(key)) {
      document.documentElement.dataset.loaderSkip = '';
    } else {
      sessionStorage.setItem(key, '1');
    }
  } catch {}
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script dangerouslySetInnerHTML={{ __html: loaderInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${geistSans.className} ${geistSans.variable} ${geistMono.variable}`}>
        <OpeningLoader />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-canvas focus:px-4 focus:py-3 focus:text-ink focus:ring-2 focus:ring-brand"
        >
          Skip to main content
        </a>
        <MotionProvider>
          <div className="grain" aria-hidden="true" />
          <ScrollProgress />
          <div className="app-shell">
            <Navbar />
            {children}
            <Footer />
          </div>
          <BackToTop />
          <PageTransition />
        </MotionProvider>
      </body>
    </html>
  );
}
