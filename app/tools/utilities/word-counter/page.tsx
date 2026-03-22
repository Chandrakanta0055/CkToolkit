"use client";

import { ToolLayout } from '@/components/ui/ToolLayout';
import { useState, useMemo } from 'react';
import { Type, Hash, AlignLeft, Clock, Trash2, Keyboard } from 'lucide-react';

export default function WordCounterPage() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const words = trimmedText ? trimmedText.split(/\s+/).length : 0;
    
    // Basic sentence splitting logic
    const sentencesMatch = trimmedText.match(/[^.!?]+[.!?]+/g);
    const sentences = sentencesMatch ? sentencesMatch.length : (trimmedText.length > 0 ? 1 : 0);
    
    const paragraphs = trimmedText ? trimmedText.split(/\n+/).filter(p => p.trim().length > 0).length : 0;
    const readingTime = Math.max(1, Math.ceil(words / 225)); // avg 225 wpm

    return { chars, charsNoSpaces, words, sentences, paragraphs, readingTime };
  }, [text]);

  const StatCard = ({ label, value, icon: Icon, colorBg, colorText }: any) => (
    <div className="bg-card border border-border/80 rounded-2xl p-5 flex flex-col items-center shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
      <div className={`p-3 rounded-xl mb-3 ${colorBg}`}>
        <Icon className={`h-6 w-6 ${colorText}`} />
      </div>
      <span className="text-3xl font-extrabold tracking-tight mb-1 font-mono">{value}</span>
      <span className="text-xs font-bold uppercase tracking-wider text-secondary-foreground/60">{label}</span>
    </div>
  );

  return (
    <ToolLayout
      toolId="word-counter"
      title="Word Counter"
      description="Analyze your text by instantly counting words, characters, sentences, and paragraphs."
    >
      <div className="flex flex-col gap-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard label="Words" value={stats.words} icon={Type} colorBg="bg-blue-100 dark:bg-blue-900/30" colorText="text-blue-600 dark:text-blue-400" />
          <StatCard label="Characters" value={stats.chars} icon={Hash} colorBg="bg-indigo-100 dark:bg-indigo-900/30" colorText="text-indigo-600 dark:text-indigo-400" />
          <StatCard label="No Spaces" value={stats.charsNoSpaces} icon={Keyboard} colorBg="bg-purple-100 dark:bg-purple-900/30" colorText="text-purple-600 dark:text-purple-400" />
          <StatCard label="Sentences" value={stats.sentences} icon={AlignLeft} colorBg="bg-pink-100 dark:bg-pink-900/30" colorText="text-pink-600 dark:text-pink-400" />
          <StatCard label="Paragraphs" value={stats.paragraphs} icon={AlignLeft} colorBg="bg-orange-100 dark:bg-orange-900/30" colorText="text-orange-600 dark:text-orange-400" />
          <StatCard label="Est. Read Time" value={`${stats.readingTime}m`} icon={Clock} colorBg="bg-emerald-100 dark:bg-emerald-900/30" colorText="text-emerald-600 dark:text-emerald-400" />
        </div>

        {/* Input Area */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">Type or paste your text below</label>
            <button 
              onClick={() => setText('')} 
              className="text-xs px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center gap-1.5 transition-colors font-medium"
            >
              <Trash2 className="h-3.5 w-3.5" /> Clear Text
            </button>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or pasting your text here..."
            className="w-full h-[400px] p-4 md:p-6 rounded-2xl bg-secondary/30 border border-border resize-none text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow leading-relaxed"
            spellCheck={true}
          />
        </div>
      </div>
    </ToolLayout>
  );
}
