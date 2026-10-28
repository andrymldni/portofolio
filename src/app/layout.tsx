import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import MotionProvider from "@/components/layout/MotionProvider";
import ScrollTrace from "@/components/effects/ScrollTrace";
import { CONTACT_EMAIL, socialLinks } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f5f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0b0d" },
  ],
  colorScheme: "light dark",
};

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
  email: `mailto:${CONTACT_EMAIL}`,
  sameAs: Object.values(socialLinks).map((social) => social.href),
};

// Inisialisasi tema secepat mungkin (hindari FOUC)
const themeInit = `(() => {
  try {
    const key = 'theme';
    const saved = localStorage.getItem(key);
    const theme = saved === 'light' ? 'light' : 'dark';
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
      <body className={`${spaceGrotesk.className} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-canvas focus:px-4 focus:py-3 focus:text-ink focus:ring-2 focus:ring-brand"
        >
          Skip to main content
        </a>
        <MotionProvider>
          <div className="light-sweep" aria-hidden="true" />
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
