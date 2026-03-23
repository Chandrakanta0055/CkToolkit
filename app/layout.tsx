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
  metadataBase: new URL("https://ck-toolkit.vercel.app"),
  title: {
    default: "CkToolKit — Free Online Tools for Developers & Creators",
    template: "%s | CkToolKit",
  },
  description: "A premium suite of free, private, and fast online tools. Compress images, format JSON, generate QR codes, count words, and calculate reading time directly in your browser.",
  keywords: [
    "online tools", "developer tools", "image compressor", "pdf merger", "json formatter", 
    "word counter", "character counter", "free online utilities", "base64 encoder",
    "qr code generator", "password generator", "image converter", "png to jpg",
    "reading time calculator", "text diff checker", "cktoolkit"
  ],
  authors: [{ name: "CkToolKit", url: "https://ck-toolkit.vercel.app" }],
  creator: "CkToolKit",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ck-toolkit.vercel.app",
    siteName: "CkToolKit",
    title: "CkToolKit — Free Online Tools for Everyone",
    description: "Compress images, format JSON, count words, generate QR codes & more. Free, fast, and 100% private.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CkToolKit Preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CkToolKit — Free Online Tools",
    description: "15+ completely free tools for developers & creators running instantly in your browser.",
    images: ["/og-image.png"],
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
