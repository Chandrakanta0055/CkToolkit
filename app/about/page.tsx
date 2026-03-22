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
            About <span className="text-neon-gradient">CKToolkit</span>
          </h1>
          <p className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium mb-12">
            The story behind the power of one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm">
            <h2 className="text-2xl font-black text-white mb-6">Our Mission</h2>
            <p className="text-[#94A3B8] leading-relaxed">
              CKToolkit was born out of a simple idea: that powerful, high-quality tools should be accessible to everyone, without compromising on privacy or performance. We believe in the "Power of One"—one single platform that provides everything a modern creator needs.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm">
            <h2 className="text-2xl font-black text-white mb-6">Privacy First</h2>
            <p className="text-[#94A3B8] leading-relaxed">
              Your data is yours. Unlike other "free" tools, CKToolkit processes everything locally in your browser. We never see, touch, or store your sensitive files. It's the ultimate combination of convenience and security.
            </p>
          </div>
        </div>

        <div className="p-12 rounded-[40px] bg-gradient-to-br from-soft-blue/10 to-vibrant-purple/10 border border-white/[0.05] relative overflow-hidden mb-24">
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">Simple. Fast. Beautiful.</h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-8">
              We focus on "Soft Neon Glass" aesthetics to make your daily tasks feel more like a premium experience rather than a chore. Whether you're a developer needing to format JSON or a designer compressing images, CKToolkit is built for you.
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
