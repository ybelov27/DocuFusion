export type PdfCategory = 'Financial' | 'Legal' | 'Research' | 'Technical' | 'Marketing';

export type HighlightColor = 'yellow' | 'green' | 'blue' | 'purple';

export interface UserAccess {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'Owner' | 'Editor' | 'Viewer' | 'Commenter';
}

export interface MetricItem {
  label: string;
  value: string;
  change?: string;
  status?: 'positive' | 'negative' | 'neutral';
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

export interface EntityTag {
  name: string;
  type: 'Financial' | 'Organization' | 'Technology' | 'Compliance' | 'Metric';
}

export interface AiAnalysis {
  executiveSummary: string;
  keyTakeaways: string[];
  metrics: MetricItem[];
  entities: EntityTag[];
  sentiment: 'Bullish / Positive' | 'Neutral' | 'High Risk / Caution' | 'Informative';
  targetAudience: string;
  actionItems: string[];
  suggestedQuestions: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: string;
  referencedPages?: number[];
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
  accessLevel: 'Restricted' | 'Domain Access (Cymbal Pty Ltd)' | 'Anyone with link';
  sharedWith: UserAccess[];
  tags: string[];
  pages: PdfPageContent[];
  highlights: HighlightAnnotation[];
  aiAnalysis: AiAnalysis;
  chatHistory: ChatMessage[];
}
