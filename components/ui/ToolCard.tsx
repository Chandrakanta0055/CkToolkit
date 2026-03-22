import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  category: string;
  isNew?: boolean;
}

export function ToolCard({ title, description, icon: Icon, href, category, isNew }: ToolCardProps) {
  return (
    <Link 
      href={href}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300",
        // Soft Glassmorphism matches logo exactly
        "bg-white/[0.05] dark:bg-white/[0.05] backdrop-blur-[12px]",
        "border border-white/10 dark:border-white/10",
        // Glow and lift on hover
        "hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(123,97,255,0.2)]",
      )}
    >
      {/* Corner Glow based on logo Detail */}
      <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-soft-blue/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex items-center justify-between relative z-10">
        {/* Iconic Blue/Purple Gradient Circle on Hover */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-soft-glow-blue transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-soft-blue group-hover:to-vibrant-purple group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_0_16px_rgba(96,165,250,0.4)]">
          <Icon className="h-6 w-6" />
        </div>
        {isNew && (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-soft-blue to-vibrant-purple text-white shadow-[0_0_10px_rgba(167,139,250,0.4)]">
            New
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-col flex-1 relative z-10">
        <h3 className="text-base font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">{title}</h3>
        <p className="mt-1.5 flex-1 text-sm text-white/40 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm font-medium relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">{category}</span>
        <span className="text-logo-cyan text-xs font-semibold opacity-0 transition-all duration-300 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0">
          Try Now →
        </span>
      </div>

      {/* Dynamic bottom gradient border on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-soft-blue/0 via-vibrant-purple/60 to-logo-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Link>
  );
}
