import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | OneToolkit",
  description: "Learn more about OneToolkit — your privacy-first, fast, and free digital toolbox for everyday tasks.",
  keywords: ["about OneToolkit", "privacy-first tools", "how OneToolkit works", "free online utilities"],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-[#E2E8F0] selection:bg-soft-blue/30">
      
      {/* Ambient Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-[-5%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-soft-blue/5 blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-vibrant-purple/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-20 md:py-28 relative z-10">
        <div className="mb-16">
          <div className="h-1 w-12 rounded-full bg-gradient-to-r from-soft-blue to-vibrant-purple mb-5" />
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-5 text-white">
            About <span className="text-neon-gradient">OneToolkit</span>
          </h1>
          <p className="text-xl text-[#94A3B8] max-w-2xl leading-relaxed font-medium">
            Fast. Free. Private. OneToolkit is built for the modern creator who values speed and security above all else.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 text-sm leading-relaxed text-[#94A3B8]">
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <h3 className="text-lg font-black text-white mb-4 italic tracking-tight">01. Privacy First</h3>
            <p>
              Unlike most online tool providers, we don't store your data. Every image compression, PDF merge, or text conversion happens directly in your browser. Our servers never see your files.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <h3 className="text-lg font-black text-white mb-4 italic tracking-tight">02. Lightning Fast</h3>
            <p>
              By utilizing your own computer's hardware for processing, we eliminate upload and download wait times. It's as fast as your CPU can handle.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <h3 className="text-lg font-black text-white mb-4 italic tracking-tight">03. Developer Minded</h3>
            <p>
              From JSON formatting to UUID generation, we build the tools we use ourselves every day. Clean, distraction-free, and high-performance.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <h3 className="text-lg font-black text-white mb-4 italic tracking-tight">04. Forever Free</h3>
            <p>
              Essential tools should be available to everyone without a paywall. We are committed to keeping OneToolkit accessible and open.
            </p>
          </div>
        </div>

        <div className="p-12 rounded-[40px] bg-white/[0.02] border border-white/5 text-center">
          <h2 className="text-2xl font-black text-white mb-4">Start Building</h2>
          <p className="text-[#94A3B8] mb-8 max-w-md mx-auto">
            Ready to experience the power of 100% browser-based processing?
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-soft-blue to-vibrant-purple text-white font-black text-sm uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
          >
            Explore All Tools
          </a>
        </div>
      </div>
    </div>
  );
}
