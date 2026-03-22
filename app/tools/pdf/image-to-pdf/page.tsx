"use client";

import { ToolLayout } from '@/components/ui/ToolLayout';
import { useState } from 'react';
import { Download, Upload, FileImage, Trash2, Plus, GripVertical } from 'lucide-react';
import jsPDF from 'jspdf';

interface ImageFile {
  id: string;
  url: string;
  file: File;
}

export default function ImageToPdfPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [orientation, setOrientation] = useState<'p' | 'l'>('p');

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const newImages = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substring(7),
        url: URL.createObjectURL(file),
        file
      }));
      setImages(prev => [...prev, ...newImages]);
    }
    // reset input
    e.target.value = '';
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const clearAll = () => {
    setImages([]);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newImages = [...images];
    [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
    setImages(newImages);
  };

  const moveDown = (index: number) => {
    if (index === images.length - 1) return;
    const newImages = [...images];
    [newImages[index + 1], newImages[index]] = [newImages[index], newImages[index + 1]];
    setImages(newImages);
  };

  const generatePDF = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);

    try {
      const pdf = new jsPDF({
        orientation: orientation,
        unit: 'px',
        format: 'a4'
      });
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage();
        
        const img = new Image();
        img.src = images[i].url;
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        // Calculate aspect ratio fit
        const imgRatio = img.width / img.height;
        const pageRatio = pageWidth / pageHeight;

        let renderWidth = pageWidth;
        let renderHeight = pageHeight;

        // Auto-fit maintaining aspect ratio, with 20px padding
        const padding = 20;
        const availWidth = pageWidth - (padding * 2);
        const availHeight = pageHeight - (padding * 2);

        if (imgRatio > (availWidth / availHeight)) {
          renderWidth = availWidth;
          renderHeight = availWidth / imgRatio;
        } else {
          renderHeight = availHeight;
          renderWidth = availHeight * imgRatio;
        }
        
        const x = (pageWidth - renderWidth) / 2;
        const y = (pageHeight - renderHeight) / 2;

        const imgType = images[i].file.type === 'image/png' ? 'PNG' : 'JPEG';
        pdf.addImage(images[i].url, imgType, x, y, renderWidth, renderHeight);
      }
      
      pdf.save('onetoolkit-images.pdf');
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('An error occurred while generating the PDF.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ToolLayout
      toolId="image-to-pdf"
      title="Image to PDF"
      description="Convert multiple images (JPG, PNG, WebP) into a single PDF document instantly."
    >
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        
        {/* Upload Zone */}
        <div className="w-full h-48 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center bg-secondary/20 transition-all hover:bg-secondary/40 hover:border-primary/50 relative group">
          <input 
            type="file" 
            accept="image/png, image/jpeg, image/webp" 
            multiple
            onChange={handleFilesChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
          />
          <div className="p-4 bg-primary/10 rounded-full text-primary mb-3 group-hover:-translate-y-1 transition-transform">
            <Plus className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold mb-1">Add Images</h3>
          <p className="text-secondary-foreground/60 text-sm text-center px-4">
            Drag & drop or click to select multiple images.
          </p>
        </div>

        {/* Selected Images List */}
        {images.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{images.length} {images.length === 1 ? 'Image' : 'Images'} Selected</h4>
              <button 
                onClick={clearAll}
                className="text-sm text-red-500 hover:bg-red-500/10 px-3 py-1.5 rounded-md transition-colors font-medium"
              >
                Clear All
              </button>
            </div>

            <div className="bg-secondary/30 border border-border rounded-xl p-2 max-h-[400px] overflow-y-auto flex flex-col gap-2">
              {images.map((img, index) => (
                <div key={img.id} className="flex items-center gap-4 p-3 bg-card border border-border rounded-lg shadow-sm group">
                  <div className="flex flex-col gap-1 items-center justify-center text-muted-foreground">
                    <button onClick={() => moveUp(index)} disabled={index === 0} className="hover:text-foreground disabled:opacity-30">
                      <span className="text-xs">▲</span>
                    </button>
                    <button onClick={() => moveDown(index)} disabled={index === images.length - 1} className="hover:text-foreground disabled:opacity-30">
                      <span className="text-xs">▼</span>
                    </button>
                  </div>
                  <div className="h-16 w-16 bg-secondary rounded overflow-hidden shrink-0 border border-border">
                    <img src={img.url} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{img.file.name}</p>
                    <p className="text-xs text-secondary-foreground">{(img.file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button 
                    onClick={() => removeImage(img.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                    title="Remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Options & Action */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 mt-4">
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <label className="text-sm font-semibold">Page Orientation</label>
                <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-lg border border-border inline-flex">
                  <button 
                    onClick={() => setOrientation('p')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${orientation === 'p' ? 'bg-card shadow-sm text-foreground' : 'text-secondary-foreground hover:text-foreground'}`}
                  >
                    Portrait
                  </button>
                  <button 
                    onClick={() => setOrientation('l')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${orientation === 'l' ? 'bg-card shadow-sm text-foreground' : 'text-secondary-foreground hover:text-foreground'}`}
                  >
                    Landscape
                  </button>
                </div>
              </div>

              <button
                onClick={generatePDF}
                disabled={isGenerating}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <div className="h-5 w-5 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Download PDF
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </ToolLayout>
  );
}
