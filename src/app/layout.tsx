import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "TurkceYaz.im - Doğru Türkçe Kullanım Rehberi",
    template: "%s | TurkceYaz.im"
  },
  description: "Türkçe yazım kuralları, noktalama işaretleri, sık yapılan yazım yanlışları ve günün atasözü ile dilinizi doğru ve etkili kullanın.",
  keywords: [
    "Türkçe yazım kuralları",
    "doğru Türkçe kullanımı",
    "noktalama işaretleri",
    "yazım yanlışları",
    "atasözleri",
    "TDK sözlük",
    "Türkçe rehber"
  ],
  authors: [{ name: "Metin Faruk Bıyık" }],
  creator: "Metin Faruk Bıyık",
  publisher: "TurkceYaz.im",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "TurkceYaz.im - Doğru Türkçe Kullanım Rehberi",
    description: "Türkçe yazım kuralları, noktalama işaretleri ve daha fazlası için kapsamlı rehber.",
    url: "https://turkceyaz.im",
    siteName: "TurkceYaz.im",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TurkceYaz.im - Doğru Türkçe Kullanım Rehberi",
    description: "Türkçe yazım kuralları, noktalama işaretleri ve daha fazlası için kapsamlı rehber.",
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
  verification: {
    google: "google-site-verification-code", // Google Search Console doğrulama kodu eklenecek
  },
  metadataBase: new URL('https://turkceyaz.im'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} h-full`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-white`}>
        <Navigation />
        {children}
        <Footer />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-99VNV6FL9B"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-99VNV6FL9B');
          `}
        </Script>
      </body>
    </html>
  );
}
