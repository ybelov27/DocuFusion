import React from 'react';
import { HardDrive, Sparkles, Shield, Search, ArrowRight, FolderKanban } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'drive' | 'viewer';
  onNavigate: (view: 'landing' | 'drive') => void;
  onOpenUpload?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Brand Logo & Name */}
        <div
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <HardDrive className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full flex items-center justify-center text-[9px] font-extrabold text-slate-900 border-2 border-white">
              ✦
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xl tracking-tight text-slate-900 font-sans">
                DocuSphere
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                PDF Drive
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              AI-Powered Cloud PDF Workspace
            </p>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/60 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('landing')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              currentView === 'landing'
                ? 'bg-white text-blue-600 shadow-sm font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onNavigate('drive')}
            className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              currentView === 'drive' || currentView === 'viewer'
                ? 'bg-white text-blue-600 shadow-sm font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <FolderKanban className="w-4 h-4 text-blue-500" />
            PDF Drive
          </button>
          <div className="px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-500" />
            Gemini AI Active
          </div>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {currentView === 'landing' ? (
            <button
              onClick={() => onNavigate('drive')}
              className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2 group"
            >
              <span>Launch Workspace</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <button
              onClick={() => onNavigate('landing')}
              className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-sm transition-all"
            >
              Back to Overview
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
