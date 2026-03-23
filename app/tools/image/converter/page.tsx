"use client";

import { ToolLayout } from '@/components/ui/ToolLayout';
import { useState, useRef, useEffect } from 'react';
import { Download, Upload, Image as ImageIcon, ArrowRightLeft, Trash2 } from 'lucide-react';

export default function ImageConverterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('image/jpeg');
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const clearImage = () => {
    setFile(null);
    setPreview(null);
    setConvertedImage(null);
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

      const convertedDataUrl = canvas.toDataURL(targetFormat, 1.0);
      setConvertedImage(convertedDataUrl);
    };
  }, [preview, targetFormat, file]);

  const getFormatExtension = (mimeType: string) => {
    return mimeType.split('/')[1];
  };

  return (
    <ToolLayout
      toolId="image-converter"
      title="Image Format Converter"
      description="Convert images instantly between PNG, JPG, and WebP using client-side processing."
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
            <div className="p-5 bg-primary/10 rounded-full text-primary mb-4 group-hover:-translate-y-2 transition-transform shadow-sm">
              <Upload className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2 tracking-tight">Select an Image</h3>
            <p className="text-secondary-foreground/60 text-sm max-w-sm text-center">
              Works securely entirely within your browser.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center px-4 py-3 bg-card rounded-xl border border-border shadow-sm">
              <div className="flex items-center gap-3 overflow-hidden">
                <ImageIcon className="h-5 w-5 text-primary shrink-0" />
                <span className="font-medium text-sm truncate max-w-[200px] sm:max-w-md">{file.name}</span>
              </div>
              <button 
                onClick={clearImage} 
                className="text-sm px-3 py-1.5 flex items-center gap-1 rounded-lg text-red-500 hover:bg-red-500/10 font-medium transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            </div>

            <div className="bg-secondary/30 border border-border rounded-xl p-6 sm:p-8 flex flex-col items-center shadow-inner mt-4">
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                Convert {getFormatExtension(file.type).toUpperCase()} <ArrowRightLeft className="mx-2 h-4 w-4 text-muted-foreground" />
              </h4>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                {[
                  { label: 'JPG', value: 'image/jpeg' },
                  { label: 'PNG', value: 'image/png' },
                  { label: 'WebP', value: 'image/webp' }
                ].map((fmt) => (
                  <label 
                    key={fmt.value}
                    className={`flex items-center gap-2 px-6 py-4 rounded-xl border-2 transition-all cursor-pointer ${
                      targetFormat === fmt.value 
                        ? 'border-primary bg-primary/5 shadow-sm' 
                        : 'border-border bg-card hover:bg-secondary'
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value={fmt.value}
                      checked={targetFormat === fmt.value}
                      onChange={() => setTargetFormat(fmt.value)}
                      className="w-4 h-4 text-primary focus:ring-primary/50"
                    />
                    <span className="font-semibold">{fmt.label}</span>
                  </label>
                ))}
              </div>

              <a
                href={convertedImage || '#'}
                download={`converted_${file.name.replace(/\.[^/.]+$/, "")}.${getFormatExtension(targetFormat)}`}
                className={`w-full max-w-md flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold shadow-md transition-all ${
                  convertedImage && targetFormat !== file.type
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]' 
                    : 'bg-secondary text-secondary-foreground opacity-50 cursor-not-allowed'
                }`}
              >
                <Download className="h-5 w-5" />
                Download as {getFormatExtension(targetFormat).toUpperCase()}
              </a>
              {targetFormat === file.type && (
                <p className="mt-4 text-sm text-orange-500/80 font-medium">Please select a different format to convert.</p>
              )}
            </div>
          </div>
        )}

        {/* SEO Content Section */}
        <div className="mt-8 bg-card/50 border border-border/50 rounded-2xl p-6 md:p-10 space-y-8">
          <div>
            <h2 className="text-xl md:text-2xl font-black mb-4 tracking-tight">Free Online Image Format Converter</h2>
            <p className="text-secondary-foreground/80 leading-relaxed text-sm md:text-base">
              Need to convert a PNG to JPG, or a JPG to WebP? CkToolKit's universal Image Converter makes changing image formats completely effortless. Whether you need a transparent PNG for a design project or a next-gen WebP image for modern web development, our tool converts your files instantly in the browser.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-primary">Supported Formats</h3>
              <ul className="space-y-2 text-sm text-secondary-foreground/80 list-disc list-inside">
                <li><strong className="text-secondary-foreground">JPG/JPEG:</strong> Best for photographs and reducing file sizes.</li>
                <li><strong className="text-secondary-foreground">PNG:</strong> Perfect for graphics requiring transparent backgrounds.</li>
                <li><strong className="text-secondary-foreground">WebP:</strong> The modern standard for high-quality, ultra-compressed web images.</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-primary">100% Private Conversion</h3>
              <p className="text-sm text-secondary-foreground/80 leading-relaxed">
                Unlike server-based converters that force you to upload your sensitive files, our tool converts your images <strong>directly on your device</strong>. No wait times, no data limits, and absolute privacy guaranteed.
              </p>
            </div>
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
