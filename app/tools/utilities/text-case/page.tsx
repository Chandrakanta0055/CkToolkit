"use client";

import { ToolLayout } from '@/components/ui/ToolLayout';
import { useState } from 'react';
import { Copy, Trash2, CheckCircle2, Type } from 'lucide-react';

export default function TextCaseConverterPage() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const convert = (type: string) => {
    if (!text) return;
    switch (type) {
      case 'upper':
        setText(text.toUpperCase());
        break;
      case 'lower':
        setText(text.toLowerCase());
        break;
      case 'title':
        setText(
          text.toLowerCase().split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')
        );
        break;
      case 'sentence':
        setText(
          text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase())
        );
        break;
      case 'camel':
        setText(
          text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
        );
        break;
      case 'snake':
        setText(
          text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            ?.map(x => x.toLowerCase())
            .join('_') || ''
        );
        break;
      case 'kebab':
        setText(
          text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            ?.map(x => x.toLowerCase())
            .join('-') || ''
        );
        break;
      case 'alternating':
        setText(
          text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('')
        );
        break;
    }
  };

  return (
    <ToolLayout
      toolId="text-case"
      title="Text Case Converter"
      description="Convert text formatting to UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more."
    >
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <div className="flex justify-end">
          <button 
            onClick={() => setText('')} 
            className="text-sm px-4 py-2 flex items-center gap-2 rounded-lg text-red-500 hover:bg-red-500/10 font-medium transition-colors border border-transparent hover:border-red-500/20"
          >
            <Trash2 className="h-4 w-4" /> Clear Text
          </button>
        </div>

        <div className="relative group">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here..."
            className="w-full h-80 p-5 rounded-2xl bg-secondary/30 border border-border resize-none text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow leading-relaxed"
          />
          {text && (
            <button
              onClick={handleCopy}
              className="absolute bottom-5 right-5 p-3 rounded-lg bg-card border border-border hover:bg-secondary text-secondary-foreground transition-all shadow-md group-hover:scale-105"
              title="Copy to clipboard"
            >
              {copied ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
            </button>
          )}
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <Type className="h-4 w-4 text-primary" /> Conversion Options
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'upper', label: 'UPPERCASE' },
              { id: 'lower', label: 'lowercase' },
              { id: 'title', label: 'Title Case' },
              { id: 'sentence', label: 'Sentence case' },
              { id: 'camel', label: 'camelCase' },
              { id: 'snake', label: 'snake_case' },
              { id: 'kebab', label: 'kebab-case' },
              { id: 'alternating', label: 'aLtErNaTiNg' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => convert(btn.id)}
                className="w-full bg-secondary/50 hover:bg-primary/10 hover:text-primary text-secondary-foreground font-medium py-3 rounded-lg transition-colors border border-border/50 shadow-sm"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
