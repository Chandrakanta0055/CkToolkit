"use client";

import { ToolLayout } from '@/components/ui/ToolLayout';
import { useState } from 'react';
import { Copy, RefreshCw, CheckCircle2, Palette } from 'lucide-react';

export default function ColorPickerPage() {
  const [hex, setHex] = useState('#4f46e5');
  const [copied, setCopied] = useState<string | null>(null);

  const hexToRgb = (h: string) => {
    let r = 0, g = 0, b = 0;
    if (h.length === 4) {
      r = parseInt("0x" + h[1] + h[1]);
      g = parseInt("0x" + h[2] + h[2]);
      b = parseInt("0x" + h[3] + h[3]);
    } else if (h.length === 7) {
      r = parseInt("0x" + h[1] + h[2]);
      g = parseInt("0x" + h[3] + h[4]);
      b = parseInt("0x" + h[5] + h[6]);
    }
    return `${r}, ${g}, ${b}`;
  };

  const hexToHsl = (h: string) => {
    let r = 0, g = 0, b = 0;
    if (h.length === 4) {
      r = parseInt("0x" + h[1] + h[1]);
      g = parseInt("0x" + h[2] + h[2]);
      b = parseInt("0x" + h[3] + h[3]);
    } else if (h.length === 7) {
      r = parseInt("0x" + h[1] + h[2]);
      g = parseInt("0x" + h[3] + h[4]);
      b = parseInt("0x" + h[5] + h[6]);
    }
    r /= 255; g /= 255; b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        hVal = 0,
        sVal = 0,
        lVal = 0;

    if (delta == 0) hVal = 0;
    else if (cmax == r) hVal = ((g - b) / delta) % 6;
    else if (cmax == g) hVal = (b - r) / delta + 2;
    else hVal = (r - g) / delta + 4;

    hVal = Math.round(hVal * 60);
    if (hVal < 0) hVal += 360;

    lVal = (cmax + cmin) / 2;
    sVal = delta == 0 ? 0 : delta / (1 - Math.abs(2 * lVal - 1));
    sVal = +(sVal * 100).toFixed(1);
    lVal = +(lVal * 100).toFixed(1);

    return `${hVal}°, ${sVal}%, ${lVal}%`;
  };

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setHex(randomColor);
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const rgb = hexToRgb(hex);
  const hsl = hexToHsl(hex);

  // Generate a mini palette based on the chosen color
  // Simple analogous variation
  const getPalette = () => {
    // We just manipulate the hue slightly via CSS filters directly or we do simple math.
    // For simplicity, we just render variations using CSS variables in inline styles.
    return [0, 30, 60, 90, 120];
  };

  return (
    <ToolLayout
      toolId="color-picker"
      title="Color Code Generator"
      description="Pick, convert, and discover color codes for your next design project instantly."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* Left Side: Color Picker */}
        <div className="flex flex-col gap-6">
          <div 
            className="w-full h-48 rounded-2xl shadow-inner border border-border/50 transition-colors duration-200"
            style={{ backgroundColor: hex }}
          />

          <div className="flex items-center gap-4 bg-secondary/30 p-4 rounded-xl border border-border">
            <input 
              type="color" 
              value={hex} 
              onChange={(e) => setHex(e.target.value)} 
              className="w-14 h-14 rounded-lg cursor-pointer border-0 bg-transparent p-0 flex-shrink-0"
            />
            <button
              onClick={generateRandomColor}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground h-12 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
              <RefreshCw className="h-4 w-4" /> Random Color
            </button>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Palette className="h-4 w-4 text-primary" /> Analogous Palette
            </h3>
            <div className="flex gap-2 h-16 w-full rounded-lg overflow-hidden">
              {getPalette().map((hueShift, i) => (
                <div 
                  key={i} 
                  className="flex-1 h-full cursor-pointer hover:opacity-90 transition-opacity" 
                  style={{ backgroundColor: hex, filter: `hue-rotate(${hueShift}deg)` }}
                  onClick={(e) => {
                     // Get computed color logic would go here
                     // for now it's just visual
                  }}
                  title="Shift hue"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Codes */}
        <div className="flex flex-col gap-4">
          {[
            { label: 'HEX', value: hex },
            { label: 'RGB', value: `rgb(${rgb})` },
            { label: 'HSL', value: `hsl(${hsl})` }
          ].map((format) => (
            <div key={format.label} className="bg-card border border-border rounded-xl p-5 shadow-sm group hover:-translate-y-1 transition-all">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold uppercase tracking-wider text-secondary-foreground">{format.label}</span>
                <button
                  onClick={() => copyToClipboard(format.value, format.label)}
                  className="p-2 rounded-md hover:bg-secondary text-secondary-foreground transition-all"
                  title="Copy"
                >
                  {copied === format.label ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <input
                type="text"
                readOnly
                value={format.value}
                className="w-full bg-secondary/30 border border-transparent focus:border-border rounded-lg px-4 py-3 text-lg font-mono outline-none transition-colors cursor-text"
              />
            </div>
          ))}
        </div>

      </div>
    </ToolLayout>
  );
}
