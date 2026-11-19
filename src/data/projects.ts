export type ProjectStatus =
  | "Completed"
  | "In Development"
  | "Concept / Prototype"
  | "Completed – Not Publicly Deployed"
  | string;

export type ProjectCategory =
  | "Web Development"
  | "Mobile Applications"
  | "Software & ERP"
  | "AI & Automation"
  | "Creative Design"
  | "Video Production"
  | "Finance Management / Mobile Application"
  | "Fundraising / Web Application"
  | "Web Utility Application"
  | "Creative Web Development"
  | "Education Management Software"
  | string;

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  projectStatus: ProjectStatus;
  shortDescription: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  technologyStack: string[];
  thumbnailUrl: string;
  galleryImages: string[];
  clientName?: string;
  completionDate?: string;
  isFeatured: boolean;
  qaMetrics?: {
    testSuites: number;
    testsPassed: number;
    testsFailed: number;
    analyzeStatus: string;
    flutterVersion: string;
    dartVersion: string;
  };
  deploymentDetails?: {
    development: string;
    testing: string;
    distribution: string;
    usage: string;
    playStore: string;
    signing: string;
  };
}

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-pmm",
    slug: "personal-money-manager",
    title: "Personal Money Manager",
    category: "Finance Management / Mobile Application",
    projectStatus: "Completed",
    shortDescription:
      "A personal finance management application designed to help users manage income, expenses and financial activities.",
    overview:
      "Personal Money Manager was developed as an offline-first financial sanctuary. Engineered with Flutter 3.47.5 and Dart 3.13.4, it unifies multi-account balances (Bank, Cash, Credit Cards), atomic transaction logging, progressive debt tracking with loan waiver support, recurring bills with auto-pay alerts, category budgets, and a 100% on-device AI financial assistant that answers queries with zero cloud dependencies.",
    problem:
      "Modern finance applications require invasive SMS read permissions, bank login linking, and monetize user financial habits on third-party cloud servers. Furthermore, fragmented bank accounts, untracked cash leakage, and awkward informal lending between peers lead to financial blind spots.",
    solution:
      "AIVSTACK architected an entirely on-device mobile platform powered by an ACID-compliant local SQLite engine, dual-layered PIN & biometric authentication, and an embedded deterministic natural language parser capable of answering colloquial Malayalam and English queries in <5ms without internet access.",
    features: [
      "Multi-Account & Net Worth Aggregator (Bank, Cash, Credit Cards with masked privacy)",
      "Triple-Type Transaction Engine (Income, Expense, and atomic inter-account Transfers)",
      "Bilateral Debt & Credit Ledger with partial repayments and formal Waived loan status",
      "Recurring Bills & Subscription Sentinel with auto-pay tracking and due date badges",
      "Weekly & Monthly Category Spending Budgets with visual percentage guardrails",
      "100% On-Device Financial AI Assistant (Dual-language Malayalam & English NLP)",
      "Interactive Financial Reports with Income vs. Expense comparison & spending donut charts",
      "PIN Pad & Hardware Biometric Fingerprint Security with app lifecycle protection",
      "Glanceable Dark Theme Mini-Widget for rapid zero-tap balance checks",
    ],
    technologyStack: [
      "Flutter",
      "Dart",
      "Riverpod",
      "SQLite",
      "On-Device AI",
      "local_auth",
    ],
    thumbnailUrl: "/portfolio/money-manager/01_dashboard_home.jpg",
    galleryImages: [
      "/portfolio/money-manager/01_dashboard_home.jpg",
      "/portfolio/money-manager/02_analytics_reports.jpg",
      "/portfolio/money-manager/03_local_ai_assistant.jpg",
      "/portfolio/money-manager/04_debt_management.jpg",
      "/portfolio/money-manager/05_transactions_timeline.jpg",
      "/portfolio/money-manager/06_widget_glanceable.jpg",
      "/portfolio/money-manager/07_budgets_and_limits.jpg",
      "/portfolio/money-manager/08_pin_biometric_security.png",
      "/portfolio/money-manager/09_accounts_management.png",
      "/portfolio/money-manager/10_recurring_bills.png",
      "/portfolio/money-manager/11_add_transaction_modal.jpg",
    ],
    clientName: "Private Alpha Distribution & Direct Users",
    completionDate: "November 2026",
    isFeatured: true,
    qaMetrics: {
      testSuites: 14,
      testsPassed: 128,
      testsFailed: 0,
      analyzeStatus: "No issues found",
      flutterVersion: "Flutter 3.47.5",
      dartVersion: "Dart 3.13.4",
    },
    deploymentDetails: {
      development: "Completed",
      testing: "Completed (14 Test Suites, 128 Passed Tests)",
      distribution: "Active via WhatsApp APK",
      usage: "Available for use / Active daily personal finance",
      playStore: "Deferred (Phased milestone)",
      signing: "Debug signing active (Production key generation pending)",
    },
  },
  {
    id: "proj-fundraising",
    slug: "fundraising-website",
    title: "Fundraising Website",
    category: "Fundraising / Web Application",
    projectStatus: "Completed",
    shortDescription:
      "A digital fundraising platform designed to present fundraising initiatives and manage contribution-related activities.",
    overview:
      "A dedicated, high-conversion web platform engineered to transparently present fundraising campaigns, manage real-time backer contributions, and streamline donor communication. The platform provides intuitive campaign storytelling, secure checkout pipelines, and live contribution tracking.",
    problem:
      "Fundraising campaigns frequently struggle with fragmented donor outreach, lack of public ledger transparency, and high abandonment rates caused by clunky payment handshakes.",
    solution:
      "We engineered a modern, responsive web application featuring direct payment gateway integration, live donation progress telemetry, social sharing mechanisms, and an administrative portal to manage campaign milestones.",
    features: [
      "Dynamic campaign milestone and goal tracking",
      "Seamless multi-tier contribution workflows",
      "Public donor ledger with optional anonymity",
      "Automated tax receipt and contribution confirmation generation",
      "Mobile-optimized responsive donation funnel",
    ],
    technologyStack: ["Next.js", "React", "Tailwind CSS", "Payment Gateway"],
    thumbnailUrl: "/portfolio/placeholders/fundraising-preview.svg",
    galleryImages: ["/portfolio/placeholders/fundraising-preview.svg"],
    isFeatured: true,
  },
  {
    id: "proj-yt-downloader",
    slug: "youtube-downloader",
    title: "YouTube Downloader",
    category: "Web Utility Application",
    projectStatus: "Completed – Not Publicly Deployed",
    shortDescription:
      "A web-based utility application developed to provide YouTube video downloading functionality.",
    overview:
      "A high-throughput media extraction utility developed for local content archiving and format conversion. The solution unites a reactive React frontend with a high-performance Python FastAPI backend orchestrating yt-dlp and FFmpeg CLI processes.",
    problem:
      "Online media converters are frequently cluttered with malicious ads, intrusive trackers, restricted file size limits, and unreliable transcoding pipelines.",
    solution:
      "A clean, ad-free web utility application providing reliable URL parsing, adaptive stream detection (1080p, 4K, audio-only MP3/FLAC), and automated multiplexing directly on the host machine.",
    features: [
      "Real-time URL stream inspection and format resolution",
      "Adaptive audio-video multiplexing with FFmpeg",
      "Background download queue with status polling",
      "Audio-only lossless extraction (MP3 / FLAC)",
      "Zero telemetry and private local execution",
    ],
    technologyStack: ["React", "Vite", "FastAPI", "Python", "yt-dlp", "FFmpeg"],
    thumbnailUrl: "/portfolio/placeholders/youtube-downloader-preview.svg",
    galleryImages: ["/portfolio/placeholders/youtube-downloader-preview.svg"],
    isFeatured: true,
  },
  {
    id: "proj-wedding",
    slug: "wedding-invitation-website",
    title: "Wedding Invitation Website",
    category: "Creative Web Development",
    projectStatus: "Completed",
    shortDescription:
      "A professionally designed digital wedding invitation website combining creative presentation and interactive web experiences.",
    overview:
      "An experiential, bespoke wedding invitation website crafted to deliver an unforgettable digital experience for guests. Combines elegant editorial typography, smooth parallax motion, interactive event timelines, venue maps, and digital RSVP management.",
    problem:
      "Traditional paper invitations offer zero interactivity, lack dynamic updates (such as live weather, itinerary changes, and venue directions), and create logistical friction for RSVP tallying.",
    solution:
      "We engineered an intimate, high-aesthetic web experience with personalized guest invitations, automated RSVP collection into a private database, and embedded Google Maps integration.",
    features: [
      "Personalized digital invitations with custom attendee welcome",
      "Interactive multi-day event itinerary and schedule",
      "Embedded venue navigation with Google Maps API",
      "Digital RSVP submission with dietary preference capture",
      "Story timeline with curated photo galleries",
    ],
    technologyStack: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    thumbnailUrl: "/portfolio/placeholders/wedding-invitation-preview.svg",
    galleryImages: ["/portfolio/placeholders/wedding-invitation-preview.svg"],
    isFeatured: true,
  },
  {
    id: "proj-madrasa",
    slug: "madrasa-management-system",
    title: "Madrasa Management System",
    category: "Education Management Software",
    projectStatus: "In Development",
    shortDescription:
      "A management system designed to support the administrative and operational needs of Madrasa institutions.",
    overview:
      "A comprehensive educational administration platform currently under active development. Engineered to centralize student enrollment records, daily attendance tracking, academic curriculum scheduling, fee management ledgers, and parent communication channels.",
    problem:
      "Educational institutions frequently manage vital student records and recurring monthly fee ledgers using physical registers or unbacked paper files, leading to bookkeeping discrepancies and lost administrative hours.",
    solution:
      "A scalable Next.js and PostgreSQL management portal offering role-based access control (Administrators, Teachers, Staff), automated fee receipt generation, and real-time attendance logging.",
    features: [
      "Student registry with demographic and academic records",
      "Daily digital attendance logging by class and teacher",
      "Fee schedule ledger with automated due-date notifications",
      "Role-based authorization and administrative audit trails",
      "Comprehensive data export and report generation",
    ],
    technologyStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    thumbnailUrl: "/portfolio/placeholders/madrasa-management-preview.svg",
    galleryImages: ["/portfolio/placeholders/madrasa-management-preview.svg"],
    isFeatured: true,
  },
  {
    id: "proj-1",
    slug: "apex-erp-operations-platform",
    title: "ApexERP — Enterprise Operations System",
    category: "Software & ERP",
    projectStatus: "Completed",
    shortDescription:
      "A modular enterprise resource planning platform engineered for manufacturing inventory and logistics management.",
    overview:
      "ApexERP was designed to unify fragmented spreadsheets and legacy desktop software into a cohesive, cloud-based platform. The system handles inventory lifecycle tracking, role-based requisition workflows, and real-time vendor management across multiple warehouse locations.",
    problem:
      "The client experienced recurring inventory discrepancies, delayed procurement approvals, and poor visibility into inter-warehouse stock movements, resulting in operational bottlenecks.",
    solution:
      "AIVSTACK architected an end-to-end ERP with granular permission matrices, automated low-stock triggers, barcode scanning support, and real-time analytical dashboards.",
    features: [
      "Multi-warehouse inventory reconciliation",
      "Tiered managerial approval workflows",
      "Audit logging and automated compliance exports",
      "Dynamic PDF quotation and invoice generator",
      "Interactive analytics with predictive restocking forecasts",
    ],
    technologyStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Redis"],
    thumbnailUrl: "/brand/design_reference.jpg",
    galleryImages: ["/brand/design_reference.jpg"],
    clientName: "Industrial Apex Logistics",
    completionDate: "October 2025",
    isFeatured: true,
  },
  {
    id: "proj-2",
    slug: "lumina-ai-support-agent",
    title: "Lumina — Intelligent Enterprise Support Agent",
    category: "AI & Automation",
    projectStatus: "Completed",
    shortDescription:
      "Context-aware conversational AI assistant integrated with internal knowledge bases for automated tier-1 customer inquiries.",
    overview:
      "Lumina delivers sub-second automated support resolutions by retrieving verified internal documentation through vector search. It securely handles order status inquiries, onboarding tutorials, and troubleshooting diagnostics with seamless human escalation.",
    problem:
      "Support teams were overwhelmed by repetitive tier-1 tickets during peak product releases, inflating average response times to over 4 hours.",
    solution:
      "We engineered a custom RAG (Retrieval-Augmented Generation) pipeline connected to their documentation, integrated with customer ticketing webhooks.",
    features: [
      "Sub-second vector retrieval with hybrid keyword ranking",
      "Automated human agent handoff with conversation summary",
      "Granular analytics on unanswered user intents",
      "Zero training-retention enterprise privacy compliance",
    ],
    technologyStack: ["Python", "FastAPI", "OpenAI & Gemini API", "Pinecone", "Next.js", "Tailwind CSS"],
    thumbnailUrl: "/brand/design_reference.jpg",
    galleryImages: ["/brand/design_reference.jpg"],
    clientName: "Lumina Cloud Technologies",
    completionDate: "January 2026",
    isFeatured: true,
  },
  {
    id: "proj-3",
    slug: "novapay-fintech-mobile-app",
    title: "NovaPay — Cross-Platform Digital Wallet",
    category: "Mobile Applications",
    projectStatus: "In Development",
    shortDescription:
      "A Flutter-based consumer fintech application supporting secure peer-to-peer micro-transactions, split bills, and merchant payments.",
    overview:
      "NovaPay delivers a friction-free payment experience designed for mobile users. Currently undergoing security auditing, the application features biometric authentication, localized banking integrations, and instantaneous bill splitting.",
    problem:
      "Consumer payment interfaces often suffer from cluttered user experiences, slow authentication handshakes, and unintuitive transaction tracking.",
    solution:
      "AIVSTACK developed a minimalist, highly responsive Flutter mobile application with micro-interactions and end-to-end tokenized transaction security.",
    features: [
      "Biometric login (Face ID & Fingerprint) with fallback PIN",
      "Instant P2P transfers via QR and contact sync",
      "Multi-party split bill calculator with automated payment links",
      "Offline transaction history caching",
    ],
    technologyStack: ["Flutter", "Dart", "Node.js", "PostgreSQL", "Stripe API", "Docker"],
    thumbnailUrl: "/brand/design_reference.jpg",
    galleryImages: ["/brand/design_reference.jpg"],
    clientName: "NovaPay Financial",
    completionDate: "Target: Q2 2026",
    isFeatured: true,
  },
  {
    id: "proj-4",
    slug: "aurora-luxury-architects-portal",
    title: "Aurora — Contemporary Architectural Showcase",
    category: "Web Development",
    projectStatus: "Completed",
    shortDescription:
      "A minimalist, editorial web experience engineered for an international architecture studio to showcase landmark residential and commercial projects.",
    overview:
      "Aurora combines full-bleed architectural photography with smooth page transitions, interactive blueprints, and an integrated client consultation booking engine.",
    problem:
      "The firm's existing web presence was sluggish, failed to represent their high-end design caliber, and did not accommodate mobile tablets used in client presentations.",
    solution:
      "We built a bespoke web portfolio with optimized progressive image loading, customized typography hierarchies, and seamless enquiry funnels.",
    features: [
      "Interactive project floorplan explorer",
      "Fluid page transitions with zero cumulative layout shift",
      "Automated image compression and WebP/AVIF delivery",
      "Integrated consultation scheduling system",
    ],
    technologyStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Cloudflare Pages"],
    thumbnailUrl: "/brand/design_reference.jpg",
    galleryImages: ["/brand/design_reference.jpg"],
    clientName: "Aurora Studio",
    completionDate: "August 2025",
    isFeatured: true,
  },
  {
    id: "proj-5",
    slug: "synapse-automated-workflow-engine",
    title: "Synapse — Multi-Channel Data Orchestrator",
    category: "AI & Automation",
    projectStatus: "In Development",
    shortDescription:
      "An automated workflow engine that connects marketing leads from multi-ad platforms directly to CRM, slack alerts, and financial ledgers.",
    overview:
      "Synapse eliminates manual copy-pasting of leads and invoice data across fragmented SaaS tools, reducing data sync delays from hours to seconds.",
    problem:
      "Sales reps spent over 10 hours a week manually re-keying lead details from landing pages and social campaigns into disparate internal databases.",
    solution:
      "A custom Python & Node.js orchestration engine featuring webhook listeners, schema deduplication, and automated notifications.",
    features: [
      "Real-time webhook ingestion with automated retry queue",
      "Intelligent lead deduplication and CRM field enrichment",
      "Instant Slack and WhatsApp notification alerts for sales reps",
    ],
    technologyStack: ["Python", "Node.js", "Redis", "BullMQ", "PostgreSQL", "Next.js"],
    thumbnailUrl: "/brand/design_reference.jpg",
    galleryImages: ["/brand/design_reference.jpg"],
    clientName: "Internal AIVSTACK Product",
    completionDate: "Target: Q1 2026",
    isFeatured: false,
  },
  {
    id: "proj-6",
    slug: "hyperdrive-motion-brand-system",
    title: "Hyperdrive — Dynamic Motion & Identity System",
    category: "Creative Design",
    projectStatus: "Completed",
    shortDescription:
      "A comprehensive visual branding suite including logo design, vector guidelines, 3D animated identity reveals, and marketing collateral.",
    overview:
      "Created for an emerging tech venture studio, this branding project established a cohesive, futuristic aesthetic reflecting speed, agility, and precision.",
    problem:
      "The client lacked a cohesive identity across social media, pitch decks, and digital products, creating confusion among venture investors.",
    solution:
      "We engineered a complete visual system spanning custom typography, 3D motion assets, color palettes, and branded presentation templates.",
    features: [
      "Vector master logo lockups in dark and light modes",
      "3D motion bumper and animated logo reveal",
      "Complete 48-page brand guidelines documentation",
      "Social media design kit with 20+ responsive templates",
    ],
    technologyStack: ["Adobe Illustrator", "After Effects", "Cinema 4D", "Figma"],
    thumbnailUrl: "/brand/design_reference.jpg",
    galleryImages: ["/brand/design_reference.jpg"],
    clientName: "Hyperdrive Labs",
    completionDate: "November 2025",
    isFeatured: false,
  },
  {
    id: "proj-7",
    slug: "genesis-ai-cinematic-reel",
    title: "Genesis — AI-Assisted Brand Storytelling",
    category: "Video Production",
    projectStatus: "Concept / Prototype",
    shortDescription:
      "An experimental commercial concept film exploring human vision and synthetic intelligence through generative visual synthesis.",
    overview:
      "An exploration of emerging generative video workflows combined with cinematic color grading and bespoke sound design.",
    problem:
      "Traditional commercial production for high-concept sci-fi visual campaigns requires prohibitive multi-million-dollar CGI budgets.",
    solution:
      "AIVSTACK prototyped a hybrid production pipeline uniting generative video diffusion models, camera tracking, and sound mastering.",
    features: [
      "Generative visual synthesis with strict stylistic consistency",
      "Cinematic color grading and 4K mastering",
      "Bespoke sound design and voice narration",
    ],
    technologyStack: ["Premiere Pro", "DaVinci Resolve", "Runway Gen-3", "Midjourney", "Ableton Live"],
    thumbnailUrl: "/brand/design_reference.jpg",
    galleryImages: ["/brand/design_reference.jpg"],
    clientName: "AIVSTACK R&D Studio",
    completionDate: "Concept 2026",
    isFeatured: false,
  },
];
