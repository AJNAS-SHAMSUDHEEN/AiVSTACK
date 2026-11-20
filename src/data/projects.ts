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
    flutterVersion?: string;
    dartVersion?: string;
    frameworkVersion?: string;
  };
  deploymentDetails?: {
    development: string;
    testing: string;
    distribution: string;
    usage?: string;
    playStore?: string;
    signing?: string;
    productionUrl?: string;
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
    slug: "community-fund-portal",
    title: "Community Fund Portal — Multi-Tier Civic Fundraising & Treasury Platform",
    category: "Fundraising / Web Application",
    projectStatus: "Completed",
    shortDescription:
      "A specialized, enterprise-grade civic fundraising, on-ground volunteer cash POS, and multi-tier double-entry treasury custody management platform.",
    overview:
      "A specialized, enterprise-grade civic fundraising and treasury management web application built for a prominent regional community foundation. The platform modernizes traditional, paper-based community land acquisition and infrastructure campaigns into a transparent, real-time, tamper-resistant digital ecosystem.\n\nIt handles community pledges, direct on-ground cash collections, automated official receipt issuance with high-resolution canvas/PDF rendering, and an advanced double-entry-style multi-tier treasury and custodian management ledger.",
    problem:
      "Traditional community fundraising campaigns (especially for high-value land acquisitions and community facility construction) face critical operational and governance bottlenecks:\n\n• Information Asymmetry & Mistrust: Donors who pledge money (Offers) or give physical cash to field volunteers have no real-time way to verify whether their money reached the committee or to view their cumulative contributions.\n• Disconnected Direct Cash Collections: Many donors give cash on the spot without registering a prior pledge. In standard systems, this causes orphaned cash records that never show up in the contributor's personal profile.\n• Multi-Tier Fund Distribution Dilemma: Funds are collected across multiple committee entities (Central Committee vs. Local Unit) and held in transit by different field volunteers (Custodians). Tracking who holds how much cash, who handed over to whom, and project expenses was historically prone to human error and ledger discrepancies.\n• Receipt Generation Delays: Generating official, branded, stamped receipts for hundreds of donors manually is slow, error-prone, and lacks instant digital distribution channels like WhatsApp.",
    solution:
      "AIVSTACK architected an end-to-end, mobile-first, real-time web platform engineered with Next.js 15 (App Router), TypeScript, and Google Cloud Firestore:\n\n• Public Contributor Portal: Phone-session-based donor portal with live campaign milestones, real-time progress bars, pledge status, and direct cash contribution history.\n• Volunteer & Admin Cash POS: Fast, responsive POS interface for on-ground volunteers to record cash receipts with offline-safe optimistic UI updates in under 5 seconds.\n• Enterprise Finance & Treasury Module: Complete custody tracking supporting Treasury-to-Custodian and Custodian-to-Custodian (A to B) handovers, expense tracking with categories, landowner milestone disbursements, and one-click PDF audit reporting.\n• Automated Visual Receipt Engine: Instant Canvas 2D engine that programmatically composites official receipt graphics, typography, numbers-to-words currency conversion in Indian numbering (₹ Lakhs/Crores), downloadable as crisp print-ready PDFs and JPGs.",
    features: [
      "Public Contributor Dashboard with dynamic pledge vs direct cash contribution tracking",
      "Sub-5-Second Volunteer Cash POS with real-time phone number auto-suggest",
      "Automatic sequential official receipt numbering (ER-No) and instant WhatsApp dispatch",
      "Multi-tier treasury ledger with entity fund segregation (Central vs. Local Unit)",
      "Custodian A-to-B handover system with mathematical conservation balance verification",
      "Expense categorization and landowner milestone disbursement management",
      "Automated client-side HTML5 Canvas 2D + jsPDF print-ready vector receipt generation",
      "Strict integer paise (amountPaise) storage to eliminate floating-point calculation drift",
      "Role-based governance with Super Admin controls and locked volunteer audit views",
      "Live reactive sync using Firestore onSnapshot across admin POS and public progress screens",
    ],
    technologyStack: [
      "Next.js 15",
      "TypeScript",
      "Google Cloud Firestore",
      "HTML5 Canvas 2D",
      "jsPDF",
      "Tailwind CSS",
      "Lucide React",
    ],
    thumbnailUrl: "/portfolio/community-fund/01_administrative_dashboard.jpg",
    galleryImages: [
      "/portfolio/community-fund/01_administrative_dashboard.jpg",
      "/portfolio/community-fund/02_finance_management.jpg",
    ],
    clientName: "Civic Non-Profit & Community Trust (Confidential Client)",
    completionDate: "November 2026",
    isFeatured: true,
    qaMetrics: {
      testSuites: 12,
      testsPassed: 96,
      testsFailed: 0,
      analyzeStatus: "TypeScript Strict (0 Errors)",
      frameworkVersion: "Next.js 15 • Cloud Firestore",
    },
    deploymentDetails: {
      development: "Completed",
      testing: "Verified in production environment",
      distribution: "Production Web Deployment",
      usage: "Live community fundraising and treasury audit operations",
      playStore: "Web App (PWA Responsive)",
      signing: "SSL/TLS 256-bit encryption",
    },
  },
  {
    id: "proj-yt-downloader",
    slug: "youtube-downloader",
    title: "High-Performance YouTube Media Processing Platform & PWA",
    category: "Web Utility Application",
    projectStatus: "Completed",
    shortDescription:
      "An asynchronous media extraction platform and PWA pairing React 19 with a non-blocking FastAPI backend, tiered FFmpeg remuxing, and headless cipher runtimes.",
    overview:
      "YouTube Downloader (v2.0) is an open-source, full-stack media extraction platform engineered for high reliability, zero-cloud-cost hosting, and seamless cross-platform user experience. The application pairs a React 19 + Vite Progressive Web App (PWA) with a FastAPI + FFmpeg + Python 3.12 asynchronous media processing backend.\n\nUnlike naive scrapers or ad-riddled web converters, this platform solves core distributed systems and media processing problems: preventing asynchronous event loop starvation during intensive I/O, implementing a tiered lossless FFmpeg remuxing pipeline, executing real-time download telemetry without heavy message brokers, defeating strict client-side bot/cipher challenges via headless JS runtimes, and enforcing strict ephemeral lifecycle cleanup under constrained hardware environments (512MB RAM).",
    problem:
      "Building a scalable, production-grade video downloader presents unique challenges that break typical web applications:\n\n• Event Loop Starvation: Media extraction libraries (yt-dlp) and transcoding tools (FFmpeg) perform blocking CPU and network I/O. Executing them naively inside an async def handler freezes the single-threaded asynchronous event loop, dropping all health probes and incoming client requests.\n• Resource Exhaustion on Free Tiers: Transcoding 1080p video can easily consume multiple gigabytes of memory and 100% CPU. Running on budget/free cloud tiers (e.g., Render’s 512MB RAM limit) requires strict concurrency bounding and intelligent codec handling to prevent OOMKilled crashes.\n• YouTube's Evolving Anti-Bot Defenses: YouTube continuously deploys obfuscated JavaScript challenge scripts (n-sig, player ciphers) and IP rate limits against datacenter IPs.\n• Disk Leaks: Heavy concurrent video downloads generate gigabytes of temporary data. If clients disconnect midway or downloads fail, disk storage fills rapidly, causing catastrophic server failure.\n• Slow User Feedback: Standard HTTP downloads remain silent until the entire file finishes processing, leading users to abandon the page.",
    solution:
      "AIVSTACK architected an enterprise-grade async processing pipeline uniting React 19, FastAPI, Docker, and multi-runtime execution:\n\n• Hybrid Async/Threadpool Architecture: Offloaded synchronous yt-dlp extractions to loop.run_in_executor() with an asyncio.Semaphore(MAX_CONCURRENT_DOWNLOADS=2) concurrency guard, keeping the main loop 100% responsive for health checks.\n• Tiered Lossless Remuxing Ladder: Implemented a 3-tier escalating fallback engine. Level 1 performs instant ~1s container remuxing (ffmpeg -c copy), Level 2 copies video frames and transcodes only AAC audio in ~2s, and Level 3 falls back to libx264 ultrafast re-encoding only when necessary, slashing 90%+ processing latency.\n• Real-Time In-Memory Telemetry: Built custom yt-dlp progress hooks updating a thread-safe task cache guarded by threading.Lock. The React PWA polls at 300ms intervals, rendering live megabytes, download speed (e.g., 4.2MiB/s), and ETAs without Redis or WebSockets.\n• Multi-Runtime Docker Container: Bundled Debian Slim with Node.js and Deno binary runtimes to evaluate YouTube's obfuscated n-sig cipher challenges alongside rotating player clients (android, ios, mweb, web).\n• Dual-Layer Zero-Leak Ephemeral Storage: Attached synchronous BackgroundTask cleanup to Starlette FileResponse upon completion, combined with an autonomous asynchronous background janitor daemon pruning sessions older than 10 minutes.",
    features: [
      "React 19 + Vite Progressive Web App (PWA) with Workbox offline caching and standalone installability",
      "Non-blocking FastAPI backend offloading CPU-intensive tasks via run_in_executor",
      "Concurrency bounded by asyncio.Semaphore to guarantee stable execution within 512MB RAM",
      "Tiered FFmpeg remuxing ladder (Level 1 Stream Copy in ~1s vs Level 3 libx264 fallback)",
      "Live download telemetry (0% to 100%) with instantaneous throughput (MiB/s) and ETA timers",
      "Instant YouTube oEmbed metadata inspection (video thumbnail, title, author) on URL paste",
      "Headless Node.js & Deno binary runtime containerization to solve dynamic n-sig cipher challenges",
      "Dual-layer ephemeral storage cleanup (FileResponse hook + 10-minute automated janitor daemon)",
      "RFC 5987 compliant UTF-8 filename delivery preserving international characters and emojis",
      "Strict security hardening: SSRF domain whitelist, regex path sanitization, and 500MB size limits",
    ],
    technologyStack: [
      "React 19",
      "Vite 8",
      "FastAPI",
      "Python 3.12",
      "yt-dlp",
      "FFmpeg & FFprobe",
      "Docker",
      "Deno & Node.js",
      "Workbox PWA",
    ],
    thumbnailUrl: "/portfolio/youtube-downloader/01_pwa_interface.png",
    galleryImages: ["/portfolio/youtube-downloader/01_pwa_interface.png"],
    clientName: "Open-Source Production Utility & Direct Users",
    completionDate: "October 2026",
    isFeatured: true,
    qaMetrics: {
      testSuites: 8,
      testsPassed: 64,
      testsFailed: 0,
      analyzeStatus: "Mypy Strict & Pytest Passed (0 Errors)",
      frameworkVersion: "FastAPI (Python 3.12) • React 19",
    },
    deploymentDetails: {
      development: "Completed",
      testing: "Completed (8 Test Suites, 64 Passed Tests)",
      distribution: "Cloud Container Web Service + Edge PWA",
      usage: "Active cross-platform media extraction utility",
      playStore: "PWA (Desktop & Mobile Installable)",
      signing: "HTTPS / TLS 1.3 Certified",
    },
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
