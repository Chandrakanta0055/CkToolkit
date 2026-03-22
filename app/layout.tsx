import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OneToolkit — Free Online Tools for Developers & Creators",
    template: "%s | OneToolkit",
  },
  description: "OneToolkit offers 15+ free, fast, and privacy-first tools. Compress images, format JSON, merge PDFs, generate QR codes, and more — all in your browser.",
  keywords: [
    "online tools", "free tools", "image compressor", "JSON formatter", "PDF merger",
    "QR code generator", "password generator", "Base64 encoder", "UUID generator",
    "image converter", "image resize", "text diff checker", "unit converter", "word counter"
  ],
  authors: [{ name: "OneToolkit" }],
  creator: "OneToolkit",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://onetoolkit.app",
    siteName: "OneToolkit",
    title: "OneToolkit — Free Online Tools for Everyone",
    description: "Compress images, merge PDFs, format JSON, generate QR codes & more. Free, fast, and 100% private — everything runs in your browser.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "OneToolkit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OneToolkit — Free Online Tools",
    description: "15+ free tools for developers & creators. 100% private, no uploads.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
