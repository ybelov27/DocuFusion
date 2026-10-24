import React, { useState } from 'react';
import {
  PdfDocument, ChatMessage
} from '../types/pdf';
import {
  Sparkles, Send, Copy, Check, TrendingUp, AlertTriangle,
  CheckCircle2, HelpCircle, FileText, Bot, User, Layers, Tag,
  ExternalLink, ChevronDown, ChevronUp, RefreshCw
} from 'lucide-react';

interface AiAnalysisPanelProps {
  document: PdfDocument;
  onSendMessage: (message: string) => void;
  onClose: () => void;
}

export const AiAnalysisPanel: React.FC<AiAnalysisPanelProps> = ({
  document,
  onSendMessage,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'chat' | 'actionItems'>('summary');
  const [inputMessage, setInputMessage] = useState<string>('');
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const { aiAnalysis } = document;

  const handleCopySummary = () => {
    navigator.clipboard.writeText(aiAnalysis.executiveSummary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;

    const msg = inputMessage.trim();
    setInputMessage('');
    setIsTyping(true);

    onSendMessage(msg);

    setTimeout(() => {
      setIsTyping(false);
    }, 600);
  };

  const handleSuggestedClick = (question: string) => {
    setInputMessage(question);
    setIsTyping(true);
    onSendMessage(question);
    setActiveTab('chat');
    setTimeout(() => {
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="w-full lg:w-[420px] bg-white border-l border-slate-200 flex flex-col h-full shrink-0 shadow-xl z-10 transition-all">

      {/* Panel Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-amber-300">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm">Gemini AI Assistant</h3>
              <span className="text-[9px] font-extrabold uppercase tracking-widest bg-amber-400 text-slate-900 px-1.5 py-0.5 rounded">Pro</span>
            </div>
            <p className="text-[10px] text-slate-300">
              Document Analysis & Real-Time Q&A
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all text-xs font-bold"
          title="Close AI Panel"
        >
          ✕
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center border-b border-slate-200 bg-slate-50 p-1.5 gap-1 text-xs font-semibold text-slate-600">
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeTab === 'summary' ? 'bg-white text-indigo-600 shadow-2xs font-bold' : 'hover:bg-slate-200/50'
          }`}
        >
          Executive Brief
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-1.5 rounded-lg transition-all relative ${
            activeTab === 'chat' ? 'bg-white text-indigo-600 shadow-2xs font-bold' : 'hover:bg-slate-200/50'
          }`}
        >
          Ask Doc
          {document.chatHistory.length > 0 && (
            <span className="ml-1 px-1.5 py-0.2 text-[9px] bg-indigo-100 text-indigo-700 rounded-full font-extrabold">
              {document.chatHistory.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('actionItems')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeTab === 'actionItems' ? 'bg-white text-indigo-600 shadow-2xs font-bold' : 'hover:bg-slate-200/50'
          }`}
        >
          Actions & Metrics
        </button>
      </div>

      {/* Main Tab Content Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">

        {activeTab === 'summary' && (
          <>
            {/* Executive Summary Card */}
            <div className="bg-gradient-to-br from-indigo-50/70 via-blue-50/40 to-slate-50 p-4 rounded-2xl border border-indigo-100 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Executive Summary
                </span>
                <button
                  onClick={handleCopySummary}
                  className="text-[10px] font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-2xs"
                >
                  {copiedSummary ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSummary ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-normal">
                {aiAnalysis.executiveSummary}
              </p>

              <div className="pt-2 border-t border-indigo-100/80 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500">
                <span>Sentiment: <strong className="text-slate-800">{aiAnalysis.sentiment}</strong></span>
                <span>Target: <strong className="text-slate-800">{aiAnalysis.targetAudience}</strong></span>
              </div>
            </div>

            {/* Extracted Metrics Grid */}
            {aiAnalysis.metrics.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Key Metrics & Insights
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {aiAnalysis.metrics.map((m, idx) => (
                    <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1">
                      <p className="text-[10px] text-slate-500 font-medium truncate">{m.label}</p>
                      <div className="flex items-baseline justify-between">
                        <span className="font-extrabold text-slate-900 text-sm">{m.value}</span>
                        {m.change && (
                          <span className={`text-[9px] font-bold px-1 rounded ${
                            m.status === 'positive' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {m.change}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Takeaways List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Key Takeaways
              </h4>
              <ul className="space-y-2 text-xs">
                {aiAnalysis.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200/80 text-slate-700 flex items-start gap-2 shadow-2xs">
                    <span className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Entity Tags */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-purple-600" /> Classified Entities & Topics
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {aiAnalysis.entities.map((e, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-semibold">
                    {e.name} <span className="text-[9px] text-slate-400">({e.type})</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Suggested Questions */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-600" /> Ask Gemini about this PDF
              </h4>
              <div className="space-y-1.5">
                {aiAnalysis.suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestedClick(q)}
                    className="w-full text-left p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-200 text-slate-700 hover:text-indigo-900 text-xs transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span>{q}</span>
                    <Sparkles className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'chat' && (
          <div className="flex flex-col h-full justify-between space-y-4">

            {/* Chat History Messages */}
            <div className="space-y-3">
              {document.chatHistory.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mx-auto">
                    <Bot className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">Ask Gemini anything about this document</p>
                  <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                    Gemini cross-references all pages and provides accurate answers with citations.
                  </p>
                </div>
              ) : (
                document.chatHistory.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col space-y-1 ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 px-1">
                      {msg.sender === 'ai' ? (
                        <span className="font-bold text-indigo-600 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" /> Gemini AI
                        </span>
                      ) : (
                        <span className="font-bold text-slate-700">You</span>
                      )}
                      <span>• {msg.timestamp}</span>
                    </div>

                    <div
                      className={`p-3 rounded-2xl max-w-[90%] text-xs leading-relaxed whitespace-pre-wrap ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-xs'
                          : 'bg-slate-100 text-slate-800 rounded-bl-xs border border-slate-200'
                      }`}
                    >
                      {msg.message}

                      {msg.referencedPages && msg.referencedPages.length > 0 && (
                        <div className="mt-2 pt-1.5 border-t border-slate-200/60 flex items-center gap-1 text-[10px] text-indigo-700 font-semibold">
                          <FileText className="w-3 h-3 text-indigo-500" />
                          <span>Sources: Page {msg.referencedPages.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-indigo-600 font-medium p-2 bg-indigo-50 rounded-xl border border-indigo-100 w-fit animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Gemini is reading PDF and generating response...</span>
                </div>
              )}
            </div>

          </div>
        )}

        {activeTab === 'actionItems' && (
          <div className="space-y-4">

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Automated Action Items
              </h4>
              <div className="space-y-2">
                {aiAnalysis.actionItems.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
                    <input type="checkbox" className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800">Target Audience & Scope</h4>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                <p><strong>Audience:</strong> {aiAnalysis.targetAudience}</p>
                <p className="mt-1"><strong>Tone & Sentiment:</strong> {aiAnalysis.sentiment}</p>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Chat Input Bar always at bottom */}
      <div className="p-3 bg-white border-t border-slate-200 shrink-0">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask Gemini about this document..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white transition-all cursor-pointer shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
