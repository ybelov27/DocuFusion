import React, { useState } from 'react';
import { PdfDocument, HighlightAnnotation, HighlightColor } from '../types/pdf';
import {
  ArrowLeft, ZoomIn, ZoomOut, RotateCw, Share2, Shield, Download,
  ChevronLeft, ChevronRight, MessageSquare, Trash2, Bookmark, Printer, Maximize2, Star
} from 'lucide-react';

interface PdfViewerProps {
  document: PdfDocument;
  onBackToDrive: () => void;
  onOpenShareModal: () => void;
  onAddHighlight: (highlight: HighlightAnnotation) => void;
  onDeleteHighlight: (highlightId: string) => void;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({
  document,
  onBackToDrive,
  onOpenShareModal,
  onAddHighlight,
  onDeleteHighlight
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [sidebarTab, setSidebarTab] = useState<'thumbnails' | 'annotations' | 'comments'>('thumbnails');

  // Highlighting creation state
  const [selectedText, setSelectedText] = useState<string>('');
  const [activeColor, setActiveColor] = useState<HighlightColor>('yellow');
  const [annotationNote, setAnnotationNote] = useState<string>('');
  const [showHighlightPopover, setShowHighlightPopover] = useState<boolean>(false);

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(200, prev + 15));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(50, prev - 15));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  // Handle text selection inside PDF canvas
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      const text = selection.toString().trim();
      setSelectedText(text);
      setShowHighlightPopover(true);
    }
  };

  // Create highlight
  const handleSaveHighlight = () => {
    if (!selectedText) return;

    const newHighlight: HighlightAnnotation = {
      id: `h-${Date.now()}`,
      pageNumber: currentPage,
      selectedText,
      color: activeColor,
      comment: annotationNote.trim() || undefined,
      author: 'Current User',
      createdAt: 'Just now'
    };

    onAddHighlight(newHighlight);
    setSelectedText('');
    setAnnotationNote('');
    setShowHighlightPopover(false);
  };

  const highlightColorClasses: Record<HighlightColor, { bg: string; border: string; text: string }> = {
    yellow: { bg: 'bg-amber-100/90 hover:bg-amber-200', border: 'border-amber-300', text: 'text-amber-900' },
    green: { bg: 'bg-emerald-100/90 hover:bg-emerald-200', border: 'border-emerald-300', text: 'text-emerald-900' },
    blue: { bg: 'bg-sky-100/90 hover:bg-sky-200', border: 'border-sky-300', text: 'text-sky-900' },
    purple: { bg: 'bg-purple-100/90 hover:bg-purple-200', border: 'border-purple-300', text: 'text-purple-900' },
  };

  return (
    <div className="flex flex-col h-[calc(100vh-61px)] bg-slate-200/90 overflow-hidden">

      {/* Google Drive Style PDF Viewer Toolbar Header */}
      <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between gap-4 shrink-0 shadow-md z-20 select-none">

        {/* Left Actions: Back to Drive & File Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBackToDrive}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Back to Drive"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-6 h-6 rounded bg-rose-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
              PDF
            </div>
            <h2 className="font-medium text-sm text-slate-100 truncate max-w-xs sm:max-w-md">
              {document.title}
            </h2>
            {document.starred && <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />}
          </div>
        </div>

        {/* Center Google Toolbar Controls: Page navigation, Zoom, Rotate, Fit */}
        <div className="flex items-center gap-2 text-xs font-medium bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700/60 text-slate-300">

          {/* Page Navigation */}
          <div className="flex items-center gap-1.5 px-1">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1 rounded hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>
              {currentPage} / {document.pageCount}
            </span>
            <button
              disabled={currentPage >= document.pageCount}
              onClick={() => setCurrentPage((p) => Math.min(document.pageCount, p + 1))}
              className="p-1 rounded hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="h-4 w-px bg-slate-700"></div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleZoomOut}
              className="p-1 rounded hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-semibold text-xs">{zoomLevel}%</span>
            <button
              onClick={handleZoomIn}
              className="p-1 rounded hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <div className="h-4 w-px bg-slate-700"></div>

          {/* Rotate */}
          <button
            onClick={handleRotate}
            className="p-1 rounded hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
            title="Rotate Page"
          >
            <RotateCw className="w-4 h-4" />
          </button>

        </div>

        {/* Right Action Icons: Print, Download, Share, Comments */}
        <div className="flex items-center gap-1.5 sm:gap-2">

          <button
            onClick={() => window.print()}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Print PDF"
          >
            <Printer className="w-4 h-4" />
          </button>

          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(document.title)}`}
            download={document.filename}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenShareModal}
            className="px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

        </div>

      </div>

      {/* Main Workspace Body */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* Left Thumbnail / Annotations Sidebar */}
        <div className="w-60 bg-white border-r border-slate-300 flex flex-col shrink-0 hidden md:flex">

          {/* Tabs */}
          <div className="flex items-center border-b border-slate-200 p-2 bg-slate-50 gap-1 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setSidebarTab('thumbnails')}
              className={`flex-1 py-1 rounded transition-all cursor-pointer ${
                sidebarTab === 'thumbnails' ? 'bg-white text-blue-700 font-bold shadow-2xs' : 'hover:bg-slate-200/60'
              }`}
            >
              Pages ({document.pageCount})
            </button>
            <button
              onClick={() => setSidebarTab('annotations')}
              className={`flex-1 py-1 rounded transition-all cursor-pointer ${
                sidebarTab === 'annotations' ? 'bg-white text-blue-700 font-bold shadow-2xs' : 'hover:bg-slate-200/60'
              }`}
            >
              Highlights ({document.highlights.length})
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {sidebarTab === 'thumbnails' ? (

              document.pages.map((p) => {
                const isSelected = p.pageNumber === currentPage;
                return (
                  <div
                    key={p.pageNumber}
                    onClick={() => setCurrentPage(p.pageNumber)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer space-y-1 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-xs ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">Page {p.pageNumber}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate">{p.heading}</p>
                    <div className="w-full h-10 bg-white rounded border border-slate-200 p-1 text-[7px] text-slate-400 select-none overflow-hidden">
                      {p.paragraphs[0]?.substring(0, 80)}...
                    </div>
                  </div>
                );
              })

            ) : (

              document.highlights.length === 0 ? (
                <div className="text-center py-8 space-y-2 text-slate-400">
                  <Bookmark className="w-6 h-6 mx-auto text-slate-300" />
                  <p className="text-xs">No text highlights added yet.</p>
                  <p className="text-[10px]">Highlight any text on the PDF to save notes.</p>
                </div>
              ) : (
                document.highlights.map((h) => {
                  const style = highlightColorClasses[h.color];
                  return (
                    <div
                      key={h.id}
                      onClick={() => setCurrentPage(h.pageNumber)}
                      className={`p-2.5 rounded-xl border ${style.border} ${style.bg} transition-all space-y-1 cursor-pointer relative group`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="text-slate-800">Page {h.pageNumber}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); onDeleteHighlight(h.id); }}
                          className="opacity-0 group-hover:opacity-100 text-rose-600 hover:text-rose-800 p-0.5"
                          title="Delete highlight"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className={`text-xs font-medium italic ${style.text}`}>
                        "{h.selectedText}"
                      </p>
                    </div>
                  );
                })
              )

            )}
          </div>

        </div>

        {/* Center Canvas: Document Pane */}
        <div
          className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center justify-start bg-slate-300/60"
          onMouseUp={handleTextSelection}
        >

          {/* Highlight popover creator */}
          {showHighlightPopover && (
            <div className="fixed top-20 z-50 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 max-w-sm w-full space-y-3 animate-in fade-in zoom-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-800">Highlight Selected Text</span>
                <button onClick={() => setShowHighlightPopover(false)} className="text-slate-400 text-xs">✕</button>
              </div>

              <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg italic border border-slate-100 line-clamp-2">
                "{selectedText}"
              </p>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-600">Color:</span>
                {(['yellow', 'green', 'blue', 'purple'] as HighlightColor[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveColor(c)}
                    className={`w-5 h-5 rounded-full border-2 transition-all cursor-pointer ${
                      c === 'yellow' ? 'bg-amber-300' : c === 'green' ? 'bg-emerald-300' : c === 'blue' ? 'bg-sky-300' : 'bg-purple-300'
                    } ${activeColor === c ? 'scale-110 border-slate-800' : 'border-transparent'}`}
                  />
                ))}
              </div>

              <input
                type="text"
                placeholder="Add comment or note..."
                value={annotationNote}
                onChange={(e) => setAnnotationNote(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={() => setShowHighlightPopover(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveHighlight}
                  className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-2xs"
                >
                  Save Highlight
                </button>
              </div>
            </div>
          )}

          {/* Rendered PDF Page Surface */}
          {document.pages.map((page) => {
            if (page.pageNumber !== currentPage) return null;

            return (
              <div
                key={page.pageNumber}
                style={{
                  transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.15s ease-out'
                }}
                className="bg-white rounded-lg border border-slate-300 shadow-xl p-8 md:p-12 max-w-3xl w-full min-h-[900px] my-4 select-text font-sans relative"
              >

                <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6 text-xs text-slate-400">
                  <span className="font-bold text-slate-700">{document.title}</span>
                  <span>Page {page.pageNumber} of {document.pageCount}</span>
                </div>

                <div className="space-y-6 text-slate-800">
                  <h1 className="text-2xl font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                    {page.heading}
                  </h1>

                  {page.paragraphs.map((para, idx) => {
                    const matchedHighlight = document.highlights.find(
                      (h) => h.pageNumber === page.pageNumber && para.includes(h.selectedText)
                    );

                    return (
                      <p
                        key={idx}
                        className={`text-sm sm:text-base leading-relaxed text-slate-700 transition-colors ${
                          matchedHighlight ? 'bg-amber-100/80 p-2 rounded-lg border-l-4 border-amber-400' : ''
                        }`}
                      >
                        {para}
                      </p>
                    );
                  })}

                  {page.tablesOrMetrics && (
                    <div className="mt-8 space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                      <h3 className="font-bold text-sm text-slate-900">
                        📊 {page.tablesOrMetrics.title}
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-200/70 text-slate-700 font-bold border-b border-slate-300">
                            <tr>
                              {page.tablesOrMetrics.headers.map((h, i) => (
                                <th key={i} className="py-2 px-3">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                            {page.tablesOrMetrics.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-white/80 transition-colors">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="py-2.5 px-3">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-6 left-8 right-8 border-t border-slate-200 pt-3 flex items-center justify-between text-[11px] text-slate-400">
                  <span>DocuFusion Reader</span>
                  <span>Page {page.pageNumber}</span>
                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
};
