"use client";

import Link from 'next/link';
import { ToolCard } from '@/components/ui/ToolCard';
import { 
  FileImage, 
  ArrowRightLeft,
  Minimize2,
  Merge,
  SplitSquareHorizontal,
  Braces,
  Hash,
  Fingerprint,
  Diff,
  Palette,
  QrCode,
  KeyRound,
  Scale,
  CaseSensitive,
  Type,
  Maximize,
  Hammer,
  Settings,
  BarChart3,
  BookOpen,
  ChevronRight,
  Bookmark,
  Clock,
  ArrowRight,
  Monitor,
  Database
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

const CATEGORIES = ['All', 'Image', 'PDF', 'Developer', 'Utility'];

const TOOLS = [
  // Image Tools
  { id: 'image-compressor', title: 'Image Compressor', description: 'Reduce image size without losing quality.', icon: Minimize2, href: '/tools/image/compressor', category: 'Image' },
  { id: 'image-converter', title: 'Image Converter', description: 'Convert images between PNG, JPG, WebP formats.', icon: ArrowRightLeft, href: '/tools/image/converter', category: 'Image' },
  { id: 'image-resize', title: 'Resize Image', description: 'Scale down or enlarge images with custom dimensions.', icon: Maximize, href: '/tools/image/resize', category: 'Image', isNew: true },
  
  // PDF Tools
  { id: 'image-to-pdf', title: 'Image to PDF', description: 'Convert multiple images into a single PDF document.', icon: FileImage, href: '/tools/pdf/image-to-pdf', category: 'PDF' },
  { id: 'pdf-merger', title: 'PDF Merger', description: 'Combine multiple PDF files into one.', icon: Merge, href: '/tools/pdf/merge', category: 'PDF', isNew: true },
  { id: 'pdf-split', title: 'Split PDFs', description: 'Extract specific pages from a PDF document.', icon: SplitSquareHorizontal, href: '/tools/pdf/split', category: 'PDF', isNew: true },
  
  // Developer Tools
  { id: 'json-formatter', title: 'JSON Formatter', description: 'Format, beautify, and validate JSON data.', icon: Braces, href: '/tools/developer/json-formatter', category: 'Developer' },
  { id: 'base64', title: 'Base64 Encoder / Decoder', description: 'Convert text or files into Base64 format.', icon: Hash, href: '/tools/developer/base64', category: 'Developer' },
  { id: 'uuid-generator', title: 'UUID Generator', description: 'Generate unique IDs instantly.', icon: Fingerprint, href: '/tools/developer/uuid', category: 'Developer' },
  { id: 'text-diff', title: 'Text Diff Checker', description: 'Compare two texts to find differences.', icon: Diff, href: '/tools/developer/diff', category: 'Developer', isNew: true },
  { id: 'code-to-image', title: 'Code-to-Image Snap', description: 'Create beautiful, shareable code screenshots.', icon: Monitor, href: '/tools/developer/code-to-image', category: 'Developer', isNew: true },
  { id: 'color-picker', title: 'Color Code Generator', description: 'Generate HEX, RGB, HSL codes.', icon: Palette, href: '/tools/developer/color-picker', category: 'Developer', isNew: true },
  
  // Utilities
  { id: 'qr-generator', title: 'QR Code Generator', description: 'Create QR codes for links, text, WiFi.', icon: QrCode, href: '/tools/utilities/qr-generator', category: 'Utility' },
  { id: 'password-generator', title: 'Password Generator', description: 'Generate secure and strong passwords.', icon: KeyRound, href: '/tools/utilities/password-generator', category: 'Utility' },
  { id: 'unit-converter', title: 'Unit Converter', description: 'Convert between different units.', icon: Scale, href: '/tools/utilities/unit-converter', category: 'Utility', isNew: true },
  { id: 'text-case', title: 'Text Case Converter', description: 'Convert text to UPPERCASE, lowercase, and more.', icon: CaseSensitive, href: '/tools/utilities/text-case', category: 'Utility', isNew: true },
  { id: 'word-counter', title: 'Word Counter', description: 'Analyze text by counting words and characters.', icon: Type, href: '/tools/utilities/word-counter', category: 'Utility' },
  { id: 'data-transformer', title: 'Universal Data Transformer', description: 'Convert between CSV, JSON, and Excel formats.', icon: Database, href: '/tools/utilities/data-transformer', category: 'Utility', isNew: true }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const { bookmarks, recentTools } = useAppStore();

  useEffect(() => setMounted(true), []);

  // Get full tool objects for bookmarked IDs
  const savedTools = mounted ? TOOLS.filter(t => bookmarks.includes(t.id)) : [];
  const recentToolsList = mounted ? TOOLS.filter(t => recentTools.includes(t.id)).slice(0, 4) : [];

  const filteredTools = TOOLS.filter(tool => {
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });


  return (
    <div className="flex flex-col flex-1 bg-[#0B0F1A] min-h-screen text-[#E2E8F0] selection:bg-soft-blue/30 overflow-x-hidden">
      
      {/* ─── Soft Neon Background Glows ─── */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[5%] left-[-10%] w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] rounded-full bg-soft-blue/5 blur-[120px]" />
        <div className="absolute top-[20%] right-[-15%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-vibrant-purple/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-logo-cyan/5 blur-[100px]" />
      </div>

      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 px-4">
        <div className="container relative mx-auto max-w-4xl text-center">
          
          {/* Logo Detail Pills */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-5 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#94A3B8] backdrop-blur-md mb-12 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-soft-blue shadow-[0_0_8px_#60A5FA]" />
            Soft Neon Glass Interface
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.85] text-[#E2E8F0]">
            The Power of One.<br className="md:hidden" />
            <span className="text-neon-gradient block mt-4 pb-2">
              OneToolkit.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#94A3B8] max-w-2xl mx-auto mb-16 leading-relaxed font-medium">
            Essential tools for modern creators. Built with privacy, speed, and 
            a premium futuristic aesthetic in mind.
          </p>
          

          {/* Search Box with Soft Glow */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-soft-blue via-vibrant-purple to-logo-cyan opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 blur-[3px]" />
            <div className="relative flex items-center w-full h-15 rounded-2xl bg-[#0B0F1A]/80 border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="pl-6 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="w-full h-full bg-transparent outline-none text-[#E2E8F0] placeholder-white/20 text-base font-bold px-4"
                placeholder="Find Your Tool..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Guide Banner ─── */}
      <section className="px-4 mb-4 mt-2">
        <div className="container mx-auto max-w-7xl flex flex-col gap-4">
          <Link
            href="/guide"
            className="group flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-vibrant-purple/40 hover:bg-white/[0.05] backdrop-blur-md transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 shrink-0 rounded-2xl bg-gradient-to-br from-soft-blue to-vibrant-purple flex items-center justify-center shadow-[0_0_20px_rgba(123,97,255,0.4)]">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-black text-white text-sm">New to OneToolkit?</p>
                <p className="text-[#94A3B8] text-xs leading-snug mt-0.5">Read our step-by-step guide covering all 16 tools with tips &amp; tricks.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-vibrant-purple group-hover:text-white group-hover:translate-x-1 transition-all whitespace-nowrap">
              View Guide <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Saved & Recent Quick Strip */}
          {mounted && (savedTools.length > 0 || recentToolsList.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Saved Tools */}
              {savedTools.length > 0 && (
                <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-soft-blue">
                      <Bookmark className="h-3 w-3 fill-current" />
                      Saved Tools ({savedTools.length})
                    </div>
                    <Link href="/saved" className="text-[9px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors">
                      Manage All
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {savedTools.slice(0, 3).map(tool => (
                      <Link 
                        key={tool.id} 
                        href={tool.href}
                        className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-medium text-white/80"
                      >
                        {tool.title}
                      </Link>
                    ))}
                    {savedTools.length > 3 && (
                      <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs text-white/20">
                        +{savedTools.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Recent Tools */}
              {recentToolsList.length > 0 && (
                <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-vibrant-purple">
                      <Clock className="h-3 w-3" />
                      Recently Used
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentToolsList.map(tool => (
                      <Link 
                        key={tool.id} 
                        href={tool.href}
                        className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-medium text-white/80"
                      >
                        {tool.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ─── Tools Grid Section ─── */}
      <section className="relative flex-1 pb-32 px-4 mt-12">
        <div className="container mx-auto max-w-7xl">

          {/* Category Filter Pills (Soft Neon) */}
          <div className="flex items-center gap-3 mb-12 flex-wrap justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-7 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-soft-blue to-vibrant-purple text-white border-transparent shadow-[0_10px_20px_rgba(123,97,255,0.3)] scale-105'
                    : 'bg-white/[0.03] border-white/5 text-white/30 hover:border-white/20 hover:text-white/70 hover:bg-white/[0.05]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 fade-out-0">
            {filteredTools.length > 0 ? (
              filteredTools.map(tool => (
                <ToolCard key={tool.id} {...tool} />
              ))
            ) : (
              <div className="col-span-full py-40 text-center bg-white/[0.02] rounded-[40px] border border-dashed border-white/5">
                <p className="text-white/10 text-xs font-black uppercase tracking-[0.5em]">Zero Results Found</p>
                <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="mt-6 text-soft-blue hover:text-vibrant-purple transition-colors font-black text-sm uppercase tracking-widest">
                  Reset Filters & Search →
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Brand Icons Footer (Logo Details) ─── */}
      <footer className="container mx-auto max-w-7xl px-4 py-16 flex flex-col items-center border-t border-white/5 gap-10 opacity-30">
        <div className="flex items-center gap-12 md:gap-20 flex-wrap justify-center">
          <div className="flex items-center gap-3 group">
             <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 group-hover:bg-soft-blue/10 group-hover:border-soft-blue/30 transition-all">
                <Hammer className="h-5 w-5 text-soft-glow-blue" />
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.3em]">Crafted</span>
          </div>
          <div className="flex items-center gap-3 group">
             <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 group-hover:bg-vibrant-purple/10 group-hover:border-vibrant-purple/30 transition-all">
                <Settings className="h-5 w-5 text-soft-glow-purple" />
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.3em]">Configured</span>
          </div>
          <div className="flex items-center gap-3 group">
             <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 group-hover:bg-logo-cyan/10 group-hover:border-logo-cyan/30 transition-all">
                <BarChart3 className="h-5 w-5 text-logo-cyan" />
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.3em]">Optimized</span>
          </div>
        </div>
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20">© 2026 OneToolkit Labs</p>
      </footer>
    </div>
  );
}
