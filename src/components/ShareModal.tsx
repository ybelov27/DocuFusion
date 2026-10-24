import React, { useState } from 'react';
import {
  PdfDocument, UserAccess
} from '../types/pdf';
import {
  Copy, Check, ShieldCheck, Lock, Globe, Building, Users,
  UserPlus, ChevronDown, X
} from 'lucide-react';

interface ShareModalProps {
  document: PdfDocument;
  onClose: () => void;
  onUpdateDocument: (updated: PdfDocument) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  document,
  onClose,
  onUpdateDocument,
}) => {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [accessLevel, setAccessLevel] = useState<PdfDocument['accessLevel']>(document.accessLevel);
  const [isEncrypted, setIsEncrypted] = useState<boolean>(document.isEncrypted);
  const [newEmail, setNewEmail] = useState<string>('');
  const [newRole, setNewRole] = useState<'Editor' | 'Viewer' | 'Commenter'>('Viewer');

  const handleCopyLink = () => {
    const fakeLink = `https://docusphere.drive.app/share/pdf/${document.id}?key=sec_99218`;
    navigator.clipboard.writeText(fakeLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    const newUser: UserAccess = {
      id: `u-${Date.now()}`,
      name: newEmail.split('@')[0].replace('.', ' '),
      email: newEmail.trim(),
      avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?w=100&auto=format&fit=crop&q=80`,
      role: newRole
    };

    const updatedDoc = {
      ...document,
      sharedWith: [...document.sharedWith, newUser]
    };

    onUpdateDocument(updatedDoc);
    setNewEmail('');
  };

  const handleToggleEncryption = () => {
    const updated = {
      ...document,
      isEncrypted: !isEncrypted
    };
    setIsEncrypted(!isEncrypted);
    onUpdateDocument(updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in duration-150 relative">

        {/* Header matching screenshot */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Share "{document.title}"
            </h3>
            <p className="text-xs text-slate-400">Manage permissions & secure link access</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 rounded-full hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        {/* Add people form */}
        <form onSubmit={handleAddUser} className="space-y-2">
          <label className="text-xs font-semibold text-slate-700">Add people and groups</label>
          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Enter email address..."
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as any)}
              className="px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700"
            >
              <option value="Viewer">Viewer</option>
              <option value="Editor">Editor</option>
              <option value="Commenter">Commenter</option>
            </select>
            <button
              type="submit"
              disabled={!newEmail.trim()}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs disabled:opacity-40 transition-all cursor-pointer shadow-2xs"
            >
              Add
            </button>
          </div>
        </form>

        {/* People with access List (Matching screenshot) */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">People with access</p>

          <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1">
            {document.sharedWith.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Only you currently have access.</p>
            ) : (
              document.sharedWith.map((user) => (
                <div key={user.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <p className="font-semibold text-slate-800">{user.name}</p>
                      <p className="text-[10px] text-slate-400">{user.email}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                    {user.role}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* General Access Section (Matching screenshot) */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">General access</p>

          <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-extrabold shadow-2xs">
                C
              </div>
              <div>
                <select
                  value={accessLevel}
                  onChange={(e) => {
                    const level = e.target.value as any;
                    setAccessLevel(level);
                    onUpdateDocument({ ...document, accessLevel: level });
                  }}
                  className="bg-transparent font-bold text-xs text-slate-800 border-none focus:outline-none cursor-pointer p-0"
                >
                  <option value="Domain Access (Cymbal Pty Ltd)">Cymbal Pty Ltd</option>
                  <option value="Restricted">Restricted</option>
                  <option value="Anyone with link">Anyone with link</option>
                </select>
                <p className="text-[10px] text-slate-400">People in this group with link can view</p>
              </div>
            </div>

            <span className="text-xs font-semibold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
              Viewer ▾
            </span>
          </div>
        </div>

        {/* Encryption Checkbox Card (Matching Screenshot bottom overlay) */}
        <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-xs font-bold text-slate-800">Client-Side Zero Knowledge</p>
              <p className="text-[10px] text-slate-500">AES-256 end-to-end PDF protection</p>
            </div>
          </div>

          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isEncrypted}
              onChange={handleToggleEncryption}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span>Add additional encryption</span>
          </label>
        </div>

        {/* Bottom Actions (Matching Screenshot: Copy link & Done) */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedLink ? 'Link Copied!' : 'Copy link'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/20 cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
