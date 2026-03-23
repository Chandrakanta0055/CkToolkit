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
    <ToolLayout title="Word Counter" description="Analyze your text with advanced word, character, sentence, and paragraph counting statistics." toolId="word-counter">
      <div className="flex flex-col gap-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard label="Words" value={stats.words} icon={Type} colorBg="bg-blue-500/10" colorText="text-blue-500" />
          <StatCard label="Characters" value={stats.chars} icon={Hash} colorBg="bg-purple-500/10" colorText="text-purple-500" />
          <StatCard label="No Spaces" value={stats.charsNoSpaces} icon={Keyboard} colorBg="bg-pink-500/10" colorText="text-pink-500" />
          <StatCard label="Sentences" value={stats.sentences} icon={AlignLeft} colorBg="bg-emerald-500/10" colorText="text-emerald-500" />
          <StatCard label="Paragraphs" value={stats.paragraphs} icon={AlignLeft} colorBg="bg-orange-500/10" colorText="text-orange-500" />
          <StatCard label="Reading Time" value={`${stats.readingTime}m`} icon={Clock} colorBg="bg-cyan-500/10" colorText="text-cyan-500" />
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

        {/* SEO Content Section */}
        <div className="mt-8 bg-card/50 border border-border/50 rounded-2xl p-6 md:p-10 space-y-8">
          <div>
            <h2 className="text-xl md:text-2xl font-black mb-4 tracking-tight">Free Online Word Counter & Character Counter</h2>
            <p className="text-secondary-foreground/80 leading-relaxed text-sm md:text-base">
              CkToolKit's Word Counter is a fast, free, and private online utility designed to help you analyze your text in real-time. Whether you are writing a college essay, a professional email, or crafting the perfect tweet that fits within the character limit, our tool instantly counts words, characters (with and without spaces), sentences, paragraphs, and even estimates the reading time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-primary">Why use a Word Counter?</h3>
              <ul className="space-y-2 text-sm text-secondary-foreground/80 list-disc list-inside">
                <li><strong className="text-secondary-foreground">Social Media Limits:</strong> Ensure your posts fit within Twitter (280 characters), Instagram, or LinkedIn character limits.</li>
                <li><strong className="text-secondary-foreground">Academic Writing:</strong> Easily meet strict minimum or maximum word counts for essays and research papers.</li>
                <li><strong className="text-secondary-foreground">SEO Optimization:</strong> Track your word count to ensure your blog posts hit the optimal length for Google rankings.</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-primary">100% Private & Secure</h3>
              <p className="text-sm text-secondary-foreground/80 leading-relaxed">
                Unlike other online character counters, CkToolKit runs entirely in your browser. <strong>We never upload your text to any servers.</strong> Whatever you type or paste into this word counter stays strictly on your device, ensuring maximum privacy for your sensitive documents and creative writing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
