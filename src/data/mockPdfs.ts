import { PdfDocument } from '../types/pdf';

export const INITIAL_PDFS: PdfDocument[] = [
  {
    id: 'pdf-1',
    title: 'Q4 2025 Financial Performance & Revenue Outlook',
    filename: 'Q4_2025_Financial_Performance.pdf',
    fileSize: '4.2 MB',
    fileSizeBytes: 4404019,
    category: 'Financial',
    pageCount: 4,
    author: 'James Garcia (CFO)',
    uploadDate: 'Oct 22, 2025',
    lastModified: '2 hours ago',
    starred: true,
    isEncrypted: true,
    accessLevel: 'Domain Access (DocuFusion)',
    sharedWith: [
      { id: 'u1', name: 'James Garcia', email: 'j.garcia@docufusion.com', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', role: 'Owner' },
      { id: 'u2', name: 'Sarah Jenkins', email: 's.jenkins@docufusion.com', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', role: 'Editor' },
      { id: 'u3', name: 'Alex Rivera', email: 'a.rivera@docufusion.com', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', role: 'Viewer' }
    ],
    tags: ['Quarterly', 'Revenue', 'Audit', 'ARR'],
    pages: [
      {
        pageNumber: 1,
        heading: '1. Executive Summary & Revenue Highlights',
        paragraphs: [
          'In Q4 2025, consolidated revenue expanded to $142.8 Million, representing a 28.4% year-over-year increase driven primarily by high demand in enterprise cloud services and integration toolkits.',
          'Gross profit margins reached 74.2%, exceeding internal targets by 320 basis points due to optimized cloud compute infrastructure unit costs and improved software license retention rates.',
          'Annual Recurring Revenue (ARR) breached the $500M milestone, closing at $518.5M with a net dollar retention rate of 124% across enterprise Tier-1 accounts.'
        ],
        tablesOrMetrics: {
          title: 'Q4 Financial Summary (USD Millions)',
          headers: ['Metric', 'Q4 2024', 'Q4 2025', 'YoY Growth (%)'],
          rows: [
            ['Total Revenue', '$111.2M', '$142.8M', '+28.4%'],
            ['ARR', '$410.0M', '$518.5M', '+26.5%'],
            ['Gross Profit', '$78.9M', '$105.9M', '+34.2%'],
            ['Operating Income', '$22.4M', '$36.1M', '+61.1%'],
            ['Free Cash Flow', '$18.5M', '$29.4M', '+58.9%']
          ]
        }
      },
      {
        pageNumber: 2,
        heading: '2. Operating Expenses & Allocations',
        paragraphs: [
          'Research and Development investments totaled $41.2M in Q4, representing 28.8% of net revenue. Key investments were made into custom infrastructure acceleration.',
          'Sales and Marketing expenses stabilized at 22.1% of revenue ($31.5M), demonstrating increased operational leverage and reduced client customer acquisition costs (CAC by -14.2%).',
          'General and Administrative expenses decreased slightly as a percentage of revenue to 8.4% ($12.0M) due to automated invoice processing and compliance tools.'
        ]
      },
      {
        pageNumber: 3,
        heading: '3. Regional Segment Performance',
        paragraphs: [
          'North America continues as the primary market generating $88.5M (62% of revenue), up 24% YoY with heavy enterprise cloud adoption in healthcare and financial technology sectors.',
          'EMEA experienced accelerated momentum with $38.2M (26.7% of revenue), growing at 36.1% YoY driven by newly signed multi-year government and telecom framework agreements.',
          'Asia-Pacific generated $16.1M (11.3% of revenue), delivering 31.0% growth as cross-border trade integrations expanded across Japan and Singapore tech corridors.'
        ]
      },
      {
        pageNumber: 4,
        heading: '4. FY2026 Strategic Guidance & Financial Targets',
        paragraphs: [
          'Management projects FY2026 total revenue between $610M and $635M, reflecting 22% to 27% sustained top-line annual expansion.',
          'Operating cash flow target is set at $145M - $155M, with capital expenditure capped at $35M focused on distributed edge datacenter infrastructure.',
          'Key strategic priorities include launching automated enterprise workflows and expanding ISO 27001 / FedRAMP High certification.'
        ]
      }
    ],
    highlights: [
      {
        id: 'h1',
        pageNumber: 1,
        selectedText: 'Annual Recurring Revenue (ARR) breached the $500M milestone, closing at $518.5M',
        color: 'yellow',
        comment: 'Key headline metric for upcoming board meeting pitch.',
        author: 'James Garcia',
        createdAt: 'Oct 22, 2025'
      },
      {
        id: 'h2',
        pageNumber: 2,
        selectedText: 'reduced client customer acquisition costs (CAC by -14.2%)',
        color: 'green',
        comment: 'Marketing efficiency gains looking strong!',
        author: 'Sarah Jenkins',
        createdAt: 'Oct 23, 2025'
      }
    ]
  },
  {
    id: 'pdf-2',
    title: 'Enterprise Cloud Architecture Whitepaper',
    filename: 'Enterprise_Cloud_Architecture_2026.pdf',
    fileSize: '8.7 MB',
    fileSizeBytes: 9122611,
    category: 'Research',
    pageCount: 3,
    author: 'Dr. Elena Rostova',
    uploadDate: 'Oct 19, 2025',
    lastModified: 'Yesterday',
    starred: true,
    isEncrypted: false,
    accessLevel: 'Anyone with link',
    sharedWith: [
      { id: 'u1', name: 'Dr. Elena Rostova', email: 'e.rostova@docufusion.com', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80', role: 'Owner' }
    ],
    tags: ['Cloud', 'Architecture', 'Retrieval', 'Latency'],
    pages: [
      {
        pageNumber: 1,
        heading: '1. Neural Context Routing & Hybrid Chunking',
        paragraphs: [
          'Traditional cloud document pipelines suffer from context fragmentation and high latency when retrieving complex domain documents exceeding 100 pages.',
          'Our novel Hybrid Chunking Architecture combines semantic sentence boundary detection with dense indexing relationships, lowering query lookup latency by 64%.',
          'Benchmark evaluation across 10,000 dense financial and technical documents demonstrated a 94.8% precision rate on multi-step reasoning tasks.'
        ]
      },
      {
        pageNumber: 2,
        heading: '2. Sub-50ms Decoding & Quantization',
        paragraphs: [
          'To achieve real-time document streaming and contextual search, we deploy 4-bit NormalFloat (NF4) quantization coupled with speculative decoding engines.',
          'Tokens are generated at 128 tokens per second on single consumer-grade GPUs, reducing cloud hosting costs per 1,000 queries from $0.04 to $0.007.',
          'Memory overhead is reduced by 72%, enabling high-density edge node deployments across restricted enterprise environments.'
        ]
      },
      {
        pageNumber: 3,
        heading: '3. Privacy-Preserving Guardrails',
        paragraphs: [
          'All document content processed through DocuFusion is scrubbed for PII (Personally Identifiable Information) on local edge client devices prior to transmission.',
          'Zero-Knowledge Proofs ensure cryptographic verifiability of document content without disclosing raw text content to third parties.',
          'Full compliance with global regulatory standards and HIPAA safeguards is guaranteed out of the box.'
        ]
      }
    ],
    highlights: []
  },
  {
    id: 'pdf-3',
    title: 'Enterprise Cloud Service Level Agreement (SLA)',
    filename: 'Enterprise_Cloud_SLA_Agreement_2026.pdf',
    fileSize: '2.1 MB',
    fileSizeBytes: 2202010,
    category: 'Legal',
    pageCount: 3,
    author: 'Legal Counsel & Operations',
    uploadDate: 'Oct 15, 2025',
    lastModified: '3 days ago',
    starred: false,
    isEncrypted: true,
    accessLevel: 'Restricted',
    sharedWith: [
      { id: 'u1', name: 'James Garcia', email: 'j.garcia@docufusion.com', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', role: 'Owner' }
    ],
    tags: ['Legal', 'SLA', 'Uptime', 'Compliance', 'Contract'],
    pages: [
      {
        pageNumber: 1,
        heading: '1. Service Availability Commitment (99.99% Uptime)',
        paragraphs: [
          'Provider guarantees a Monthly Uptime Percentage of at least 99.99% during each calendar month across all production API cluster endpoints.',
          'In the event of unexcused service outages resulting in uptime dropping below 99.99%, Customer shall be eligible for Service Credits calculated as a percentage of monthly recurring fees.',
          'Scheduled maintenance windows are limited to maximum 2 hours per calendar month with minimum 72-hour advance written notice.'
        ]
      },
      {
        pageNumber: 2,
        heading: '2. Service Credit Schedule & Claim Process',
        paragraphs: [
          'Uptime between 99.0% and 99.98% entitles Customer to a 15% Monthly Service Credit.',
          'Uptime between 95.0% and 98.99% entitles Customer to a 30% Monthly Service Credit.',
          'Uptime below 95.0% entitles Customer to a 100% Monthly Service Credit or option for immediate contract termination without penalty.'
        ]
      },
      {
        pageNumber: 3,
        heading: '3. Data Protection, Security & Indemnification',
        paragraphs: [
          'Provider agrees to maintain SOC 2 Type II, ISO 27001, and HIPAA compliance certifications throughout the agreement term.',
          'Maximum liability cap for data breaches or breach of confidentiality is set at 3x annual contract value ($3.6M ceiling).',
          'Customer retains full ownership of all uploaded document content, vector indices, and system configurations.'
        ]
      }
    ],
    highlights: []
  },
  {
    id: 'pdf-4',
    title: 'Global Brand Refresh Strategy & Design System',
    filename: 'Brand_Refresh_Strategy_2026.pdf',
    fileSize: '12.4 MB',
    fileSizeBytes: 13002341,
    category: 'Marketing',
    pageCount: 2,
    author: 'Design & Brand Team',
    uploadDate: 'Oct 10, 2025',
    lastModified: '5 days ago',
    starred: false,
    isEncrypted: false,
    accessLevel: 'Anyone with link',
    sharedWith: [],
    tags: ['Brand', 'Design', 'Marketing', 'Guidelines'],
    pages: [
      {
        pageNumber: 1,
        heading: '1. Modern Visual Identity & Typography Standards',
        paragraphs: [
          'Our refreshed visual identity emphasizes clarity, accessibility, and human-centric minimalism across digital and print touchpoints.',
          'The updated color palette transitions to vibrant Sapphire Blue (#2563EB), Warm Amber (#F59E0B), and Neutral Slate, ensuring compliance with WCAG AAA contrast guidelines.',
          'Typography guidelines mandate Plus Jakarta Sans for high-impact display headlines paired with Inter for dense body copy and data tables.'
        ]
      },
      {
        pageNumber: 2,
        heading: '2. Product UI System & Component Library',
        paragraphs: [
          'All web and mobile interfaces must adopt rounded card surfaces (16px border-radius), subtle drop shadows, and pill-shaped navigation tabs.',
          'Dark mode support is mandatory across all SaaS modules, featuring deep Slate-900 surfaces with reduced blue light glow.',
          'Micro-interactions and subtle transitions (200ms ease-out) are required for all button hovers and modal overlays.'
        ]
      }
    ],
    highlights: []
  }
];
