import type { Metadata } from "next";
import { Barlow, Barlow_Semi_Condensed, Spline_Sans_Mono } from "next/font/google";
import { profile, yearsSince } from "@/content";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const splineMono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-spline-mono",
  display: "swap",
});

const SITE_URL = "https://arnan.dev";
const description = `${profile.title} with ${yearsSince(profile.careerStart)} years in software, building mobile and web products in React Native, React and Next.js.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${profile.name} — ${profile.title}`,
  description,
  openGraph: {
    type: "profile",
    title: `${profile.name} — ${profile.title}`,
    description,
    url: SITE_URL,
  },
  alternates: { canonical: "/" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: SITE_URL,
  description,
  sameAs: profile.links.map((link) => link.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} ${splineMono.variable}`}
    >
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
