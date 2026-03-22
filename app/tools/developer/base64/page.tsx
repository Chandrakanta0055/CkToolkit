"use client";

import { ToolLayout } from '@/components/ui/ToolLayout';
import { useState, useEffect } from 'react';
import { Copy, Trash2, ArrowRightLeft, CheckCircle2 } from 'lucide-react';

export default function Base64Page() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      if (!input.trim()) {
        setOutput('');
        setError(null);
        return;
      }

      if (mode === 'encode') {
        // Encode using window.btoa, supporting unicode by escaping
        const encoded = window.btoa(unescape(encodeURIComponent(input)));
        setOutput(encoded);
      } else {
        // Decode
        const decoded = decodeURIComponent(escape(window.atob(input)));
        setOutput(decoded);
      }
      setError(null);
    } catch (err) {
      setError(mode === 'encode' ? 'Error encoding text' : 'Invalid Base64 string');
      setOutput('');
    }
  }, [input, mode]);

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleMode = () => {
    setMode(m => m === 'encode' ? 'decode' : 'encode');
    setInput(output); // swap input and output
  };

  return (
    <ToolLayout
      toolId="base64"
      title="Base64 Encoder / Decoder"
      description="Encode text to Base64 format or decode from Base64 instantly."
    >
      <div className="flex flex-col gap-6">
        
        {/* Toggle Mode */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-xl bg-secondary/50 p-1 border border-border">
            <button
              onClick={() => { setMode('encode'); setInput(''); }}
              className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === 'encode' ? 'bg-card text-foreground shadow-sm' : 'text-secondary-foreground hover:text-foreground'}`}
            >
              Encode Base64
            </button>
            <button
              onClick={() => { setMode('decode'); setInput(''); }}
              className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === 'decode' ? 'bg-card text-foreground shadow-sm' : 'text-secondary-foreground hover:text-foreground'}`}
            >
              Decode Base64
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
          
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:flex">
            <button 
              onClick={toggleMode}
              className="p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 hover:shadow-primary/25 transition-all"
              title="Swap"
            >
              <ArrowRightLeft className="h-5 w-5" />
            </button>
          </div>

          {/* Input */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold">{mode === 'encode' ? 'Text Input' : 'Base64 Input'}</label>
              <button 
                onClick={() => setInput('')} 
                className="text-xs text-secondary-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" /> Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Type text to encode...' : 'Paste Base64 to decode...'}
              className="w-full h-[400px] p-4 rounded-xl bg-secondary/30 border border-border resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow leading-relaxed"
              spellCheck={false}
            />
          </div>

          {/* Output */}
          <div className="flex flex-col gap-2 relative">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold">{mode === 'encode' ? 'Base64 Output' : 'Text Output'}</label>
            </div>
            <textarea
              value={error ? error : output}
              readOnly
              className={`w-full h-[400px] p-4 rounded-xl bg-card border resize-none font-mono text-sm focus:outline-none transition-colors leading-relaxed tracking-wider ${
                error ? 'border-red-500/50 text-red-500' : 'border-border text-foreground'
              }`}
            />
            {!error && output && (
              <button
                onClick={handleCopy}
                className="absolute top-10 right-4 p-2.5 rounded-lg bg-card border border-border hover:bg-secondary text-secondary-foreground transition-all shadow-sm group-hover:scale-105"
                title="Copy to clipboard"
              >
                {copied ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
