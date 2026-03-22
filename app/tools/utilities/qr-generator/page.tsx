"use client";

import { ToolLayout } from '@/components/ui/ToolLayout';
import { useState, useRef } from 'react';
import { Download, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function QrGeneratorPage() {
  const [text, setText] = useState('https://onetoolkit.com');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#09090b');
  const [bgColor, setBgColor] = useState('#ffffff');
  const svgRef = useRef<SVGSVGElement>(null);

  const downloadQrCode = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0);
        
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = 'onetoolkit-qrcode.png';
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <ToolLayout
      toolId="qr-generator"
      title="QR Code Generator"
      description="Create customizable QR codes for links, text, or contact information instantly."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
        
        {/* Controls */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-primary" /> Content
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter URL or text here..."
              className="w-full h-32 p-4 rounded-xl bg-secondary/30 border border-border resize-none text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 relative">
              <label className="text-sm font-semibold flex items-center gap-2">
                <ImageIcon className="h-4 w-4" /> Foreground Color
              </label>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  value={fgColor} 
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent p-0"
                />
                <input 
                  type="text" 
                  value={fgColor} 
                  onChange={(e) => setFgColor(e.target.value)}
                  className="flex-1 bg-card border border-border rounded-lg px-3 py-2 text-sm outline-none uppercase font-mono"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="text-sm font-semibold flex items-center gap-2">
                <ImageIcon className="h-4 w-4" /> Background Color
              </label>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  value={bgColor} 
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent p-0"
                />
                <input 
                  type="text" 
                  value={bgColor} 
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 bg-card border border-border rounded-lg px-3 py-2 text-sm outline-none uppercase font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold">Image Size</label>
              <span className="text-sm font-medium text-primary">{size}x{size} px</span>
            </div>
            <input
              type="range"
              min="128"
              max="1024"
              step="32"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary mt-2"
            />
          </div>
        </div>

        {/* Live Preview */}
        <div className="flex flex-col items-center justify-center gap-8 bg-secondary/20 border border-border rounded-xl p-8">
          <div className="bg-card p-4 rounded-xl shadow-sm border border-border/50 transition-transform hover:scale-105 duration-300">
            <QRCodeSVG
              value={text || ' '}
              size={200}
              fgColor={fgColor}
              bgColor={bgColor}
              level="H"
              includeMargin={true}
              ref={svgRef}
              className="rounded-lg max-w-full h-auto"
            />
          </div>
          
          <button
            onClick={downloadQrCode}
            disabled={!text}
            className="w-full max-w-xs flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            <Download className="h-5 w-5" />
            Download PNG
          </button>
        </div>

      </div>
    </ToolLayout>
  );
}
