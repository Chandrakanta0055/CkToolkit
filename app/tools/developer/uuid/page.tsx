"use client";

import { ToolLayout } from '@/components/ui/ToolLayout';
import { useState, useEffect } from 'react';
import { Copy, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function UuidGeneratorPage() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  const generateUUIDs = () => {
    const newUuids = Array.from({ length: count }, () => crypto.randomUUID());
    setUuids(newUuids);
    setCopied(false);
  };

  useEffect(() => {
    generateUUIDs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = async () => {
    if (uuids.length === 0) return;
    await navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      toolId="uuid-generator"
      title="UUID Generator"
      description="Generate random version 4 UUIDs instantly. Perfect for database primary keys and unique identifiers."
    >
      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row items-end gap-4 bg-secondary/30 p-4 rounded-xl border border-border">
          <div className="flex-1 w-full">
            <label className="text-sm font-medium mb-1.5 block">How many UUIDs?</label>
            <input 
              type="number" 
              min={1} 
              max={100}
              value={count}
              onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full bg-card border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            />
          </div>
          <button
            onClick={generateUUIDs}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Generate
          </button>
        </div>

        <div className="relative group">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold">Generated UUIDs</label>
            <span className="text-xs text-secondary-foreground font-medium">{uuids.length} generated</span>
          </div>
          <textarea
            value={uuids.join('\n')}
            readOnly
            className="w-full h-[300px] p-4 rounded-xl bg-card border border-border resize-none font-mono text-sm focus:outline-none focus:border-primary/50 transition-colors leading-relaxed tracking-wider"
            spellCheck={false}
          />
          <button
            onClick={handleCopy}
            className="absolute top-10 right-4 p-2 rounded-lg bg-card/80 hover:bg-secondary text-secondary-foreground transition-colors border border-border shadow-sm backdrop-blur-sm"
            title="Copy to clipboard"
          >
            {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </ToolLayout>
  );
}
