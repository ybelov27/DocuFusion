import React, { useState } from 'react';
import { INITIAL_PDFS } from './data/mockPdfs';
import { PdfDocument, HighlightAnnotation, ChatMessage } from './types/pdf';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { DriveView } from './components/DriveView';
import { PdfViewer } from './components/PdfViewer';
import { AiAnalysisPanel } from './components/AiAnalysisPanel';
import { ShareModal } from './components/ShareModal';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'drive' | 'viewer'>('landing');
  const [documents, setDocuments] = useState<PdfDocument[]>(INITIAL_PDFS);
  const [selectedDocId, setSelectedDocId] = useState<string>(INITIAL_PDFS[0].id);

  // Modals & Panels state
  const [shareModalDoc, setShareModalDoc] = useState<PdfDocument | null>(null);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState<boolean>(true);

  // Active document getter
  const selectedDoc = documents.find((d) => d.id === selectedDocId) || documents[0];

  // Handlers
  const handleSelectDocument = (doc: PdfDocument) => {
    setSelectedDocId(doc.id);
    setCurrentView('viewer');
  };

  const handleToggleStar = (docId: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, starred: !d.starred } : d))
    );
  };

  const handleDeleteDocument = (docId: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
    if (selectedDocId === docId && documents.length > 1) {
      const remaining = documents.filter((d) => d.id !== docId);
      setSelectedDocId(remaining[0].id);
    }
  };

  const handleAddDocument = (newDoc: PdfDocument) => {
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const handleUpdateDocument = (updatedDoc: PdfDocument) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === updatedDoc.id ? updatedDoc : d))
    );
  };

  const handleAddHighlight = (highlight: HighlightAnnotation) => {
    const updated = {
      ...selectedDoc,
      highlights: [highlight, ...selectedDoc.highlights]
    };
    handleUpdateDocument(updated);
  };

  const handleDeleteHighlight = (highlightId: string) => {
    const updated = {
      ...selectedDoc,
      highlights: selectedDoc.highlights.filter((h) => h.id !== highlightId)
    };
    handleUpdateDocument(updated);
  };

  const handleSendMessage = (userMessageText: string) => {
    const userMsg: ChatMessage = {
      id: `c-${Date.now()}`,
      sender: 'user',
      message: userMessageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Generate smart context-aware response based on active PDF
    let aiReplyText = `Based on page 1 & 2 of "${selectedDoc.title}":\n\n`;
    const textLower = userMessageText.toLowerCase();

    if (textLower.includes('revenue') || textLower.includes('financial') || textLower.includes('arr') || textLower.includes('growth')) {
      aiReplyText += `• Consolidated revenue expanded to $142.8 Million in Q4 (+28.4% YoY).\n• Annual Recurring Revenue (ARR) reached $518.5M.\n• Gross Profit Margin improved to 74.2% (+320 bps).`;
    } else if (textLower.includes('security') || textLower.includes('encrypted') || textLower.includes('privacy')) {
      aiReplyText += `• Client-side Zero Knowledge encryption (AES-256) is enabled on this file.\n• PII is scrubbed before processing and SOC 2 / ISO 27001 standards are fully guaranteed.`;
    } else if (textLower.includes('guidance') || textLower.includes('target') || textLower.includes('future')) {
      aiReplyText += `• Strategic projections for FY2026 estimate revenue between $610M and $635M with operating cash flows of $145M - $155M.`;
    } else {
      aiReplyText += `Gemini AI analyzed the text content across ${selectedDoc.pageCount} pages in "${selectedDoc.title}". The key focus is: ${selectedDoc.aiAnalysis.executiveSummary}`;
    }

    const aiMsg: ChatMessage = {
      id: `c-ai-${Date.now()}`,
      sender: 'ai',
      message: aiReplyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      referencedPages: [1, 2]
    };

    const updatedDoc = {
      ...selectedDoc,
      chatHistory: [...selectedDoc.chatHistory, userMsg, aiMsg]
    };

    handleUpdateDocument(updatedDoc);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
      />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        {currentView === 'landing' && (
          <LandingPage
            onOpenDrive={() => setCurrentView('drive')}
            onOpenSamplePdf={(pdfId) => {
              setSelectedDocId(pdfId);
              setCurrentView('viewer');
            }}
          />
        )}

        {currentView === 'drive' && (
          <DriveView
            documents={documents}
            onSelectDocument={handleSelectDocument}
            onOpenShareModal={(doc) => setShareModalDoc(doc)}
            onToggleStar={handleToggleStar}
            onDeleteDocument={handleDeleteDocument}
            onAddDocument={handleAddDocument}
          />
        )}

        {currentView === 'viewer' && selectedDoc && (
          <div className="flex-1 flex overflow-hidden">

            {/* Center PDF Reader */}
            <div className="flex-1 flex flex-col min-w-0">
              <PdfViewer
                document={selectedDoc}
                onBackToDrive={() => setCurrentView('drive')}
                onOpenShareModal={() => setShareModalDoc(selectedDoc)}
                onAddHighlight={handleAddHighlight}
                onDeleteHighlight={handleDeleteHighlight}
                onToggleAiPanel={() => setIsAiPanelOpen(!isAiPanelOpen)}
                isAiPanelOpen={isAiPanelOpen}
              />
            </div>

            {/* Right Split-Screen Gemini AI Assistant */}
            {isAiPanelOpen && (
              <AiAnalysisPanel
                document={selectedDoc}
                onSendMessage={handleSendMessage}
                onClose={() => setIsAiPanelOpen(false)}
              />
            )}

          </div>
        )}
      </main>

      {/* Share Modal Overlay */}
      {shareModalDoc && (
        <ShareModal
          document={shareModalDoc}
          onClose={() => setShareModalDoc(null)}
          onUpdateDocument={(updated) => {
            handleUpdateDocument(updated);
            setShareModalDoc(updated);
          }}
        />
      )}

    </div>
  );
}
