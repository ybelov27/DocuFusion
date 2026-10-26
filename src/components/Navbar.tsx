import React from 'react';
import { Search, Settings, HelpCircle, Grid, FolderKanban } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'drive' | 'viewer';
  onNavigate: (view: 'landing' | 'drive') => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  searchQuery = '',
  onSearchChange
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">

      {/* Brand Logo & Name */}
      <div
        onClick={() => onNavigate('landing')}
        className="flex items-center gap-3 cursor-pointer select-none shrink-0"
      >
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600 text-white shadow-xs">
          <FolderKanban className="w-5 h-5" />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-xl tracking-tight text-slate-800">
            DocuFusion
          </span>
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 hidden sm:inline">
            Drive
          </span>
        </div>
      </div>

      {/* Google Drive Style Search Bar */}
      {currentView !== 'landing' ? (
        <div className="flex-1 max-w-2xl mx-4 lg:mx-12">
          <div className="relative flex items-center bg-slate-100 hover:bg-slate-200/80 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:shadow-md transition-all rounded-full px-4 py-2 text-slate-700">
            <Search className="w-5 h-5 text-slate-500 shrink-0 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search in DocuFusion Drive"
              className="w-full bg-transparent border-none outline-none text-sm text-slate-900 placeholder:text-slate-500"
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('landing')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
              currentView === 'landing'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onNavigate('drive')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
              currentView !== 'landing'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Go to Drive
          </button>
        </div>
      )}

      {/* Right Google Actions & Profile */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-all" title="Help">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-all" title="Settings">
          <Settings className="w-5 h-5" />
        </button>
        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-all hidden sm:flex" title="Apps">
          <Grid className="w-5 h-5" />
        </button>
        <div className="ml-1 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs ring-2 ring-blue-100 cursor-pointer">
          J
        </div>
      </div>

    </header>
  );
};
