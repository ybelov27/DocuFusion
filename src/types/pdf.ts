export type PdfCategory = 'Financial' | 'Legal' | 'Research' | 'Technical' | 'Marketing';

export type HighlightColor = 'yellow' | 'green' | 'blue' | 'purple';

export interface UserAccess {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'Owner' | 'Editor' | 'Viewer' | 'Commenter';
}

export interface HighlightAnnotation {
  id: string;
  pageNumber: number;
  selectedText: string;
  color: HighlightColor;
  comment?: string;
  author: string;
  createdAt: string;
}

export interface PdfPageContent {
  pageNumber: number;
  heading: string;
  paragraphs: string[];
  tablesOrMetrics?: { title: string; headers: string[]; rows: string[][] };
}

export interface PdfDocument {
  id: string;
  title: string;
  filename: string;
  fileSize: string;
  fileSizeBytes: number;
  category: PdfCategory;
  pageCount: number;
  author: string;
  uploadDate: string;
  lastModified: string;
  starred: boolean;
  isEncrypted: boolean;
  accessLevel: 'Restricted' | 'Domain Access (DocuFusion)' | 'Anyone with link';
  sharedWith: UserAccess[];
  tags: string[];
  pages: PdfPageContent[];
  highlights: HighlightAnnotation[];
}
