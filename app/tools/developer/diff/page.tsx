"use client";

import { ToolLayout } from '@/components/ui/ToolLayout';
import { useState } from 'react';
import * as Diff from 'diff';
import { Trash2, FileSignature } from 'lucide-react';

export default function TextDiffPage() {
  const [oldText, setOldText] = useState('');
  const [newText, setNewText] = useState('');

  const diffResult = Diff.diffLines(oldText, newText);

  const clearAll = () => {
    setOldText('');
    setNewText('');
  };

  return (
    <ToolLayout
      toolId="text-diff"
      title="Text Difference Checker"
      description="Compare two blocks of text or code side-by-side to highlight additions, deletions, and modifications."
    >
      <div className="flex flex-col gap-6 max-w-6xl mx-auto">
        <div className="flex justify-end">
          <button 
            onClick={clearAll} 
            className="text-sm px-4 py-2 flex items-center gap-2 rounded-lg text-red-500 hover:bg-red-500/10 font-medium transition-colors border border-transparent hover:border-red-500/20"
          >
            <Trash2 className="h-4 w-4" /> Clear All Texts
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <FileSignature className="h-4 w-4 text-primary" /> Original Text
            </label>
            <textarea
              value={oldText}
              onChange={(e) => setOldText(e.target.value)}
              placeholder="Paste original text here..."
              className="w-full h-[300px] p-4 rounded-xl bg-secondary/30 border border-border resize-none font-mono text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow leading-relaxed"
              spellCheck={false}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <FileSignature className="h-4 w-4 text-green-500" /> Modified Text
            </label>
            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Paste modified text here..."
              className="w-full h-[300px] p-4 rounded-xl bg-secondary/30 border border-border resize-none font-mono text-[13px] focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-shadow leading-relaxed"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Diff Result */}
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center gap-4 mb-1">
            <label className="text-sm font-semibold">Difference Output</label>
            <div className="flex gap-3 text-xs font-semibold">
              <span className="text-green-600 dark:text-green-400 bg-green-500/10 px-2 py-0.5 rounded shadow-sm">+ Added</span>
              <span className="text-red-600 dark:text-red-400 bg-red-500/10 px-2 py-0.5 rounded shadow-sm">- Removed</span>
            </div>
          </div>
          <div className="w-full min-h-[300px] p-4 rounded-xl bg-card border border-border font-mono text-[14px] leading-relaxed overflow-x-auto whitespace-pre-wrap shadow-inner break-words">
            {diffResult.map((part, index) => {
              const colorClass = part.added
                ? 'bg-green-500/20 text-green-800 dark:text-green-200'
                : part.removed
                ? 'bg-red-500/20 text-red-800 dark:text-red-200 line-through opacity-80'
                : 'text-foreground/90';
              return (
                <span key={index} className={colorClass}>
                  {part.value}
                </span>
              );
            })}
            {!oldText && !newText && (
              <span className="text-secondary-foreground/40 italic">Diff output will appear here once you paste text...</span>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
