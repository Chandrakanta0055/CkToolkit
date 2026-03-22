"use client";

import { useAppStore } from '@/store/useAppStore';
import { Bookmark, ArrowLeft, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ToolLayoutProps {
  toolId: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ToolLayout({ toolId, title, description, children }: ToolLayoutProps) {
  const { toggleBookmark, bookmarks, addRecentTool } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    addRecentTool(toolId);
  }, [toolId, addRecentTool]);

  const isBookmarked = mounted && bookmarks.includes(toolId);

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-[#E2E8F0] selection:bg-soft-blue/30">
      
      {/* Ambient Neon Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-soft-blue/5 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] rounded-full bg-vibrant-purple/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-10 md:py-14 relative z-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#94A3B8] hover:text-[#E2E8F0] mb-10 transition-colors group"
        >
          <div className="h-7 w-7 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
          </div>
          Back to Tools
        </Link>

        {/* Tool Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          <div>
            {/* Accent line */}
            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-soft-blue to-vibrant-purple mb-4" />
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-3 text-white">
              {title}
            </h1>
            <p className="text-base text-[#94A3B8] max-w-xl leading-relaxed">
              {description}
            </p>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(toolId)}
            className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-2xl border font-bold text-sm transition-all ${
              isBookmarked
                ? 'bg-gradient-to-r from-soft-blue to-vibrant-purple text-white border-transparent shadow-[0_0_20px_rgba(123,97,255,0.3)]'
                : 'bg-white/[0.03] border-white/10 text-[#94A3B8] hover:text-white hover:bg-white/[0.06] hover:border-white/20'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
            {isBookmarked ? 'Saved' : 'Save Tool'}
          </button>
        </div>

        {/* Tool Content Card */}
        <div className="relative rounded-3xl overflow-hidden bg-white/[0.03] border border-white/10 backdrop-blur-md p-6 md:p-10 shadow-2xl">
          {/* Subtle glow at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-soft-blue/0 via-vibrant-purple/40 to-logo-cyan/0" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-20 bg-soft-blue/3 blur-3xl" />
          
          {children}
        </div>

        {/* Tool Footer Hint */}
        <p className="text-center text-[10px] text-white/15 font-bold uppercase tracking-[0.3em] mt-8">
          <Zap className="inline h-3 w-3 mr-1 text-vibrant-purple" />
          Processing is 100% private — no data leaves your browser
        </p>
      </div>
    </div>
  );
}
