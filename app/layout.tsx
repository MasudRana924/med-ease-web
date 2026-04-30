import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/context/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Care Sync - Med-Ease Health Companion Portal 2026",
  description: "Med-Ease-Health-Portal-2026: Your ultimate health companion for medicines, nurses, and doctors. Secure and fast medical services at your fingertips.",
  keywords: ["Med-Ease-Health-Portal-2026", "Care Sync", "online medicine", "nursing care", "doctor appointment", "health services"],
  verification: {
    google: "_PGV2fNabEPLezfniBCYLdEE00j_4DpZCGiWzc2KVrg",
  },
  openGraph: {
    title: "Care Sync - Med-Ease Health Companion Portal 2026",
    description: "Med-Ease-Health-Portal-2026: Your ultimate health companion for medicines, nurses, and doctors.",
    url: "https://med-ease-seven.vercel.app/",
    siteName: "Care Sync",
    images: [
      {
        url: "https://med-ease-seven.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Med-Ease Health Portal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Care Sync - Med-Ease Health Companion Portal 2026",
    description: "Med-Ease-Health-Portal-2026: Your ultimate health companion for medicines, nurses, and doctors.",
    images: ["https://med-ease-seven.vercel.app/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Care Sync",
              "url": "https://med-ease-seven.vercel.app/",
              "description": "Med-Ease-Health-Portal-2026 - Your ultimate health companion for medicines, nurses, and medical services.",
              "sameAs": [
                "https://facebook.com/yourpage", // Replace with actual social links
                "https://twitter.com/yourhandle",
                "https://linkedin.com/company/yourcompany"
              ]
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
