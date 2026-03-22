"use client";

import { ToolLayout } from '@/components/ui/ToolLayout';
import { useState } from 'react';
import { Download, FileType2, Trash2, Upload, SplitSquareHorizontal } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';


// Better approach to split: Just generate two PDFs based on a page range or single pages.
// If multiple files, we trigger multiple downloads or just combine them into a zip?
// Let's just do a simple "Extract Range" which outputs 1 PDF to avoid JSZip.

export default function SplitPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pagesToExtract, setPagesToExtract] = useState<string>('');
  const [isSplitting, setIsSplitting] = useState(false);
  const [splitPdfUrl, setSplitPdfUrl] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setSplitPdfUrl(null);

      // Load to get page count
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const count = pdfDoc.getPageCount();
        setTotalPages(count);
        setPagesToExtract(`1-${count}`);
      } catch (err) {
        alert("Invalid PDF file.");
        setFile(null);
      }
    }
  };

  const parsePageRange = (rangeText: string, maxPages: number) => {
    const pages = new Set<number>();
    const parts = rangeText.split(',');
    
    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(str => parseInt(str.trim(), 10));
        if (!isNaN(start) && !isNaN(end) && start <= end) {
          for (let i = start; i <= end; i++) {
            if (i >= 1 && i <= maxPages) pages.add(i - 1); // 0-indexed
          }
        }
      } else {
        const pageNum = parseInt(part.trim(), 10);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= maxPages) {
          pages.add(pageNum - 1);
        }
      }
    }
    
    return Array.from(pages).sort((a, b) => a - b);
  };

  const splitPDF = async () => {
    if (!file) return;
    
    const pageIndices = parsePageRange(pagesToExtract, totalPages);
    if (pageIndices.length === 0) {
      alert("Invalid page range.");
      return;
    }

    setIsSplitting(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const bytesArr = new Uint8Array(pdfBytes);
      const blob = new Blob([bytesArr], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setSplitPdfUrl(url);

    } catch (error) {
      console.error("Error extracting pages:", error);
      alert("Failed to split PDF.");
    } finally {
      setIsSplitting(false);
    }
  };

  return (
    <ToolLayout
      toolId="split-pdf"
      title="Split PDF"
      description="Extract specific pages from a PDF file securely in your browser."
    >
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        
        {!file ? (
          <div className="w-full h-48 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center bg-secondary/20 transition-all hover:bg-secondary/40 hover:border-primary/50 relative group">
            <input 
              type="file" 
              accept="application/pdf" 
              onChange={handleFileChange} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
            />
            <div className="p-4 bg-primary/10 rounded-full text-primary mb-3 group-hover:-translate-y-1 transition-transform">
              <Upload className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-1">Select a PDF File</h3>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center px-4 py-3 bg-secondary/30 rounded-xl border border-border">
              <div className="flex items-center gap-3 overflow-hidden">
                <FileType2 className="h-5 w-5 text-red-500 shrink-0" />
                <div className="flex flex-col">
                  <span className="font-medium text-sm truncate max-w-[200px] sm:max-w-md">{file.name}</span>
                  <span className="text-xs text-muted-foreground">{totalPages} pages total</span>
                </div>
              </div>
              <button onClick={() => {setFile(null); setSplitPdfUrl(null);}} className="text-sm px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-500/10 font-medium transition-colors flex items-center gap-1">
                <Trash2 className="h-4 w-4" /> Remove
              </button>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h4 className="font-bold flex items-center gap-2 mb-4"><SplitSquareHorizontal className="h-5 w-5 text-primary" /> Extract Pages</h4>
              
              <div className="flex flex-col gap-2 mb-6">
                <label className="text-sm font-semibold text-secondary-foreground">Pages to Extract</label>
                <input 
                  type="text" 
                  value={pagesToExtract}
                  onChange={(e) => setPagesToExtract(e.target.value)}
                  placeholder={`e.g. 1-3, 5, 7-${Math.min(10, totalPages)}`}
                  className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-foreground tracking-wide font-mono"
                />
                <p className="text-xs text-secondary-foreground/70 mt-1">Use commas to separate page numbers and ranges (e.g., 1-5, 8, 11-13).</p>
              </div>

              {!splitPdfUrl ? (
                <button
                  onClick={splitPDF}
                  disabled={isSplitting}
                  className="w-full sm:w-auto mt-2 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSplitting ? 'Processing...' : 'Extract Pages'}
                </button>
              ) : (
                <a
                  href={splitPdfUrl}
                  download={`extracted_${file.name}`}
                  className="w-full sm:w-auto mt-2 flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-green-700 transition-all shadow-md active:scale-95"
                >
                  <Download className="h-5 w-5" />
                  Download Custom PDF
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
