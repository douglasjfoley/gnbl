import type { Metadata, Viewport } from "next";
import { Poppins, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { getSite } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-poppins",
  display: "swap",
});
const source = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source",
  display: "swap",
});

const site = getSite();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${site.name} | Virginia Beach youth baseball`, template: `%s | ${site.shortName}` },
  description: `${site.tagline} ${site.positioning} Ages 3 to 18 on our own eight-field complex. PONY affiliated, 501(c)(3).`,
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
};

export const viewport: Viewport = {
  themeColor: "#0A162C",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${source.variable}`}>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        {children}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
