"use client";

import { useAppStore } from '@/store/useAppStore';
import { ToolCard } from '@/components/ui/ToolCard';
import { ArrowLeft, Bookmark, Trash2, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
  Monitor,
  Database
} from 'lucide-react';

const TOOLS = [
  { id: 'image-compressor', title: 'Image Compressor', description: 'Reduce image size without losing quality.', icon: Minimize2, href: '/tools/image/compressor', category: 'Image' },
  { id: 'image-converter', title: 'Image Converter', description: 'Convert images between PNG, JPG, WebP formats.', icon: ArrowRightLeft, href: '/tools/image/converter', category: 'Image' },
  { id: 'image-resize', title: 'Resize Image', description: 'Scale down or enlarge images with custom dimensions.', icon: Maximize, href: '/tools/image/resize', category: 'Image', isNew: true },
  { id: 'image-to-pdf', title: 'Image to PDF', description: 'Convert multiple images into a single PDF document.', icon: FileImage, href: '/tools/pdf/image-to-pdf', category: 'PDF' },
  { id: 'pdf-merger', title: 'PDF Merger', description: 'Combine multiple PDF files into one.', icon: Merge, href: '/tools/pdf/merge', category: 'PDF', isNew: true },
  { id: 'pdf-split', title: 'Split PDFs', description: 'Extract specific pages from a PDF document.', icon: SplitSquareHorizontal, href: '/tools/pdf/split', category: 'PDF', isNew: true },
  { id: 'json-formatter', title: 'JSON Formatter', description: 'Format, beautify, and validate JSON data.', icon: Braces, href: '/tools/developer/json-formatter', category: 'Developer' },
  { id: 'base64', title: 'Base64 Encoder / Decoder', description: 'Convert text or files into Base64 format.', icon: Hash, href: '/tools/developer/base64', category: 'Developer' },
  { id: 'uuid-generator', title: 'UUID Generator', description: 'Generate unique IDs instantly.', icon: Fingerprint, href: '/tools/developer/uuid', category: 'Developer' },
  { id: 'text-diff', title: 'Text Diff Checker', description: 'Compare two texts to find differences.', icon: Diff, href: '/tools/developer/diff', category: 'Developer', isNew: true },
  { id: 'code-to-image', title: 'Code-to-Image Snap', description: 'Create beautiful, shareable code screenshots.', icon: Monitor, href: '/tools/developer/code-to-image', category: 'Developer', isNew: true },
  { id: 'color-picker', title: 'Color Code Generator', description: 'Generate HEX, RGB, HSL codes.', icon: Palette, href: '/tools/developer/color-picker', category: 'Developer', isNew: true },
  { id: 'qr-generator', title: 'QR Code Generator', description: 'Create QR codes for links, text, WiFi.', icon: QrCode, href: '/tools/utilities/qr-generator', category: 'Utility' },
  { id: 'password-generator', title: 'Password Generator', description: 'Generate secure and strong passwords.', icon: KeyRound, href: '/tools/utilities/password-generator', category: 'Utility' },
  { id: 'unit-converter', title: 'Unit Converter', description: 'Convert between different units.', icon: Scale, href: '/tools/utilities/unit-converter', category: 'Utility', isNew: true },
  { id: 'text-case', title: 'Text Case Converter', description: 'Convert text to UPPERCASE, lowercase, and more.', icon: CaseSensitive, href: '/tools/utilities/text-case', category: 'Utility', isNew: true },
  { id: 'word-counter', title: 'Word Counter', description: 'Analyze text by counting words and characters.', icon: Type, href: '/tools/utilities/word-counter', category: 'Utility' },
  { id: 'data-transformer', title: 'Universal Data Transformer', description: 'Convert between CSV, JSON, and Excel formats.', icon: Database, href: '/tools/utilities/data-transformer', category: 'Utility', isNew: true }
];

export default function SavedToolsPage() {
  const { bookmarks, toggleBookmark } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const savedTools = mounted ? TOOLS.filter(t => bookmarks.includes(t.id)) : [];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-[#E2E8F0]">
      {/* Ambient Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-[-5%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-soft-blue/5 blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-vibrant-purple/5 blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-20 md:py-28 relative z-10">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#94A3B8] hover:text-[#E2E8F0] mb-10 transition-colors group">
            <div className="h-7 w-7 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
            </div>
            Back to Home
          </Link>

          <div className="h-1 w-12 rounded-full bg-gradient-to-r from-soft-blue to-vibrant-purple mb-5" />
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-5 text-white">
            Saved Tools
          </h1>
          <p className="text-lg text-[#94A3B8] max-w-2xl leading-relaxed">
            Your personal collection of frequently used tools. 
            All bookmarks are saved locally in your browser.
          </p>
        </div>

        {savedTools.length === 0 ? (
          <div className="py-24 text-center rounded-[40px] bg-white/[0.02] border border-dashed border-white/5">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 mb-6">
              <Bookmark className="h-8 w-8 text-white/20" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No saved tools yet</h2>
            <p className="text-[#94A3B8] mb-8 max-w-xs mx-auto">
              Start browsing and click the bookmark icon on any tool to save it here for quick access.
            </p>
            <Link 
              href="/"
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-soft-blue to-vibrant-purple text-white font-black text-sm uppercase tracking-widest hover:scale-105 transition-all"
            >
              Browse Tools
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedTools.map(tool => (
              <div key={tool.id} className="group relative">
                <ToolCard {...tool} />
                <button
                  onClick={() => toggleBookmark(tool.id)}
                  className="absolute top-4 right-4 z-20 h-8 w-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                  title="Remove from saved"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Info Badge */}
        <div className="mt-20 p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
          <div className="h-10 w-10 rounded-xl bg-soft-blue/10 flex items-center justify-center mb-4">
            <Zap className="h-5 w-5 text-soft-blue" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-white mb-2">Privacy First</h3>
          <p className="text-xs text-[#94A3B8] max-w-sm leading-relaxed">
            Your saved tools are stored using browser's local storage. 
            No data is synced or shared with any server.
          </p>
        </div>
      </div>
    </div>
  );
}
