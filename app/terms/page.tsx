import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | CkToolKit",
  description: "Terms of Service for using CkToolKit.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-[#E2E8F0] selection:bg-soft-blue/30">
      
      {/* Ambient Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-[-5%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-soft-blue/5 blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-vibrant-purple/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 max-w-3xl py-20 md:py-28 relative z-10">
        <div className="mb-16">
          <div className="h-1 w-12 rounded-full bg-gradient-to-r from-soft-blue to-vibrant-purple mb-5" />
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-5 text-white">
            Terms <span className="text-neon-gradient">of Service</span>
          </h1>
          <p className="text-[#94A3B8] font-medium italic">Effective Date: March 2026</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-12 text-[#94A3B8] text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-black text-white uppercase tracking-widest mb-4">01. Acceptance</h2>
            <p>
              By accessing CkToolKit, you agree to use our services responsibly and in accordance with these simple terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase tracking-widest mb-4">02. "As Is" Service</h2>
            <p>
              CkToolKit is provided "as is" and "as available". While we strive for 100% accuracy and uptime, we make no warranties regarding the output or reliability of individual tools. Always verify critical data separately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase tracking-widest mb-4">03. Usage Limits</h2>
            <p>
              Users are permitted to use the tools for personal and professional purposes. Automated scraping or use of our tools via unauthorized APIs is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase tracking-widest mb-4">04. Liability</h2>
            <p>
              Since all processing happens on your local device, CKToolkit is not liable for any data loss, file corruption, or hardware issues that may occur during the use of our browser-based tools. 
            </p>
          </section>

          <section className="text-center pt-8 border-t border-white/5">
             <p className="text-xs">Enjoy using CkToolKit responsibly! 🚀</p>
          </section>
        </div>
      </div>
    </div>
  );
}
