"use client";

import { ToolLayout } from '@/components/ui/ToolLayout';
import { useState, useRef, useEffect } from 'react';
import { Download, Upload, Image as ImageIcon, Maximize, Trash2, Link as LinkIcon, Crop } from 'lucide-react';
import ReactCrop, { Crop as CropType, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function ImageResizeCropPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Crop states
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<CropType>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  
  // Resize states
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [maintainAspect, setMaintainAspect] = useState(true);
  
  // Output states
  const [outputFormat, setOutputFormat] = useState<string>('image/jpeg');
  const [finalImage, setFinalImage] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      // Reset states
      setCrop(undefined);
      setCompletedCrop(null);
      setFinalImage(null);
      setOutputFormat(selectedFile.type === 'image/png' ? 'image/png' : 'image/jpeg');
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setWidth(width);
    setHeight(height);
  };

  const handleAspectChange = (newAspect: number | undefined) => {
    setAspect(newAspect);
    if (newAspect && imgRef.current) {
      const { width, height } = imgRef.current;
      const newCrop = centerCrop(
        makeAspectCrop(
          { unit: '%', width: 90 },
          newAspect,
          width,
          height
        ),
        width,
        height
      );
      setCrop(newCrop);
    } else {
      setCrop(undefined);
    }
  };

  const handleWidthChange = (val: string) => {
    const w = parseInt(val) || 0;
    setWidth(w);
    if (maintainAspect && completedCrop) {
      setHeight(Math.round(w / (completedCrop.width / completedCrop.height)));
    } else if (maintainAspect && imgRef.current) {
      setHeight(Math.round(w / (imgRef.current.width / imgRef.current.height)));
    }
  };

  const handleHeightChange = (val: string) => {
    const h = parseInt(val) || 0;
    setHeight(h);
    if (maintainAspect && completedCrop) {
      setWidth(Math.round(h * (completedCrop.width / completedCrop.height)));
    } else if (maintainAspect && imgRef.current) {
      setWidth(Math.round(h * (imgRef.current.width / imgRef.current.height)));
    }
  };

  const applyChanges = async () => {
    if (!imgRef.current || !previewUrl) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Determine what part of the image to draw from
    let sourceX = 0;
    let sourceY = 0;
    let sourceWidth = imgRef.current.naturalWidth;
    let sourceHeight = imgRef.current.naturalHeight;

    if (completedCrop && completedCrop.width > 0 && completedCrop.height > 0) {
      // Scale crop coordinates to natural image size
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      sourceX = completedCrop.x * scaleX;
      sourceY = completedCrop.y * scaleY;
      sourceWidth = completedCrop.width * scaleX;
      sourceHeight = completedCrop.height * scaleY;
    }

    // Set output canvas size to Resize Dimensions
    canvas.width = width;
    canvas.height = height;
    
    // Draw the cropped area scaled to the new width/height
    ctx.drawImage(
      imgRef.current,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      width,
      height
    );
    
    const dataUrl = canvas.toDataURL(outputFormat, 1.0);
    setFinalImage(dataUrl);
  };

  const clearImage = () => {
    setFile(null);
    setPreviewUrl(null);
    setFinalImage(null);
    setCrop(undefined);
    setCompletedCrop(null);
  };

  const getFormatExtension = (mimeType: string) => {
    return mimeType.split('/')[1] === 'jpeg' ? 'jpg' : mimeType.split('/')[1];
  };

  // Sync aspect ratio checkbox logic
  useEffect(() => {
    if (completedCrop && completedCrop.width && completedCrop.height) {
       setWidth(Math.round(completedCrop.width));
       setHeight(Math.round(completedCrop.height));
    }
  }, [completedCrop]);

  return (
    <ToolLayout
      toolId="image-resize"
      title="Resize & Crop Image"
      description="Advanced tool to crop, select aspect ratios, and resize images with precise dimensions."
    >
      <div className="flex flex-col gap-8 max-w-6xl mx-auto">
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
              Works securely entirely within your browser.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Controls */}
              <div className="w-full lg:w-1/3 flex flex-col gap-6">
                <div className="flex justify-between items-center px-4 py-3 bg-secondary/30 rounded-xl border border-border">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <ImageIcon className="h-5 w-5 text-primary shrink-0" />
                    <span className="font-medium text-sm truncate max-w-[150px]">{file.name}</span>
                  </div>
                  <button onClick={clearImage} className="text-red-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col gap-5">
                  
                  {/* Aspect Ratio Tools */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-bold flex items-center gap-2"><Crop className="h-4 w-4 text-primary" /> Crop Ratio</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'Free', value: undefined },
                        { label: '1:1', value: 1 },
                        { label: '16:9', value: 16/9 },
                        { label: '4:3', value: 4/3 },
                        { label: '3:2', value: 3/2 },
                        { label: '9:16', value: 9/16 }
                      ].map((ratio) => (
                        <button
                          key={ratio.label}
                          onClick={() => handleAspectChange(ratio.value)}
                          className={`text-xs font-semibold py-2 rounded-lg border transition-all ${aspect === ratio.value ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'bg-secondary/50 border-border text-secondary-foreground hover:bg-secondary'}`}
                        >
                          {ratio.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <hr className="border-border/50" />

                  {/* Resize Tools */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-bold flex items-center gap-2"><Maximize className="h-4 w-4 text-primary" /> Final Resize</h4>
                    
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-2 flex-1 relative">
                        <label className="text-xs font-bold text-secondary-foreground uppercase">Width</label>
                        <input 
                          type="number" 
                          value={width || ''}
                          onChange={(e) => handleWidthChange(e.target.value)}
                          className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50 text-sm font-mono"
                        />
                        {maintainAspect && (
                           <div className="absolute top-[38px] -right-3 z-10 text-primary">
                             <LinkIcon className="h-4 w-4 -rotate-45" />
                           </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-2 flex-1">
                        <label className="text-xs font-bold text-secondary-foreground uppercase">Height</label>
                        <input 
                          type="number" 
                          value={height || ''}
                          onChange={(e) => handleHeightChange(e.target.value)}
                          className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50 text-sm font-mono"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-3 mt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={maintainAspect}
                        onChange={(e) => setMaintainAspect(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
                      />
                      <span className="text-sm font-medium">Lock Aspect Ratio</span>
                    </label>
                  </div>

                  <hr className="border-border/50" />

                  {/* Output Format */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-bold flex items-center gap-2 text-sm text-secondary-foreground uppercase">Output Format</h4>
                    <select
                      value={outputFormat}
                      onChange={(e) => setOutputFormat(e.target.value)}
                      className="w-full bg-card border border-border rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium cursor-pointer"
                    >
                      <option value="image/jpeg">JPG / JPEG</option>
                      <option value="image/png">PNG</option>
                      <option value="image/webp">WebP</option>
                    </select>
                  </div>

                  <button
                    onClick={applyChanges}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md active:scale-95 mt-2"
                  >
                    Apply Crop & Resize
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div className="w-full lg:w-2/3 flex flex-col gap-4">
                
                {/* Visualizer */}
                <div className="flex flex-col items-center justify-center p-4 bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-secondary/10 border border-border rounded-xl min-h-[400px] overflow-hidden relative shadow-inner">
                  {previewUrl && !finalImage && (
                    <ReactCrop
                      crop={crop}
                      onChange={(_, percentCrop) => setCrop(percentCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={aspect}
                      className="max-h-[600px]"
                    >
                      <img 
                        ref={imgRef}
                        src={previewUrl} 
                        alt="Preview" 
                        onLoad={onImageLoad}
                        className="max-w-full max-h-[600px] object-contain"
                      />
                    </ReactCrop>
                  )}

                  {finalImage && (
                    <img 
                      src={finalImage} 
                      alt="Final Output" 
                      className="max-w-full max-h-[600px] shadow-2xl rounded-sm border border-border/50 transition-all duration-300"
                    />
                  )}
                  
                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur px-3 py-1.5 rounded-full shadow-sm text-xs font-bold border border-border">
                    {finalImage ? `Output Preview (${width}x${height}px)` : 'Crop & Select Area'}
                  </div>
                </div>

                {/* Final Download Action */}
                {finalImage && (
                  <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <div className="flex flex-col">
                      <span className="font-bold text-green-700 dark:text-green-400">Ready to download!</span>
                      <span className="text-xs font-medium text-green-600/80 dark:text-green-500/80">Format: {getFormatExtension(outputFormat).toUpperCase()} | Size: {width}x{height}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setFinalImage(null)} className="px-4 py-2 font-semibold text-sm rounded-lg hover:bg-secondary transition-colors">
                        Edit Again
                      </button>
                      <a
                        href={finalImage}
                        download={`edited_${file.name.replace(/\.[^/.]+$/, "")}.${getFormatExtension(outputFormat)}`}
                        className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition-all shadow-md active:scale-95"
                      >
                        <Download className="h-4 w-4" /> Download
                      </a>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
