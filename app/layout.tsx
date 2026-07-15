import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Providers } from "@/components/providers";
import { FloatingDock } from "@/components/chrome/floating-dock";
import { CommandHost } from "@/components/chrome/command-store";
import { ScrollProgress } from "@/components/chrome/scroll-progress";
import { BackToTop } from "@/components/chrome/back-to-top";
import { Cursor } from "@/components/chrome/cursor";
import { LoadingScreen } from "@/components/chrome/loading";
import { ThemeToggle } from "@/components/chrome/theme-toggle";
import { site } from "@/lib/site";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090B" },
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role.join(" · ")}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Musfique Ahmed",
    "AI Engineer",
    "Data Scientist",
    "Researcher",
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "NLP",
    "Next.js",
    "PyTorch",
    "Portfolio",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    title: `${site.name} — ${site.role.join(" · ")}`,
    description: site.description,
    siteName: site.name,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role.join(" · ")}`,
    description: site.description,
    images: [site.ogImage],
    creator: "@musfique",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: site.url,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: site.name,
              url: site.url,
              email: site.email,
              jobTitle: site.role.join(", "),
              sameAs: Object.values(site.socials),
              knowsAbout: [
                "Artificial Intelligence",
                "Machine Learning",
                "Deep Learning",
                "Computer Vision",
                "Natural Language Processing",
                "Data Science",
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <LoadingScreen />
          <ScrollProgress />
          <Cursor />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-ink"
          >
            Skip to content
          </a>
          <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-4 md:px-8">
            <div className="pointer-events-auto flex items-center gap-2">
              <a href="/" className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-accent shadow-glow-accent" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-1">
                  {site.shortName}
                </span>
              </a>
            </div>
            <div className="pointer-events-auto flex items-center gap-2">
              <nav className="hidden items-center gap-1 rounded-full border border-hairline bg-surface/70 px-1.5 py-1 backdrop-blur-md md:flex">
                <a href="/projects" className="rounded-full px-3 py-1.5 text-xs text-muted-1 transition-colors hover:bg-white/5 hover:text-white">Projects</a>
                <a href="/research" className="rounded-full px-3 py-1.5 text-xs text-muted-1 transition-colors hover:bg-white/5 hover:text-white">Research</a>
                <a href="/blog" className="rounded-full px-3 py-1.5 text-xs text-muted-1 transition-colors hover:bg-white/5 hover:text-white">Writing</a>
                <a href="/resume" className="rounded-full px-3 py-1.5 text-xs text-muted-1 transition-colors hover:bg-white/5 hover:text-white">Résumé</a>
              </nav>
              <ThemeToggle />
            </div>
          </header>
          <main id="main" className="relative min-h-screen pb-32">
            {children}
          </main>
          <FloatingDock />
          <CommandHost />
          <BackToTop />
          <div className="noise" aria-hidden />
        </Providers>
      </body>
    </html>
  );
}