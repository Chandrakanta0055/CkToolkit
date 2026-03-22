"use client";

import { ToolLayout } from '@/components/ui/ToolLayout';
import { useState } from 'react';
import { Download, FileType2, Trash2, Plus, ArrowDown, ArrowUp } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface PdfFile {
  id: string;
  name: string;
  size: number;
  file: File;
}

export default function MergePdfPage() {
  const [pdfs, setPdfs] = useState<PdfFile[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
        file
      }));
      setPdfs(prev => [...prev, ...newFiles]);
      setMergedPdfUrl(null);
    }
    e.target.value = '';
  };

  const removeFile = (id: string) => {
    setPdfs(prev => prev.filter(f => f.id !== id));
    setMergedPdfUrl(null);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newArr = [...pdfs];
    [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
    setPdfs(newArr);
    setMergedPdfUrl(null);
  };

  const moveDown = (index: number) => {
    if (index === pdfs.length - 1) return;
    const newArr = [...pdfs];
    [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
    setPdfs(newArr);
    setMergedPdfUrl(null);
  };

  const mergePDFs = async () => {
    if (pdfs.length < 2) {
      alert("Please select at least 2 PDF files to merge.");
      return;
    }
    
    setIsMerging(true);
    setMergedPdfUrl(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const pdfItem of pdfs) {
        const arrayBuffer = await pdfItem.file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const bytesArr = new Uint8Array(pdfBytes);
      const blob = new Blob([bytesArr], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);

    } catch (error) {
      console.error("Error merging PDFs:", error);
      alert("Failed to merge PDFs. One or more files might be corrupted or encrypted.");
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <ToolLayout
      toolId="merge-pdf"
      title="Merge PDFs"
      description="Combine multiple PDF files into one single document securely in your browser."
    >
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        
        {/* Upload Zone */}
        <div className="w-full h-48 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center bg-secondary/20 transition-all hover:bg-secondary/40 hover:border-primary/50 relative group">
          <input 
            type="file" 
            accept="application/pdf" 
            multiple
            onChange={handleFilesChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
          />
          <div className="p-4 bg-primary/10 rounded-full text-primary mb-3 group-hover:-translate-y-1 transition-transform">
            <Plus className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold mb-1">Add PDF Files</h3>
          <p className="text-secondary-foreground/60 text-sm text-center px-4">
            Files are processed completely locally.
          </p>
        </div>

        {/* Selected Files List */}
        {pdfs.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{pdfs.length} {pdfs.length === 1 ? 'File' : 'Files'} Selected</h4>
              <button 
                onClick={() => setPdfs([])}
                className="text-sm text-red-500 hover:bg-red-500/10 px-3 py-1.5 rounded-md transition-colors font-medium"
              >
                Clear All
              </button>
            </div>

            <div className="bg-secondary/30 border border-border rounded-xl p-2 max-h-[400px] overflow-y-auto flex flex-col gap-2 shadow-inner">
              {pdfs.map((pdf, index) => (
                <div key={pdf.id} className="flex items-center gap-4 p-3 bg-card border border-border rounded-lg shadow-sm group hover:-translate-y-0.5 transition-transform">
                  <div className="flex flex-col gap-1 items-center justify-center text-muted-foreground mr-2">
                    <button onClick={() => moveUp(index)} disabled={index === 0} className="hover:text-primary disabled:opacity-30">
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button onClick={() => moveDown(index)} disabled={index === pdfs.length - 1} className="hover:text-primary disabled:opacity-30">
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-red-500/10 text-red-500 shrink-0 border border-red-500/20">
                    <FileType2 className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{pdf.name}</p>
                    <p className="text-xs text-secondary-foreground">{(pdf.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button 
                    onClick={() => removeFile(pdf.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                    title="Remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 mt-4">
              <div className="text-sm text-secondary-foreground">
                Merge order is from top to bottom.
              </div>

              {!mergedPdfUrl ? (
                <button
                  onClick={mergePDFs}
                  disabled={isMerging || pdfs.length < 2}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isMerging ? (
                    <>
                      <div className="h-5 w-5 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                      Merging...
                    </>
                  ) : (
                    <>
                      <FileType2 className="h-5 w-5" />
                      Merge PDFs
                    </>
                  )}
                </button>
              ) : (
                <a
                  href={mergedPdfUrl}
                  download="cktoolkit_merged.pdf"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-green-700 transition-all shadow-md active:scale-95"
                >
                  <Download className="h-5 w-5" />
                  Download Merged PDF
                </a>
              )}
            </div>
          </div>
        )}

      </div>
    </ToolLayout>
  );
}
