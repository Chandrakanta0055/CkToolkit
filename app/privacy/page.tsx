import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | OneToolkit",
  description: "OneToolkit Privacy Policy: Learn why we are the most secure tool platform on the web. We don't store your data.",
};

export default function PrivacyPage() {
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
            Privacy <span className="text-neon-gradient">Policy</span>
          </h1>
          <p className="text-[#94A3B8] font-medium italic">Last Updated: March 2026</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-12 text-[#94A3B8] text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-black text-white uppercase tracking-widest mb-4">01. Our Core Principle</h2>
            <p>
              Your privacy is not a feature; it is the foundation of OneToolkit. We have designed this platform so that we never even possess your personal data. 
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase tracking-widest mb-4">02. Browser-Side Processing</h2>
            <p>
              All tools on OneToolkit — including image compression, PDF merging, and developer utilities — execute **entirely within your web browser**. Your files and text inputs are handled by your local machine's hardware. Nothing is uploaded to our servers for processing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase tracking-widest mb-4">03. Local Storage</h2>
            <p>
              Features such as "Saved Tools" and "Recently Used Tools" utilize your browser's **Local Storage**. This data remains on your physical device and is never synced or shared with us. If you clear your browser data, these preferences will be reset.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase tracking-widest mb-4">04. Analytics</h2>
            <p>
              We may use minimal, privacy-respecting analytics to understand high-level usage patterns (e.g., which tools are most popular) to improve the service. This data is aggregated and contains no personally identifiable information.
            </p>
          </section>

          <section className="p-8 rounded-3xl bg-white/[0.03] border border-white/10">
             <p className="text-white font-bold mb-2 italic">Summary:</p>
             <p>No account needed. No uploads required. Your data never leaves your sight.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
