"use client";

import { useState, useRef, useEffect } from "react";
import { toPng, toJpeg } from "html-to-image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark, solarizedlight, dracula, oneDark, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { 
  Download, 
  Settings2, 
  Copy, 
  Check, 
  RefreshCcw, 
  Layout, 
  Palette, 
  Monitor, 
  Maximize2
} from "lucide-react";
import { ToolLayout } from "@/components/ui/ToolLayout";

const GRADIENTS = [
  { name: "Neon Blue", class: "bg-gradient-to-br from-soft-blue via-vibrant-purple to-logo-cyan" },
  { name: "Sunset", class: "bg-gradient-to-br from-[#FF4D4D] to-[#F9CB28]" },
  { name: "Deep Space", class: "bg-gradient-to-br from-[#0B0F1A] via-[#1E293B] to-[#0F172A]" },
  { name: "Aurora", class: "bg-gradient-to-tr from-[#00F260] to-[#0575E6]" },
  { name: "Glass Dark", class: "bg-white/[0.03] backdrop-blur-3xl" },
];

const THEMES = [
  { name: "Atom Dark", style: atomDark },
  { name: "Dracula", style: dracula },
  { name: "One Dark", style: oneDark },
  { name: "Solarized Light", style: solarizedlight },
  { name: "VS Code", style: vs },
];

const LANGUAGES = [
  "javascript", "typescript", "python", "html", "css", "json", "rust", "go", "cpp", "java"
];

export default function CodeToImagePage() {
  const [code, setCode] = useState(`function helloWorld() {
  console.log("Welcome to CKToolkit Snap!");

  const stats = {
    speed: "Instant",
    privacy: "100%",
    style: "Premium"
  };

  return stats;
}`);
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState(oneDark);
  const [background, setBackground] = useState(GRADIENTS[0]);
  const [padding, setPadding] = useState(48);
  const [borderRadius, setBorderRadius] = useState(24);
  const [showWindowControls, setShowWindowControls] = useState(true);
  const [exportFormat, setExportFormat] = useState<"png" | "jpg">("png");
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const exportRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!exportRef.current) return;
    setIsExporting(true);
    
    try {
      const dataUrl = exportFormat === "png" 
        ? await toPng(exportRef.current, { cacheBust: true, pixelRatio: 2 })
        : await toJpeg(exportRef.current, { cacheBust: true, pixelRatio: 2, quality: 1 });
      
      const link = document.createElement("a");
      link.download = `cktoolkit-snap-${Date.now()}.${exportFormat}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed", err);
    } finally {
      setIsExporting(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Code-to-Image Snap"
      description="Turn your code snippets into beautiful, shareable screenshots with custom glassmorphic backgrounds."
      toolId="code-to-image"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ─── Sidebar Controls ─── */}
        <div className="lg:col-span-3 space-y-6 animate-in fade-in slide-in-from-left-6 duration-700">
          
          {/* Background Selector */}
          <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#94A3B8] mb-4">
              <Palette className="h-3 w-3" />
              Canvas Background
            </div>
            <div className="grid grid-cols-5 gap-2">
              {GRADIENTS.map((g) => (
                <button
                  key={g.name}
                  onClick={() => setBackground(g)}
                  className={`h-8 w-8 rounded-lg ${g.class} border-2 ${background.name === g.name ? 'border-white' : 'border-transparent'} transition-all hover:scale-110`}
                  title={g.name}
                />
              ))}
            </div>
          </div>

          {/* Code Settings */}
          <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#94A3B8] mb-2">
              <Settings2 className="h-3 w-3" />
              Editor Settings
            </div>
            
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#E2E8F0]">Language</label>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-vibrant-purple/50"
              >
                {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang.toUpperCase()}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#E2E8F0]">Editor Theme</label>
              <select 
                value={THEMES.find(t => t.style === theme)?.name}
                onChange={(e) => setTheme(THEMES.find(t => t.name === e.target.value)?.style || dracula)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-vibrant-purple/50"
              >
                {THEMES.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
              </select>
            </div>
          </div>

          {/* Layout Controls */}
          <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#94A3B8] mb-2">
              <Layout className="h-3 w-3" />
              Layout & Border
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-bold text-[#E2E8F0]">Padding</span>
                <span className="text-[#94A3B8]">{padding}px</span>
              </div>
              <input 
                type="range" min="16" max="128" step="8"
                value={padding} onChange={(e) => setPadding(Number(e.target.value))}
                className="w-full accent-vibrant-purple h-1 rounded-full appearance-none bg-white/10 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-bold text-[#E2E8F0]">Radius</span>
                <span className="text-[#94A3B8]">{borderRadius}px</span>
              </div>
              <input 
                type="range" min="0" max="48" step="4"
                value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))}
                className="w-full accent-vibrant-purple h-1 rounded-full appearance-none bg-white/10 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#E2E8F0]">Window Controls</span>
              <button 
                onClick={() => setShowWindowControls(!showWindowControls)}
                className={`h-5 w-10 rounded-full transition-colors relative ${showWindowControls ? 'bg-vibrant-purple' : 'bg-white/10'}`}
              >
                <div className={`absolute top-1 h-3 w-3 rounded-full bg-white transition-all ${showWindowControls ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* ─── Main Content (Editor & Preview) ─── */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* Export Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-3xl bg-white/[0.02] border border-white/5">
             <div className="flex items-center gap-2">
               <button 
                onClick={copyCode}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
               >
                 {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                 {copied ? "Copied" : "Copy Code"}
               </button>
               <button 
                onClick={() => setCode("")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-colors"
               >
                 <RefreshCcw className="h-3.5 w-3.5" />
                 Clear
               </button>
             </div>

             <div className="flex items-center gap-2">
               <select 
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value as any)}
                  className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-[10px] font-bold outline-none uppercase tracking-widest cursor-pointer"
               >
                 <option value="png">PNG (Normal)</option>
                 <option value="jpg">JPG (High Quality)</option>
               </select>
               <button 
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-soft-blue to-vibrant-purple text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-soft-blue/10 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
               >
                 {isExporting ? <RefreshCcw className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
                 {isExporting ? "Exporting..." : `Download v2 ${exportFormat.toUpperCase()}`}
               </button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Real-time Editor Input */}
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">
                 <Monitor className="h-3 w-3" />
                 Input Snippet
               </div>
               <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
                className="flex-1 w-full p-6 rounded-[32px] bg-black/40 border border-white/10 outline-none focus:border-soft-blue/50 text-[#E2E8F0] font-mono text-xs leading-relaxed resize-none min-h-[400px]"
               />
            </div>

            {/* Live Preview / Export Area */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">
                <Maximize2 className="h-3 w-3" />
                Snap Preview
              </div>
              <div 
                ref={exportRef}
                className={`flex-1 rounded-[32px] flex items-center justify-center overflow-hidden h-full ${background.class} min-h-[400px]`}
                style={{ padding: `${padding}px` }}
              >
                <div 
                  className="w-full bg-[#0F172A]/90 backdrop-blur-3xl shadow-2xl border border-white/10"
                  style={{ borderRadius: `${borderRadius}px` }}
                >
                  {/* Mock Window Controls */}
                  {showWindowControls && (
                    <div className="flex items-center gap-1.5 p-4 border-b border-white/5">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                    </div>
                  )}
                  
                  {/* Syntax Highlighter */}
                  <div className="p-1 overflow-hidden">
                    <SyntaxHighlighter
                      language={language}
                      style={theme}
                      customStyle={{
                        background: 'transparent',
                        padding: '1.5rem',
                        margin: 0,
                        fontSize: '13px',
                        lineHeight: '1.5',
                        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                      }}
                    >
                      {code || "// Paste some code..."}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
