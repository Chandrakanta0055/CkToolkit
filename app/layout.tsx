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
    default: "CkToolKit — Free Online Tools for Developers & Creators",
    template: "%s | CkToolKit",
  },
  description: "A premium suite of free, private, and fast online tools. Image manipulation, PDF tools, developer utilities and more.",
  keywords: ["online tools", "developer tools", "image compressor", "pdf merger", "cktoolkit"],
  authors: [{ name: "CkToolKit" }],
  creator: "CkToolKit",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cktoolkit.com",
    siteName: "CkToolKit",
    title: "CkToolKit — Free Online Tools for Everyone",
    description: "Compress images, merge PDFs, format JSON, generate QR codes & more. Free, fast, and 100% private — everything runs in your browser.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CkToolKit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CkToolKit — Free Online Tools",
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
