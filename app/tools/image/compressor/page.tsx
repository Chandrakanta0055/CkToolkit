"use client";

import { ToolLayout } from '@/components/ui/ToolLayout';
import { useState, useRef, useEffect } from 'react';
import { Download, Upload, Image as ImageIcon, Trash2, ArrowRight } from 'lucide-react';

export default function ImageCompressorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
    }
  };

  const clearImage = () => {
    setFile(null);
    setPreview(null);
    setCompressedImage(null);
    setCompressedSize(0);
  };

  useEffect(() => {
    if (!preview || !file) return;

    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const mimeType = file.type === 'image/png' ? 'image/jpeg' : file.type; // PNG doesn't support quality parameter
      const compressedDataUrl = canvas.toDataURL(mimeType, quality);
      
      setCompressedImage(compressedDataUrl);

      // Estimate compressed size
      const base64str = compressedDataUrl.split(',')[1];
      const decoded = atob(base64str);
      setCompressedSize(decoded.length);
    };
  }, [preview, quality, file]);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCompressionRatio = () => {
    if (!file || !compressedSize) return 0;
    return Math.max(0, Math.round((1 - (compressedSize / file.size)) * 100));
  };

  return (
    <ToolLayout
      toolId="image-compressor"
      title="Image Compressor"
      description="Reduce image file size instantly while preserving visual quality. Fully secure client-side processing."
    >
      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        <canvas ref={canvasRef} className="hidden" />

        {!file ? (
          <div className="w-full h-80 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center bg-secondary/20 transition-all hover:bg-secondary/40 hover:border-primary/50 relative group">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
            />
            <div className="p-4 bg-primary/10 rounded-full text-primary mb-4 group-hover:scale-110 transition-transform">
              <Upload className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Drag & Drop Image Here</h3>
            <p className="text-secondary-foreground/60 text-sm max-w-sm text-center">
              Supports JPG, PNG, WebP. Images are processed locally and never uploaded to any server.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center px-4 py-3 bg-secondary/30 rounded-xl border border-border">
              <div className="flex items-center gap-3 overflow-hidden">
                <ImageIcon className="h-5 w-5 text-primary shrink-0" />
                <span className="font-medium text-sm truncate max-w-[200px] sm:max-w-md">{file.name}</span>
              </div>
              <button onClick={clearImage} className="text-sm px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-500/10 font-medium transition-colors">
                Remove
              </button>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold">Compression Quality: {Math.round(quality * 100)}%</label>
                <div className="text-sm font-medium">
                  {formatSize(file.size)} <ArrowRight className="inline h-3 w-3 mx-1 text-secondary-foreground" /> 
                  <span className={getCompressionRatio() > 0 ? "text-green-500 font-bold" : "text-orange-500 font-bold"}>
                    {formatSize(compressedSize)}
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary mt-2"
              />
              <div className="mt-4 flex justify-between items-center text-xs text-secondary-foreground">
                <span>Smaller File Size</span>
                <span>Better Quality</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-center">Original ({formatSize(file.size)})</span>
                <div className="relative aspect-square sm:aspect-video rounded-xl overflow-hidden bg-secondary border border-border">
                  <img src={preview!} alt="Original" className="w-full h-full object-contain" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-center">Compressed <span className="text-green-500">(-{getCompressionRatio()}%)</span></span>
                <div className="relative aspect-square sm:aspect-video rounded-xl overflow-hidden bg-secondary border border-border">
                  {compressedImage && <img src={compressedImage} alt="Compressed" className="w-full h-full object-contain" />}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <a
                href={compressedImage || '#'}
                download={`compressed_${file.name.replace(/\.[^/.]+$/, "")}.jpg`}
                className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold shadow-md transition-all ${
                  compressedImage 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg active:scale-95' 
                    : 'bg-secondary text-secondary-foreground opacity-50 cursor-not-allowed'
                }`}
              >
                <Download className="h-5 w-5" />
                Download Compressed Image
              </a>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
