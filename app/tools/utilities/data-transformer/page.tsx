"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { 
  FileJson, 
  FileSpreadsheet, 
  Table as TableIcon, 
  Download, 
  Trash2, 
  ArrowRightLeft, 
  Database,
  Check,
  Clipboard,
  Search,
  Settings2
} from "lucide-react";
import { ToolLayout } from "@/components/ui/ToolLayout";

type DataRow = Record<string, any>;

export default function DataTransformerPage() {
  const [data, setData] = useState<DataRow[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"preview" | "json" | "csv">("preview");
  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState(false);

  const processData = (result: DataRow[], name: string) => {
    if (result.length > 0) {
      setHeaders(Object.keys(result[0]));
      setData(result);
      setFileName(name.split(".")[0]);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const extension = file.name.split(".").pop()?.toLowerCase();

    if (extension === "csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          processData(results.data as DataRow[], file.name);
        },
      });
    } else if (extension === "json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          processData(Array.isArray(json) ? json : [json], file.name);
        } catch (err) {
          alert("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    } else if (extension === "xlsx" || extension === "xls") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        processData(json as DataRow[], file.name);
      };
      reader.readAsArrayBuffer(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/json": [".json"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
  });

  const clearData = () => {
    setData([]);
    setHeaders([]);
    setFileName("");
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName || "data"}.json`;
    link.click();
  };

  const downloadCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName || "data"}.csv`;
    link.click();
  };

  const copyToClipboard = () => {
    const content = activeTab === "json" ? JSON.stringify(data, null, 2) : Papa.unparse(data);
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredData = data.filter(row => 
    Object.values(row).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <ToolLayout
      title="Universal Data Transformer"
      description="Professional-grade conversion between CSV, JSON, and Excel formats. 100% private browser-side processing."
      toolId="data-transformer"
    >
      <div className="space-y-8">
        {data.length === 0 ? (
          /* ─── Upload Zone ─── */
          <div 
            {...getRootProps()} 
            className={`relative group cursor-pointer py-24 rounded-[40px] border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center text-center px-6 ${
              isDragActive 
                ? "border-soft-blue bg-soft-blue/5 shadow-[0_0_40px_rgba(79,140,255,0.1)]" 
                : "border-white/10 bg-white/[0.02] hover:border-vibrant-purple/40 hover:bg-white/[0.03]"
            }`}
          >
            <input {...getInputProps()} />
            <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-soft-blue to-vibrant-purple p-[1px] mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg">
               <div className="h-full w-full rounded-[23px] bg-[#0B0F1A] flex items-center justify-center">
                 <Database className="h-8 w-8 text-white group-hover:text-soft-blue transition-colors" />
               </div>
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Drop your data file here</h3>
            <p className="text-[#94A3B8] max-w-sm leading-relaxed mb-8">
              Supports <span className="text-soft-blue font-bold">CSV</span>, 
              <span className="text-vibrant-purple font-bold"> JSON</span>, or 
              <span className="text-logo-cyan font-bold"> Excel (.xlsx)</span>. 
              Maximum privacy: Your data never leaves this page.
            </p>
            <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#E2E8F0]/40">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" /> Excel
              </div>
              <div className="flex items-center gap-2">
                <FileJson className="h-4 w-4" /> JSON
              </div>
              <div className="flex items-center gap-2 text-soft-glow-blue">
                <Check className="h-4 w-4" /> 100% Local
              </div>
            </div>
          </div>
        ) : (
          /* ─── Transformation Workspace ─── */
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            
            {/* Header / Stats Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-soft-blue/20 to-vibrant-purple/20 border border-white/10 flex items-center justify-center">
                   <TableIcon className="h-6 w-6 text-soft-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{fileName}</h3>
                  <p className="text-xs text-[#94A3B8]">{data.length} rows · {headers.length} columns identified</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <button 
                  onClick={clearData}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-lg"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Discard
                </button>
                <div className="h-8 w-px bg-white/10 mx-2 hidden md:block" />
                <button 
                  onClick={downloadJSON}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-[#E2E8F0] text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  <FileJson className="h-3.5 w-3.5" />
                  .JSON
                </button>
                <button 
                  onClick={downloadCSV}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-[#E2E8F0] text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  .CSV
                </button>
              </div>
            </div>

            {/* Main Tabs Container */}
            <div className="rounded-[32px] bg-white/[0.02] border border-white/5 overflow-hidden">
               {/* Tab Headers */}
               <div className="flex items-center justify-between p-4 border-b border-white/5 bg-black/20">
                 <div className="flex gap-2">
                    {[
                      { id: 'preview', label: 'Preview Table', icon: TableIcon },
                      { id: 'json', label: 'Output JSON', icon: FileJson },
                      { id: 'csv', label: 'Output CSV', icon: FileSpreadsheet },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          activeTab === tab.id 
                            ? "bg-white/10 text-white shadow-xl" 
                            : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <tab.icon className="h-3.5 w-3.5" />
                        {tab.label}
                      </button>
                    ))}
                 </div>

                 <div className="flex items-center gap-4">
                    {activeTab === 'preview' ? (
                      <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8] group-focus-within:text-soft-blue transition-colors" />
                        <input 
                          type="text"
                          placeholder="Search rows..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white outline-none focus:border-soft-blue/50 w-48 md:w-64 transition-all"
                        />
                      </div>
                    ) : (
                      <button 
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-soft-blue/20 to-vibrant-purple/20 border border-white/10 text-[10px] font-black uppercase tracking-widest text-[#E2E8F0] hover:scale-105 active:scale-95 transition-all"
                      >
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4" />}
                        {copied ? "Copied!" : "Copy Output"}
                      </button>
                    )}
                 </div>
               </div>

               {/* Tab Content */}
               <div className="p-0 overflow-hidden min-h-[500px] max-h-[700px] overflow-y-auto custom-scrollbar">
                  {activeTab === 'preview' && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 z-10 bg-[#0F172A] border-b border-white/10">
                          <tr>
                            {headers.map(h => (
                              <th key={h} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#94A3B8] whitespace-nowrap">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredData.slice(0, 500).map((row, i) => (
                            <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                              {headers.map(h => (
                                <td key={h} className="px-6 py-4 text-xs text-[#E2E8F0] whitespace-nowrap">
                                  {String(row[h]) || "-"}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {filteredData.length > 500 && (
                        <div className="p-8 text-center border-t border-white/5 bg-black/20">
                          <p className="text-xs text-[#94A3B8]">Showing first 500 rows for performance. All {data.length} rows will be included in the export.</p>
                        </div>
                      )}
                      {filteredData.length === 0 && (
                        <div className="py-20 text-center">
                          <p className="text-sm text-[#94A3B8]">No rows match your search.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'json' && (
                    <pre className="p-8 text-xs font-mono text-soft-blue leading-relaxed bg-black/40 overflow-x-auto h-full">
                      {JSON.stringify(data, null, 2)}
                    </pre>
                  )}

                  {activeTab === 'csv' && (
                    <pre className="p-8 text-xs font-mono text-logo-cyan leading-relaxed bg-black/40 overflow-x-auto h-full">
                      {Papa.unparse(data)}
                    </pre>
                  )}
               </div>
            </div>

            {/* Bottom Tip */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
               <Settings2 className="h-4 w-4 text-vibrant-purple" />
               <p className="text-[10px] font-bold text-[#94A3B8]">
                 <span className="text-[#E2E8F0]">Pro Tip:</span> You can drag JSON files here to quickly generate CSV/Excel schemas for your database migrations.
               </p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
