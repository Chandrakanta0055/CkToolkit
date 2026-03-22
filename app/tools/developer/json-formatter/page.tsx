"use client";

import { ToolLayout } from '@/components/ui/ToolLayout';
import { useState } from 'react';
import { Copy, Trash2, CheckCircle2 } from 'lucide-react';

export default function JsonFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = (space: number) => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, space));
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Invalid JSON');
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      toolId="json-formatter"
      title="JSON Formatter"
      description="Format, beautify, minify, and validate JSON data instantly."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">Input JSON</label>
            <button 
              onClick={() => { setInput(''); setOutput(''); setError(null); }} 
              className="text-xs text-secondary-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <Trash2 className="h-3 w-3" /> Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"hello": "world"}'
            className="w-full h-[500px] p-4 rounded-xl bg-secondary/30 border border-border resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">Output</label>
            <div className="flex items-center gap-2">
              <button onClick={() => formatJson(2)} className="text-xs px-2 py-1 rounded-md bg-secondary hover:bg-secondary/80 text-foreground transition-colors font-medium">2 Spaces</button>
              <button onClick={() => formatJson(4)} className="text-xs px-2 py-1 rounded-md bg-secondary hover:bg-secondary/80 text-foreground transition-colors font-medium">4 Spaces</button>
              <button onClick={() => formatJson(0)} className="text-xs px-2 py-1 rounded-md bg-secondary hover:bg-secondary/80 text-foreground transition-colors font-medium">Minify</button>
            </div>
          </div>
          <div className="relative group h-[500px]">
            <textarea
              value={error ? error : output}
              readOnly
              className={`w-full h-full p-4 rounded-xl bg-card border resize-none font-mono text-sm focus:outline-none transition-colors ${
                error ? 'border-red-500/50 text-red-500' : 'border-border text-foreground'
              }`}
              spellCheck={false}
            />
            {!error && output && (
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 rounded-lg bg-card/80 hover:bg-secondary text-secondary-foreground transition-colors border border-border shadow-sm backdrop-blur-sm"
                title="Copy to clipboard"
              >
                {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
