import React, { useState, useMemo } from 'react';
import {
  PdfDocument, PdfCategory
} from '../types/pdf';
import {
  Search, Plus, Grid, List, Star, Lock, Share2, Sparkles,
  Trash2, FileText, HardDrive, Filter, Clock, Tag, ChevronRight,
  Upload, CheckCircle, AlertCircle, Eye, Shield
} from 'lucide-react';

interface DriveViewProps {
  documents: PdfDocument[];
  onSelectDocument: (doc: PdfDocument) => void;
  onOpenShareModal: (doc: PdfDocument) => void;
  onToggleStar: (docId: string) => void;
  onDeleteDocument: (docId: string) => void;
  onAddDocument: (newDoc: PdfDocument) => void;
}

export const DriveView: React.FC<DriveViewProps> = ({
  documents,
  onSelectDocument,
  onOpenShareModal,
  onToggleStar,
  onDeleteDocument,
  onAddDocument,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Form states for custom upload
  const [uploadTitle, setUploadTitle] = useState<string>('');
  const [uploadCategory, setUploadCategory] = useState<PdfCategory>('Financial');
  const [uploadContent, setUploadContent] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const categories: string[] = ['All', 'Starred', 'Financial', 'Research', 'Legal', 'Marketing'];

  // Filtered documents calculation
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      // Category filter
      if (selectedCategory === 'Starred' && !doc.starred) return false;
      if (selectedCategory !== 'All' && selectedCategory !== 'Starred' && doc.category !== selectedCategory) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = doc.title.toLowerCase().includes(q);
        const matchesAuthor = doc.author.toLowerCase().includes(q);
        const matchesTags = doc.tags.some((t) => t.toLowerCase().includes(q));
        const matchesSummary = doc.aiAnalysis.executiveSummary.toLowerCase().includes(q);
        return matchesTitle || matchesAuthor || matchesTags || matchesSummary;
      }

      return true;
    });
  }, [documents, selectedCategory, searchQuery]);

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
        tags: [uploadCategory, 'User Upload', 'AI Indexed'],
        pages: [
          {
            pageNumber: 1,
            heading: '1. Document Main Overview',
            paragraphs: [
              uploadContent || 'This document was successfully uploaded to DocuSphere. All contents have been parsed into vector embeddings for Gemini AI analysis and contextual question answering.',
              'Security protocols: AES-256 client encryption applied. Access restricted to authorized team members.'
            ]
          },
          {
            pageNumber: 2,
            heading: '2. Key Findings & Analytics',
            paragraphs: [
              'Automated AI parsing identified 3 critical key topics and verified zero data compliance violations.',
              'You can now ask questions in real-time or generate executive summaries.'
            ]
          }
        ],
        highlights: [],
        aiAnalysis: {
          executiveSummary: uploadContent
            ? `Summary of uploaded document: ${uploadContent.slice(0, 180)}...`
            : `Newly uploaded ${uploadCategory} document parsed and indexed into DocuSphere AI workspace. Full semantic search enabled.`,
          keyTakeaways: [
            'Document uploaded and encrypted successfully.',
            'Vector embeddings generated for fast semantic retrieval.',
            'Ready for multi-turn Q&A and summary generation.'
          ],
          metrics: [
            { label: 'Parsed Pages', value: '2 Pages', status: 'positive' },
            { label: 'Security Level', value: 'Encrypted', status: 'positive' }
          ],
          entities: [
            { name: uploadCategory, type: 'Organization' },
            { name: 'DocuSphere Workspace', type: 'Technology' }
          ],
          sentiment: 'Informative',
          targetAudience: 'User & Team Members',
          actionItems: ['Review generated executive summary', 'Share link with team members'],
          suggestedQuestions: [
            'What are the main key points of this document?',
            'What security protections are applied to this file?'
          ]
        },
        chatHistory: []
      };

      onAddDocument(newDoc);
      setIsProcessing(false);
      setShowUploadModal(false);
      setUploadTitle('');
      setUploadContent('');
      onSelectDocument(newDoc);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* Top Banner & Drive Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-2 z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>AI-Powered Storage & Analysis Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            My Secure PDF Workspace
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Store, view, annotate and instantly extract insights from your PDF documents with integrated Gemini AI.
          </p>
        </div>

        {/* Upload Button & Storage Meter */}
        <div className="z-10 flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 px-4 text-xs font-medium space-y-1.5 min-w-[200px]">
            <div className="flex justify-between text-slate-200">
              <span className="flex items-center gap-1.5"><HardDrive className="w-3.5 h-3.5 text-sky-400" /> Storage Used</span>
              <span className="font-bold">{totalStorageMB} MB / 15 GB</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-blue-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(4, (parseFloat(totalStorageMB) / 15000) * 100 * 100)}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-5 h-5" />
            <span>Upload New PDF</span>
          </button>
        </div>

      </div>

      {/* Control Bar: Search, Category Tabs, Grid/List Switch */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">

        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents by title, author, tag or AI summary..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
              }`}
            >
              {cat === 'Starred' && <Star className="w-3 h-3 text-amber-500 inline mr-1 fill-amber-500" />}
              {cat}
            </button>
          ))}
        </div>

        {/* View Layout Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            title="Grid View"
            className={`p-1.5 rounded-lg transition-all ${
              viewMode === 'grid' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            title="List View"
            className={`p-1.5 rounded-lg transition-all ${
              viewMode === 'list' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Files Display Area */}
      {filteredDocuments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 mx-auto">
            <FileText className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800">No PDF documents found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              No files match your filter "{selectedCategory}" or search query "{searchQuery}".
            </p>
          </div>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (

        /* Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-200 flex flex-col justify-between overflow-hidden relative"
            >

              {/* Card Header & Preview Banner */}
              <div className="p-5 pb-3 border-b border-slate-100 bg-gradient-to-b from-slate-50/80 to-white">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0 font-extrabold text-xs shadow-2xs">
                      PDF
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {doc.category}
                      </span>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {doc.lastModified}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); onToggleStar(doc.id); }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-100 transition-all cursor-pointer"
                      title={doc.starred ? "Unstar" : "Star"}
                    >
                      <Star className={`w-4 h-4 ${doc.starred ? 'fill-amber-400 text-amber-500' : ''}`} />
                    </button>

                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenShareModal(doc); }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer"
                      title="Share document"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3
                  onClick={() => onSelectDocument(doc)}
                  className="font-bold text-slate-900 text-base leading-snug hover:text-blue-600 transition-colors cursor-pointer line-clamp-2"
                >
                  {doc.title}
                </h3>
              </div>

              {/* Card Body: Executive AI Summary snippet */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Gemini AI Insights</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100/60">
                    {doc.aiAnalysis.executiveSummary}
                  </p>
                </div>

                {/* Tags & Security Badges */}
                <div className="pt-2 flex flex-wrap items-center gap-1.5">
                  {doc.isEncrypted && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200/80 text-[10px] font-semibold text-emerald-700">
                      <Shield className="w-3 h-3 text-emerald-600" /> Encrypted
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-medium text-slate-600">
                    {doc.pageCount} Pages
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-medium text-slate-600">
                    {doc.fileSize}
                  </span>
                </div>

              </div>

              {/* Card Footer Action Bar */}
              <div className="p-4 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectDocument(doc)}
                  className="flex-1 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View & Analyze PDF</span>
                </button>

                <button
                  onClick={() => onDeleteDocument(doc.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                  title="Delete PDF"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      ) : (

        /* List Layout */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Document Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Pages / Size</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Security</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {filteredDocuments.map((doc) => (
                  <tr
                    key={doc.id}
                    onClick={() => onSelectDocument(doc)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-900 group-hover:text-blue-600">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 font-extrabold text-[10px] shrink-0">
                          PDF
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span>{doc.title}</span>
                            {doc.starred && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 inline shrink-0" />}
                          </div>
                          <p className="text-[11px] text-slate-400 font-normal line-clamp-1">
                            {doc.aiAnalysis.executiveSummary}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-[11px]">
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {doc.pageCount} Pages • {doc.fileSize}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {doc.author}
                    </td>
                    <td className="py-3.5 px-4">
                      {doc.isEncrypted ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                          <Shield className="w-3 h-3" /> Encrypted
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Standard</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onOpenShareModal(doc)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                          title="Share"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onSelectDocument(doc)}
                          className="px-3 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-semibold hover:bg-blue-700"
                        >
                          Open
                        </button>
                        <button
                          onClick={() => onDeleteDocument(doc.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                          title="Delete"
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
        </div>

      )}

      {/* Upload Modal Overlay */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in duration-150">

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Upload PDF & Extract Insights</h3>
                  <p className="text-xs text-slate-500">DocuSphere will automatically generate AI analysis.</p>
                </div>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSimulatedUpload} className="space-y-4 text-xs font-medium">

              {/* Drag-and-Drop Dropzone Box */}
              <div
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                  isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100/80'
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
                <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2 animate-bounce" />
                <p className="font-bold text-slate-800 text-sm">Drag & Drop your PDF file here</p>
                <p className="text-slate-400 text-[11px] mt-1">Supports PDF up to 50MB • Client-side encryption enabled</p>
              </div>

              {/* Title Field */}
              <div className="space-y-1">
                <label className="text-slate-700 font-semibold">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Annual Strategy Roadmap 2026"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* Category Selection */}
              <div className="space-y-1">
                <label className="text-slate-700 font-semibold">Category Classification</label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as PdfCategory)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="Financial">Financial</option>
                  <option value="Research">Research</option>
                  <option value="Legal">Legal</option>
                  <option value="Technical">Technical</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              {/* Content text sample */}
              <div className="space-y-1">
                <label className="text-slate-700 font-semibold">Sample Content or Notes (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Paste raw text or notes from the document to seed AI insights..."
                  value={uploadContent}
                  onChange={(e) => setUploadContent(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Indexing & Analyzing...</span>
                    </>
                  ) : (
                    <span>Confirm & Upload</span>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
