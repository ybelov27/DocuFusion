import React, { useState } from 'react';
import { INITIAL_PDFS } from './data/mockPdfs';
import { PdfDocument, HighlightAnnotation } from './types/pdf';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { DriveView } from './components/DriveView';
import { PdfViewer } from './components/PdfViewer';
import { ShareModal } from './components/ShareModal';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'drive' | 'viewer'>('landing');
  const [documents, setDocuments] = useState<PdfDocument[]>(INITIAL_PDFS);
  const [selectedDocId, setSelectedDocId] = useState<string>(INITIAL_PDFS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [shareModalDoc, setShareModalDoc] = useState<PdfDocument | null>(null);

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

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">

      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
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
            searchQuery={searchQuery}
            onSelectDocument={handleSelectDocument}
            onOpenShareModal={(doc) => setShareModalDoc(doc)}
            onToggleStar={handleToggleStar}
            onDeleteDocument={handleDeleteDocument}
            onAddDocument={handleAddDocument}
          />
        )}

        {currentView === 'viewer' && selectedDoc && (
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 flex flex-col min-w-0">
              <PdfViewer
                document={selectedDoc}
                onBackToDrive={() => setCurrentView('drive')}
                onOpenShareModal={() => setShareModalDoc(selectedDoc)}
                onAddHighlight={handleAddHighlight}
                onDeleteHighlight={handleDeleteHighlight}
              />
            </div>
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
