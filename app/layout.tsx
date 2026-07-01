import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const siteUrl = "https://flyprep.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Fly Prep — The SAT platform built for 1500+",
  description:
    "Verified content. AI tutor. Real analytics. Join the founder waitlist. First 100 members get 40% off for life.",
  openGraph: {
    title: "Fly Prep — The SAT platform built for 1500+",
    description:
      "Verified content. AI tutor. Real analytics. Join the founder waitlist. First 100 members get 40% off for life.",
    url: siteUrl,
    siteName: "Fly Prep",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fly Prep — The SAT platform built for 1500+",
    description:
      "Verified content. AI tutor. Real analytics. Join the founder waitlist.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-base font-sans text-text-primary antialiased">
        {children}
        {plausibleDomain && (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.tagged-events.js"
            strategy="afterInteractive"
          />
        )}
        {clarityId && (
          <Script id="ms-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");`}
          </Script>
        )}
      </body>
    </html>
  );
}
