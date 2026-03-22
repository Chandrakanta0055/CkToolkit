import Link from "next/link";
import Image from "next/image";

const TOOL_LINKS = [
  { label: "Image Compressor", href: "/tools/image/compressor" },
  { label: "Image Converter", href: "/tools/image/converter" },
  { label: "JSON Formatter", href: "/tools/developer/json-formatter" },
  { label: "QR Code Generator", href: "/tools/utilities/qr-generator" },
  { label: "PDF Merger", href: "/tools/pdf/merge" },
  { label: "Password Generator", href: "/tools/utilities/password-generator" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B0F1A] border-t border-white/[0.05] relative">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-soft-blue/0 via-vibrant-purple/30 to-logo-cyan/0" />

      <div className="container mx-auto px-4 max-w-7xl py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-4 col-span-1">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shrink-0">
                <Image src="/logo.png" alt="CkToolKit Logo" fill sizes="40px" className="object-contain p-1.5" />
              </div>
              <span className="font-black text-lg tracking-tight text-[#E2E8F0] group-hover:text-white transition-colors">
                Ck<span className="text-transparent bg-clip-text bg-gradient-to-r from-soft-blue to-vibrant-purple">ToolKit</span>
              </span>
            </Link>
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-xs">
              Fast, free, and privacy-first tools for developers, designers, and power users.
            </p>
            {/* Status Indicator */}
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-soft-glow-blue">
              <span className="h-1.5 w-1.5 rounded-full bg-soft-glow-blue shadow-[0_0_6px_#60A5FA] animate-pulse" />
              All systems operational
            </div>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#94A3B8] mb-5">Popular Tools</h4>
            <ul className="space-y-3">
              {TOOL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#94A3B8] hover:text-[#E2E8F0] hover:translate-x-1 transition-all inline-flex items-center gap-2"
                  >
                    <span className="h-px w-4 bg-vibrant-purple/40 group-hover:bg-vibrant-purple transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#94A3B8] mb-5">Company</h4>
            <ul className="space-y-3">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "About CkToolKit", href: "/about" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#94A3B8] hover:text-[#E2E8F0] hover:translate-x-1 transition-all inline-flex"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/15">
            © {new Date().getFullYear()} CkToolKit Labs · All Rights Reserved
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/15">
            Made with ♥ for the Open Web
          </p>
        </div>
      </div>
    </footer>
  );
}
