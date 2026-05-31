import React from 'react';
import { GeneratedPedagogy, Language } from '../types';
import { translations } from '../utils/translations';
import { FileText, Download, Printer, Trash2, FolderOpen, AlertCircle } from 'lucide-react';
import { generatePedagogyPDF } from '../utils/pdfGenerator';

interface ExportPanelProps {
  language: Language;
  savedResources: GeneratedPedagogy[];
  onDeleteResource: (id: string) => void;
  activeResource: GeneratedPedagogy | null;
  onSelectResource: (resource: GeneratedPedagogy) => void;
}

export default function ExportPanel({
  language,
  savedResources,
  onDeleteResource,
  activeResource,
  onSelectResource
}: ExportPanelProps) {
  const t = translations[language];

  const downloadTextFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadMarkdown = (resource: GeneratedPedagogy) => {
    const markdownContent = `# ${resource.title}\n\n*Format: ${t[resource.format]}*\n*History focus: ${resource.pointName}*\n*Created on: ${resource.createdAt}*\n*Language: ${resource.language.toUpperCase()}*\n\n---\n\n${resource.content}`;
    
    const safeTitle = resource.title.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    downloadTextFile(markdownContent, `ancient_africa_${safeTitle}.md`, 'text/markdown;charset=utf-8');
  };

  const handleDownloadTxt = (resource: GeneratedPedagogy) => {
    const plainTextContent = `${resource.title}\n\nFormat: ${t[resource.format]}\nHistory focus: ${resource.pointName}\nCreated on: ${resource.createdAt}\nLanguage: ${resource.language.toUpperCase()}\n\n---------------------------------------\n\n${resource.content}`;
    
    const safeTitle = resource.title.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    downloadTextFile(plainTextContent, `ancient_africa_${safeTitle}.txt`, 'text/plain;charset=utf-8');
  };

  // High-fidelity client-side PDF exporter. Downloads nicely structured multi-page PDF files locally.
  const handleDownloadPDFLocal = (resource: GeneratedPedagogy) => {
    generatePedagogyPDF(resource);
  };

  // High-fidelity browser printer. Generates fully styled PDFs with clean margins, fonts, and a classic book look!
  const handlePrintPdf = (resource: GeneratedPedagogy) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow pop-ups to generate PDF printing layout");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${resource.title}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600&display=swap');
            body {
              font-family: 'Inter', sans-serif;
              line-height: 1.6;
              color: #211a14;
              margin: 50px;
              max-width: 820px;
              font-size: 13.5px;
              background-color: #fdfdfa;
            }
            .header {
              border-bottom: 2px solid #7a2c22;
              padding-bottom: 15px;
              margin-bottom: 30px;
            }
            .meta-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
              font-size: 11px;
              text-transform: uppercase;
              font-weight: 600;
              color: #5c544d;
              letter-spacing: 0.5px;
              background-color: #faf8f3;
              padding: 12px 16px;
              border-radius: 4px;
              border: 1px solid #e5dfd5;
              margin-top: 15px;
            }
            h1 {
              font-family: 'Cormorant Garamond', serif;
              font-size: 28px;
              color: #7a2c22;
              margin: 0;
              line-height: 1.25;
              font-weight: 700;
            }
            h2, h3, h4 {
              font-family: 'Cormorant Garamond', serif;
              color: #7a2c22;
              margin-top: 25px;
              font-weight: 700;
            }
            h2 {
              font-size: 21px;
              border-bottom: 1px dashed #d5cebf;
              padding-bottom: 4px;
            }
            h3 {
              font-size: 16px;
            }
            p {
              margin-top: 8px;
              margin-bottom: 12px;
              text-align: justify;
            }
            ul, ol {
              padding-left: 20px;
              margin-bottom: 15px;
            }
            li {
              margin-bottom: 5px;
            }
            .content {
              font-family: 'Cormorant Garamond', serif;
              font-size: 16px;
              line-height: 1.6;
              color: #2c231e;
            }
            .footer {
              margin-top: 60px;
              padding-top: 15px;
              border-top: 1px solid #e5dfd5;
              font-size: 10px;
              color: #8c8273;
              text-align: center;
              font-family: 'Inter', sans-serif;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            @media print {
              body { margin: 30px; background-color: #fff; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${resource.title}</h1>
            <div class="meta-grid">
              <div>📍 Sítio / Civilização: ${resource.pointName}</div>
              <div>📚 Formato: ${t[resource.format]}</div>
              <div>📅 Criado em: ${resource.createdAt}</div>
              <div>🌍 Tradução: ${resource.language.toUpperCase()}</div>
            </div>
          </div>
          
          <div class="content" style="white-space: pre-wrap;">${resource.content}</div>
          
          <div class="footer">
            África Antiga: Portal Pedagógico • Base de Dados Polaris2026 Alinhada ao Seshat
          </div>
          
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div id="export-panel-container" className="bg-[#fcfbf7] rounded-lg border border-[#e5dfd5] p-6 shadow-sm text-slate-800 font-sans">
      <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-[#7a2c22] mb-4 flex items-center gap-2">
        <FolderOpen className="h-4 w-4 text-[#ba9a6f]" />
        {t.savedMaterialsRepo} ({savedResources.length})
      </h3>

      {savedResources.length === 0 ? (
        <div className="p-5 bg-[#faf8f4] rounded border border-[#e5dfd5]/60 text-xs text-[#8c8273] text-center font-serif italic flex flex-col items-center gap-1">
          <AlertCircle className="h-5 w-5 text-[#ba9a6f] mb-1" />
          <span>{t.noSavedMaterials}</span>
          <span>{t.saveToStore}</span>
        </div>
      ) : (
        <div className="space-y-4">
          {/* List of saved resources */}
          <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#ebdcc5]">
            {savedResources.map((res) => {
              const isActive = activeResource?.id === res.id;
              return (
                <div
                  key={res.id}
                  id={`saved-card-${res.id}`}
                  className={`p-3 rounded border flex items-center justify-between gap-3 text-left transition-all ${
                    isActive
                      ? 'bg-[#faf6ee] border-[#7a2c22]'
                      : 'bg-[#fafaf6] border-[#e5dfd5]/65 hover:bg-[#faf6f0]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onSelectResource(res)}
                    className="flex-1 min-w-0 text-left cursor-pointer"
                  >
                    <div className="text-xs font-serif font-bold text-[#211a15] truncate pr-2">
                      {res.title}
                    </div>
                    <div className="text-[10px] text-[#5c544d] font-mono mt-0.5 flex gap-2">
                      <span>{t[res.format]}</span>
                      <span>•</span>
                      <span>{res.createdAt}</span>
                    </div>
                  </button>

                  <button
                    id={`btn-del-${res.id}`}
                    onClick={() => onDeleteResource(res.id)}
                    className="p-1 px-1.5 rounded bg-white hover:bg-red-50 text-[#8c8273] hover:text-[#7a2c22] border border-[#d5cebf] hover:border-[#7a2c22] transition-all cursor-pointer"
                    title={t.deleteSaved}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Download and printable action center */}
          {activeResource && (
            <div className="bg-[#faf9f4] p-4 rounded border border-[#e5dfd5] flex flex-col gap-3">
              <div className="flex items-center gap-1.5 text-xs text-[#211a15] font-bold border-b border-[#e5dfd5]/85 pb-2">
                <FileText className="h-4 w-4 text-[#7a2c22]" />
                <span>{t.exportOptions}</span>
                <span className="text-[10px] text-[#7a2c22] font-semibold truncate max-w-[130px]">
                  ({activeResource.pointName})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {/* Download Direct PDF */}
                <button
                  id="export-pdf-action"
                  onClick={() => handleDownloadPDFLocal(activeResource)}
                  className="py-2.5 px-3 bg-[#7a2c22] hover:bg-[#8e3328] text-white font-serif font-bold text-xs rounded transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                  title={t.downloadPdfTitle}
                >
                  <Download className="h-3.5 w-3.5 text-white" />
                  <span>{t.downloadPdf}</span>
                </button>

                {/* Editable MD */}
                <button
                  id="export-md-action"
                  onClick={() => handleDownloadMarkdown(activeResource)}
                  className="py-2.5 px-3 bg-white hover:bg-[#fafaf6] text-[#2c231e] font-serif font-bold text-xs border border-[#d5cebf] rounded transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Download className="h-3.5 w-3.5 text-[#5c544d]" />
                  <span>Editable (MD)</span>
                </button>

                {/* Plain TXT */}
                <button
                  id="export-txt-action"
                  onClick={() => handleDownloadTxt(activeResource)}
                  className="py-2.5 px-3 bg-white hover:bg-[#fafaf6] text-[#5c544d] hover:text-[#211a15] text-xs border border-[#d5cebf] rounded transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Download className="h-3.5 w-3.5 text-[#8c8273]" />
                  <span>Plain TXT</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
