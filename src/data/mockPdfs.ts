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
    accessLevel: 'Domain Access (Cymbal Pty Ltd)',
    sharedWith: [
      { id: 'u1', name: 'James Garcia', email: 'j.garcia@cymbal.com', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', role: 'Owner' },
      { id: 'u2', name: 'Sarah Jenkins', email: 's.jenkins@cymbal.com', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', role: 'Editor' },
      { id: 'u3', name: 'Alex Rivera', email: 'a.rivera@cymbal.com', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', role: 'Viewer' }
    ],
    tags: ['Quarterly', 'Revenue', 'Audit', 'ARR'],
    pages: [
      {
        pageNumber: 1,
        heading: '1. Executive Summary & Revenue Highlights',
        paragraphs: [
          'In Q4 2025, consolidated revenue expanded to $142.8 Million, representing a 28.4% year-over-year increase driven primarily by high demand in enterprise cloud services and AI integration toolkits.',
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
        heading: '2. Operating Expenses & R&D Allocations',
        paragraphs: [
          'Research and Development investments totaled $41.2M in Q4, representing 28.8% of net revenue. Key investments were made into custom hardware acceleration and automated vector embeddings processing.',
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
          'Key strategic priorities include launching AI Autonomous Agents for Enterprise Workflows and expanding ISO 27001 / FedRAMP High certification.'
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
    ],
    aiAnalysis: {
      executiveSummary: 'This document presents the Q4 2025 financial results showing robust financial health with revenue reaching $142.8M (+28.4% YoY) and ARR surpassing $518.5M. High margin expansion (+320 bps) was supported by infrastructure optimization and lower CAC (-14.2%). FY2026 revenue guidance is set at $610M-$635M.',
      keyTakeaways: [
        'Total revenue hit $142.8M in Q4 (+28.4% YoY), driving ARR to $518.5M.',
        'Gross Margin increased to 74.2% while Free Cash Flow jumped 58.9% to $29.4M.',
        'EMEA was the fastest-growing market at 36.1% YoY.',
        'FY2026 guidance projects $610M - $635M in full-year revenue.'
      ],
      metrics: [
        { label: 'Q4 Revenue', value: '$142.8M', change: '+28.4%', status: 'positive' },
        { label: 'Annual Recurring Revenue', value: '$518.5M', change: '+26.5%', status: 'positive' },
        { label: 'Gross Margin', value: '74.2%', change: '+3.2%', status: 'positive' },
        { label: 'Free Cash Flow', value: '$29.4M', change: '+58.9%', status: 'positive' },
        { label: 'CAC Efficiency', value: '-14.2%', change: 'Improved', status: 'positive' }
      ],
      entities: [
        { name: 'Cymbal Pty Ltd', type: 'Organization' },
        { name: 'ARR ($518.5M)', type: 'Metric' },
        { name: 'EMEA Expansion', type: 'Financial' },
        { name: 'FedRAMP High', type: 'Compliance' }
      ],
      sentiment: 'Bullish / Positive',
      targetAudience: 'C-Suite Executives, Investors, Board of Directors, Finance Teams',
      actionItems: [
        'Prepare Board presentation slide deck based on $518.5M ARR milestone.',
        'Allocate $41.2M R&D budget towards hardware acceleration in Q1.',
        'Finalize EMEA telecom multi-year contract renewals before Q1 end.'
      ],
      suggestedQuestions: [
        'What was the primary driver of Q4 revenue growth?',
        'How did EMEA compare to North America in YoY growth?',
        'What is the FY2026 financial guidance?',
        'What are the key R&D investment focus areas?'
      ]
    },
    chatHistory: [
      {
        id: 'c1',
        sender: 'user',
        message: 'What were the gross profit margin and cash flow stats for Q4?',
        timestamp: '10:14 AM',
        referencedPages: [1]
      },
      {
        id: 'c2',
        sender: 'ai',
        message: 'According to Page 1 of the document:\n• Gross profit margin reached 74.2%, which exceeded internal targets by 320 basis points.\n• Free Cash Flow reached $29.4 Million in Q4 2025, showing a strong 58.9% YoY growth from $18.5 Million in Q4 2024.',
        timestamp: '10:14 AM',
        referencedPages: [1]
      }
    ]
  },
  {
    id: 'pdf-2',
    title: 'NextGen Generative AI Architecture Whitepaper',
    filename: 'NextGen_AI_Architecture_2026.pdf',
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
      { id: 'u1', name: 'Dr. Elena Rostova', email: 'e.rostova@cymbal.com', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80', role: 'Owner' }
    ],
    tags: ['AI/ML', 'LLM', 'Retrieval Augmented Generation', 'Latency'],
    pages: [
      {
        pageNumber: 1,
        heading: '1. Neural Context Routing & Hybrid Chunking',
        paragraphs: [
          'Traditional RAG pipelines suffer from context fragmentation and high inference latency when retrieving complex domain documents exceeding 100 pages.',
          'Our novel Hybrid Chunking Architecture combines semantic sentence boundary detection with dense vector embeddings and hierarchical Graph RAG relationships, lowering query lookup latency by 64%.',
          'Benchmark evaluation across 10,000 dense financial and technical documents demonstrated a 94.8% precision rate on multi-step reasoning tasks.'
        ]
      },
      {
        pageNumber: 2,
        heading: '2. Sub-50ms Speculative Decoding & Quantization',
        paragraphs: [
          'To achieve real-time document streaming and contextual Q&A, we deploy 4-bit NormalFloat (NF4) quantization coupled with speculative decoding engines.',
          'Tokens are generated at 128 tokens per second on single consumer-grade GPUs, reducing cloud hosting costs per 1,000 queries from $0.04 to $0.007.',
          'Memory overhead is reduced by 72%, enabling high-density edge node deployments across restricted enterprise environments.'
        ]
      },
      {
        pageNumber: 3,
        heading: '3. Privacy-Preserving Zero-Knowledge Guardrails',
        paragraphs: [
          'All document content processed through the pipeline is scrubbed for PII (Personally Identifiable Information) on local edge client devices prior to model invocation.',
          'Zero-Knowledge Proofs (ZKPs) ensure cryptographic verifiability of document summaries without disclosing raw text content to remote LLM API providers.',
          'Full compliance with EU AI Act High-Risk System standards and HIPAA safeguards is guaranteed out of the box.'
        ]
      }
    ],
    highlights: [],
    aiAnalysis: {
      executiveSummary: 'This technical whitepaper outlines NextGen Generative AI Architecture, introducing Hybrid Context Routing and NF4 quantization. Key gains include 64% faster retrieval, 128 t/s token generation speed, and a 82.5% reduction in compute cost ($0.007 per 1,000 queries) alongside zero-knowledge guardrails.',
      keyTakeaways: [
        'Hybrid Chunking Architecture lowers query lookup latency by 64%.',
        'Multi-step reasoning precision improved to 94.8% on complex benchmarks.',
        'NF4 quantization reduces hosting cost from $0.04 to $0.007 per 1k queries.',
        'Zero-Knowledge Proofs ensure local PII scrubbing and EU AI Act compliance.'
      ],
      metrics: [
        { label: 'Retrieval Latency Improvement', value: '64% Faster', status: 'positive' },
        { label: 'Multi-Step Reasoning Accuracy', value: '94.8%', status: 'positive' },
        { label: 'Generation Speed', value: '128 tok/s', status: 'positive' },
        { label: 'Cost Reduction', value: '-82.5%', status: 'positive' }
      ],
      entities: [
        { name: 'Hybrid Graph RAG', type: 'Technology' },
        { name: 'NF4 Quantization', type: 'Technology' },
        { name: 'EU AI Act', type: 'Compliance' }
      ],
      sentiment: 'Informative',
      targetAudience: 'AI Engineers, Enterprise Architects, CTOs, Security Officers',
      actionItems: [
        'Bench-test NF4 quantization on internal document search service.',
        'Incorporate local edge PII scrubber into standard SDK release.'
      ],
      suggestedQuestions: [
        'How does Hybrid Chunking reduce retrieval latency?',
        'What are the memory savings with 4-bit NormalFloat quantization?',
        'How does the platform ensure compliance with EU AI Act?'
      ]
    },
    chatHistory: []
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
      { id: 'u1', name: 'James Garcia', email: 'j.garcia@cymbal.com', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', role: 'Owner' }
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
          'Customer retains full ownership of all uploaded document content, vector indices, and fine-tuned model weights.'
        ]
      }
    ],
    highlights: [],
    aiAnalysis: {
      executiveSummary: 'Standard enterprise cloud service agreement providing a 99.99% monthly uptime guarantee. Offers graduated service credits up to 100% for downtime below 95%, with a $3.6M liability cap and full SOC 2 / ISO 27001 compliance.',
      keyTakeaways: [
        'Guaranteed uptime target: 99.99% per calendar month.',
        'Service credits range from 15% to 100% depending on outage duration.',
        'Termination right without penalty if uptime falls below 95%.',
        'Liability cap set at 3x annual contract value ($3.6M max).'
      ],
      metrics: [
        { label: 'Uptime Commitment', value: '99.99%', status: 'positive' },
        { label: 'Max Liability Cap', value: '$3.6M', status: 'neutral' },
        { label: 'Maintenance Window', value: '2 hrs/mo', status: 'neutral' }
      ],
      entities: [
        { name: 'SOC 2 Type II', type: 'Compliance' },
        { name: 'ISO 27001', type: 'Compliance' },
        { name: 'HIPAA', type: 'Compliance' }
      ],
      sentiment: 'Neutral',
      targetAudience: 'Legal Counsel, Procurement, Risk Management Teams',
      actionItems: [
        'Verify automated monitoring system alerts for 99.99% uptime tracking.',
        'Store signed contract PDF in encrypted legal vault.'
      ],
      suggestedQuestions: [
        'What are the service credits if uptime drops to 98%?',
        'What is the maximum liability cap for data breaches?',
        'How much notice is required for scheduled maintenance?'
      ]
    },
    chatHistory: []
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
    highlights: [],
    aiAnalysis: {
      executiveSummary: 'Comprehensive brand refresh strategy defining new visual standards: WCAG AAA compliant color palette (Sapphire Blue, Warm Amber), typography pairings (Plus Jakarta Sans & Inter), and modern UI patterns with dark mode support.',
      keyTakeaways: [
        'Primary color palette upgraded to Sapphire Blue (#2563EB) & Amber.',
        'Typography standard set to Plus Jakarta Sans & Inter.',
        'WCAG AAA accessibility compliance required for all digital design.',
        '16px card border radius and pill navigation introduced.'
      ],
      metrics: [
        { label: 'Accessibility Standard', value: 'WCAG AAA', status: 'positive' },
        { label: 'Animation Timing', value: '200ms ease', status: 'neutral' }
      ],
      entities: [
        { name: 'Plus Jakarta Sans', type: 'Technology' },
        { name: 'WCAG AAA', type: 'Compliance' }
      ],
      sentiment: 'Bullish / Positive',
      targetAudience: 'Product Designers, UI/UX Engineers, Marketing Managers',
      actionItems: [
        'Update Tailwind CSS tokens with new brand color codes.',
        'Audit web apps for WCAG AAA contrast compliance.'
      ],
      suggestedQuestions: [
        'What are the official typography pairings?',
        'What is the primary brand color hex code?',
        'What are the UI component guidelines for card border radius?'
      ]
    },
    chatHistory: []
  }
];
