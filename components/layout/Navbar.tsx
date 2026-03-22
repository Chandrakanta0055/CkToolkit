"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B0F1A]/80 backdrop-blur-xl">
      {/* Brand Gradient Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-soft-blue/0 via-vibrant-purple to-logo-cyan/0" />
      
      <div className="container mx-auto flex h-16 items-center px-4 max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
            <Image src="/logo.png" alt="CkToolKit Logo" fill className="object-contain p-1.5" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">
            Ck<span className="text-transparent bg-clip-text bg-gradient-to-r from-soft-blue to-vibrant-purple">ToolKit</span>
          </span>
        </Link>

        {/* Right Side - Nav + CTA */}
        <div className="flex flex-1 items-center justify-end gap-6">
          <Link
            href="/guide"
            className="hidden sm:block text-[11px] font-black uppercase tracking-widest text-[#94A3B8] hover:text-white transition-colors"
          >
            Guide
          </Link>
          <Link
            href="/saved"
            className="hidden sm:block text-[11px] font-black uppercase tracking-widest text-[#94A3B8] hover:text-white transition-colors"
          >
            Saved
          </Link>
          <Link
            href="/guide"
            className="px-6 py-2 rounded-2xl bg-gradient-to-r from-soft-blue to-vibrant-purple text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(123,97,255,0.4)] active:scale-95 transition-all"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
