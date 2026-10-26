import React, { useState, useMemo } from 'react';
import { PdfDocument, PdfCategory } from '../types/pdf';
import {
  Plus, Grid, List, Star, Share2, Trash2, FileText, HardDrive,
  Clock, Shield, Upload, Eye, Folder, Users, Trash, Info
} from 'lucide-react';

interface DriveViewProps {
  documents: PdfDocument[];
  searchQuery?: string;
  onSelectDocument: (doc: PdfDocument) => void;
  onOpenShareModal: (doc: PdfDocument) => void;
  onToggleStar: (docId: string) => void;
  onDeleteDocument: (docId: string) => void;
  onAddDocument: (newDoc: PdfDocument) => void;
}

export const DriveView: React.FC<DriveViewProps> = ({
  documents,
  searchQuery = '',
  onSelectDocument,
  onOpenShareModal,
  onToggleStar,
  onDeleteDocument,
  onAddDocument,
}) => {
  const [activeSidebarNav, setActiveSidebarNav] = useState<'my-drive' | 'shared' | 'recent' | 'starred' | 'trash'>('my-drive');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Upload Form states
  const [uploadTitle, setUploadTitle] = useState<string>('');
  const [uploadCategory, setUploadCategory] = useState<PdfCategory>('Financial');
  const [uploadContent, setUploadContent] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const categories: string[] = ['All', 'Financial', 'Research', 'Legal', 'Marketing', 'Technical'];

  // Filtered documents calculation
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      // Sidebar Navigation filter
      if (activeSidebarNav === 'starred' && !doc.starred) return false;
      if (activeSidebarNav === 'shared' && doc.accessLevel === 'Restricted') return false;

      // Category filter
      if (selectedCategory !== 'All' && doc.category !== selectedCategory) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = doc.title.toLowerCase().includes(q);
        const matchesAuthor = doc.author.toLowerCase().includes(q);
        const matchesTags = doc.tags.some((t) => t.toLowerCase().includes(q));
        return matchesTitle || matchesAuthor || matchesTags;
      }

      return true;
    });
  }, [documents, activeSidebarNav, selectedCategory, searchQuery]);

  // Calculate storage stats
  const totalStorageBytes = useMemo(() => {
    return documents.reduce((acc, doc) => acc + doc.fileSizeBytes, 0);
  }, [documents]);

  const totalStorageMB = (totalStorageBytes / (1024 * 1024)).toFixed(1);

  // Handle uploading new file
  const handleSimulatedUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      const newDoc: PdfDocument = {
        id: `pdf-${Date.now()}`,
        title: uploadTitle.trim(),
        filename: `${uploadTitle.toLowerCase().replace(/\s+/g, '_')}.pdf`,
        fileSize: '3.5 MB',
        fileSizeBytes: 3670016,
        category: uploadCategory,
        pageCount: 2,
        author: 'Current User',
        uploadDate: 'Just now',
        lastModified: 'Just now',
        starred: false,
        isEncrypted: true,
        accessLevel: 'Restricted',
        sharedWith: [],
        tags: [uploadCategory, 'User Upload'],
        pages: [
          {
            pageNumber: 1,
            heading: '1. Document Main Overview',
            paragraphs: [
              uploadContent || 'This document was successfully uploaded to DocuFusion PDF Drive.',
              'Security protocols: AES-256 client-side encryption applied. Access restricted to authorized members.'
            ]
          },
          {
            pageNumber: 2,
            heading: '2. Additional Information',
            paragraphs: [
              'Document safely stored and indexed in DocuFusion.'
            ]
          }
        ],
        highlights: []
      };

      onAddDocument(newDoc);
      setIsProcessing(false);
      setShowUploadModal(false);
      setUploadTitle('');
      setUploadContent('');
      onSelectDocument(newDoc);
    }, 600);
  };

  return (
    <div className="flex flex-1 min-h-[calc(100vh-61px)] bg-slate-50">

      {/* Left Google Drive Sidebar Navigation */}
      <aside className="w-64 bg-slate-50 border-r border-slate-200 p-4 shrink-0 hidden md:flex flex-col justify-between select-none">
        <div className="space-y-6">

          {/* New Upload Trigger Button */}
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-slate-200/90 shadow-md hover:shadow-lg hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-all cursor-pointer w-full"
          >
            <div className="p-1 rounded-full bg-blue-600 text-white">
              <Plus className="w-5 h-5" />
            </div>
            <span>+ New</span>
          </button>

          {/* Nav Items */}
          <nav className="space-y-1 text-xs font-semibold text-slate-700">
            <button
              onClick={() => setActiveSidebarNav('my-drive')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-full transition-all cursor-pointer ${
                activeSidebarNav === 'my-drive' ? 'bg-blue-100/80 text-blue-800 font-bold' : 'hover:bg-slate-200/60'
              }`}
            >
              <Folder className="w-4 h-4 text-slate-600" />
              <span>My Drive</span>
            </button>

            <button
              onClick={() => setActiveSidebarNav('shared')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-full transition-all cursor-pointer ${
                activeSidebarNav === 'shared' ? 'bg-blue-100/80 text-blue-800 font-bold' : 'hover:bg-slate-200/60'
              }`}
            >
              <Users className="w-4 h-4 text-slate-600" />
              <span>Shared with me</span>
            </button>

            <button
              onClick={() => setActiveSidebarNav('recent')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-full transition-all cursor-pointer ${
                activeSidebarNav === 'recent' ? 'bg-blue-100/80 text-blue-800 font-bold' : 'hover:bg-slate-200/60'
              }`}
            >
              <Clock className="w-4 h-4 text-slate-600" />
              <span>Recent</span>
            </button>

            <button
              onClick={() => setActiveSidebarNav('starred')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-full transition-all cursor-pointer ${
                activeSidebarNav === 'starred' ? 'bg-blue-100/80 text-blue-800 font-bold' : 'hover:bg-slate-200/60'
              }`}
            >
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>Starred</span>
            </button>

            <button
              onClick={() => setActiveSidebarNav('trash')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-full transition-all cursor-pointer ${
                activeSidebarNav === 'trash' ? 'bg-blue-100/80 text-blue-800 font-bold' : 'hover:bg-slate-200/60'
              }`}
            >
              <Trash className="w-4 h-4 text-slate-600" />
              <span>Trash</span>
            </button>
          </nav>

        </div>

        {/* Bottom Storage Meter */}
        <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <HardDrive className="w-4 h-4 text-slate-500" />
            <span>Storage</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${Math.max(4, (parseFloat(totalStorageMB) / 15000) * 100 * 100)}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-500">{totalStorageMB} MB of 15 GB used</p>
        </div>

      </aside>

      {/* Main Drive Workspace Pane */}
      <main className="flex-1 p-6 space-y-5 overflow-y-auto">

        {/* Drive Control Header: Category Pills & Grid/List Toggles */}
        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-slate-200 shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              title="List View"
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Documents Content Grid / List */}
        {filteredDocuments.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-800">No PDF files found</h3>
            <p className="text-xs text-slate-500">Try adjusting your category or search query.</p>
          </div>
        ) : viewMode === 'grid' ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                onClick={() => onSelectDocument(doc)}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all p-4 flex flex-col justify-between cursor-pointer relative"
              >

                <div className="space-y-3">
                  {/* File Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-rose-50 text-rose-600 font-bold text-xs shrink-0 border border-rose-100">
                        PDF
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100">
                        {doc.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onToggleStar(doc.id)}
                        className="p-1 rounded text-slate-400 hover:text-amber-500"
                      >
                        <Star className={`w-4 h-4 ${doc.starred ? 'fill-amber-400 text-amber-500' : ''}`} />
                      </button>
                      <button
                        onClick={() => onOpenShareModal(doc)}
                        className="p-1 rounded text-slate-400 hover:text-blue-600"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Document Title */}
                  <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {doc.title}
                  </h3>
                </div>

                {/* Footer Metadata */}
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" /> {doc.lastModified}
                  </span>
                  <span>{doc.fileSize}</span>
                </div>

              </div>
            ))}
          </div>

        ) : (

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Last Modified</th>
                  <th className="py-3 px-4">File Size</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {filteredDocuments.map((doc) => (
                  <tr
                    key={doc.id}
                    onClick={() => onSelectDocument(doc)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded bg-rose-50 text-rose-600 text-[10px] font-bold">PDF</div>
                        <span>{doc.title}</span>
                        {doc.starred && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 shrink-0" />}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px]">
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{doc.lastModified}</td>
                    <td className="py-3 px-4 text-slate-500">{doc.fileSize}</td>
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onOpenShareModal(doc)}
                          className="p-1.5 rounded text-slate-400 hover:text-blue-600 hover:bg-slate-100"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteDocument(doc.id)}
                          className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-slate-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        )}

      </main>

      {/* Upload Modal Overlay */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Upload PDF File</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSimulatedUpload} className="space-y-4 text-xs font-medium">

              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                  isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50'
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    const name = e.dataTransfer.files[0].name.replace(/\.[^/.]+$/, "");
                    setUploadTitle(name);
                  }
                }}
              >
                <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="font-semibold text-slate-800 text-xs">Drag & Drop your PDF file here</p>
                <p className="text-slate-400 text-[10px] mt-0.5">Supports PDF up to 50MB</p>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-semibold">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Annual Financial Report 2026"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-semibold">Category</label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as PdfCategory)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="Financial">Financial</option>
                  <option value="Research">Research</option>
                  <option value="Legal">Legal</option>
                  <option value="Technical">Technical</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
                >
                  {isProcessing ? 'Uploading...' : 'Upload'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
