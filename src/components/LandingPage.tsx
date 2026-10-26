import React, { useState } from 'react';
import {
  ShieldCheck, Share2, FileText, Lock, CheckCircle2,
  Search, ArrowRight, HardDrive, Download, Users, Zap, Eye,
  BarChart3, Layers, Check, FolderKanban
} from 'lucide-react';

interface LandingPageProps {
  onOpenDrive: () => void;
  onOpenSamplePdf: (pdfId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenDrive, onOpenSamplePdf }) => {
  const [activeTab, setActiveTab] = useState<string>('Overview');

  const navigationTabs = [
    'Overview',
    'Store',
    'Manage',
    'Collaborate',
    'Security',
    'Download',
    'Customers',
    'FAQs'
  ];

  return (
    <div className="min-h-[calc(100vh-61px)] bg-white flex flex-col justify-between overflow-x-hidden">

      {/* Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Headline & Content */}
          <div className="lg:col-span-6 space-y-6 text-left">

            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
              <span>DocuFusion Cloud PDF Workspace</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Easy and secure access to all your content
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-xl">
              Store, share, and collaborate on your PDF documents and files from any device, securely in the cloud.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenDrive}
                className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/25 transition-all flex items-center gap-2.5 group cursor-pointer"
              >
                <span>Go to Drive</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onOpenSamplePdf('pdf-1')}
                className="px-6 py-3.5 rounded-full border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <Eye className="w-4 h-4 text-blue-600" />
                <span>Open Sample PDF</span>
              </button>
            </div>

            {/* Feature Bullet Pills */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Instant PDF Viewer</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Client Encryption</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Seamless Sharing</span>
              </div>
            </div>

          </div>

          {/* Right Column: Google Drive Workspace Visual Graphic */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">

              {/* Background Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 via-sky-100 to-indigo-100 rounded-3xl blur-2xl opacity-60 -z-10"></div>

              {/* Main Drive Workspace Window Graphic */}
              <div className="bg-slate-50/90 rounded-2xl border border-slate-200/90 shadow-2xl p-4 md:p-6 backdrop-blur-sm relative overflow-hidden">

                {/* Mock Drive Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    </div>
                    <span className="font-semibold text-slate-700 ml-2">✦ DocuFusion Drive</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-400">Search in Drive...</span>
                  </div>
                </div>

                {/* Mock File Tree Rows */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-3 p-2.5 bg-blue-100/70 rounded-xl border border-blue-200/60 shadow-2xs">
                    <div className="p-1.5 bg-rose-500 text-white rounded-lg font-bold text-[10px]">PDF</div>
                    <div className="flex-1">
                      <div className="h-3 w-36 bg-blue-900/80 rounded font-medium text-[11px] text-blue-900 flex items-center px-1">Q4_2025_Financial_Performance.pdf</div>
                      <div className="h-2 w-24 bg-blue-300/60 rounded mt-1"></div>
                    </div>
                    <Lock className="w-4 h-4 text-blue-600" />
                  </div>

                  <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-200/60 opacity-80">
                    <div className="p-1.5 bg-blue-500 text-white rounded-lg font-bold text-[10px]">PDF</div>
                    <div className="flex-1">
                      <div className="h-3 w-32 bg-slate-400 rounded"></div>
                      <div className="h-2 w-20 bg-slate-200 rounded mt-1"></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-200/60 opacity-60">
                    <div className="p-1.5 bg-amber-500 text-white rounded-lg font-bold text-[10px]">DOC</div>
                    <div className="flex-1">
                      <div className="h-3 w-28 bg-slate-300 rounded"></div>
                      <div className="h-2 w-16 bg-slate-200 rounded mt-1"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Share Overlay */}
                <div className="absolute top-8 right-4 w-72 md:w-80 bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 z-20">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                    <span className="font-bold text-xs text-slate-800">Share "Financial Performance"</span>
                    <span className="text-[10px] text-slate-400">People with access</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                          alt="James Garcia"
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-slate-800 leading-none text-[11px]">James Garcia</p>
                          <p className="text-[9px] text-slate-400">j.garcia@docufusion.com</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">Owner</span>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <p className="text-[10px] text-slate-400 font-medium mb-1">General access</p>
                      <div className="flex items-center justify-between bg-slate-50 p-1.5 rounded-lg border border-slate-200/60">
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-[9px] font-bold">D</div>
                          <span className="font-medium text-slate-700 text-[11px]">DocuFusion Domain</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium bg-white px-1.5 py-0.5 rounded border border-slate-200">Viewer ▾</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-[10px] font-medium flex items-center gap-1">
                        <span>🔗 Copy link</span>
                      </button>
                      <button
                        onClick={onOpenDrive}
                        className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-[11px] font-semibold"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating Security Badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-xl border border-slate-200 shadow-xl p-3 z-30 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Client-Side Encryption</p>
                    <p className="text-[10px] text-slate-500">AES-256 Zero-Knowledge Security</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Pill Navigation Footer Bar */}
      <div className="w-full pb-8 pt-4 px-4 flex justify-center">
        <div className="bg-white rounded-full border border-slate-200/90 shadow-xl p-1.5 flex items-center gap-1 max-w-4xl overflow-x-auto no-scrollbar">
          {navigationTabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === 'Store' || tab === 'Manage') {
                    onOpenDrive();
                  }
                }}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
