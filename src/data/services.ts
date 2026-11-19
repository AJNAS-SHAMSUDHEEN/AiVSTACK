export interface ServiceCategory {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  tagline: string;
  iconName: string;
  subServices: string[];
  deliverables: string[];
  capabilities: string[];
  faqs: { question: string; answer: string }[];
}

export const SERVICES: ServiceCategory[] = [
  {
    id: "web-dev",
    slug: "web-development",
    title: "Web Development",
    tagline: "High-performance websites and bespoke digital platforms engineered for scale.",
    shortDescription:
      "From high-conversion landing pages to full-scale corporate web applications and custom platforms.",
    fullDescription:
      "We design and build bespoke web experiences that combine striking aesthetics with rigorous engineering. Every solution is custom-architected for maximum speed, security, search engine visibility, and seamless responsiveness across all screen sizes.",
    iconName: "Globe",
    subServices: [
      "Business Websites",
      "Corporate Websites",
      "Portfolio Websites",
      "Landing Pages",
      "E-commerce Websites",
      "Booking Websites",
      "Wedding Invitation Websites",
      "Custom Web Applications",
      "Fundraising Platforms",
    ],
    deliverables: [
      "Responsive, mobile-first frontend architecture",
      "Custom Content Management (CMS) integration",
      "Fast page load optimization and Core Web Vitals compliance",
      "Technical SEO foundation and structured schema markup",
      "Secure forms, database connections, and API integrations",
    ],
    capabilities: [
      "Next.js & React ecosystem",
      "TypeScript & Tailwind CSS",
      "Node.js & Serverless backends",
      "PostgreSQL, MongoDB, and Redis caching",
      "Cloudflare CDN & Edge deployment",
    ],
    faqs: [
      {
        question: "How long does a typical website development project take?",
        answer:
          "Landing pages and portfolio sites typically take 1 to 2 weeks. Corporate portals and custom web applications generally range from 3 to 6 weeks, depending on requirements and custom integrations.",
      },
      {
        question: "Will our website be mobile-friendly and optimized for Google?",
        answer:
          "Yes. Every website we build is 100% responsive across smartphones, tablets, and desktops, and includes semantic HTML, fast loading speeds, and on-page SEO best practices.",
      },
      {
        question: "Can we update content ourselves after launch?",
        answer:
          "Absolutely. We provide clean administration dashboards or CMS integrations so your team can easily update content, media, and blog posts without coding.",
      },
    ],
  },
  {
    id: "software-app",
    slug: "software-app-development",
    title: "Software & App Development",
    tagline: "Native and cross-platform mobile apps, enterprise ERPs, and custom software systems.",
    shortDescription:
      "End-to-end engineering of Android, Flutter apps, ERP systems, CRM platforms, and custom business tools.",
    fullDescription:
      "We build robust, scalable mobile and desktop software that streamlines operations, automates complex workflows, and provides intuitive user interfaces for businesses, educational institutions, and startups.",
    iconName: "Smartphone",
    subServices: [
      "Android Applications",
      "Flutter Applications",
      "Business Management Systems",
      "ERP Software",
      "CRM Systems",
      "Education Management Systems",
      "Custom Software Solutions",
      "Admin Dashboards",
    ],
    deliverables: [
      "Cross-platform Flutter or native Android codebase",
      "Scalable RESTful & GraphQL API architecture",
      "Role-Based Access Control (RBAC) & data encryption",
      "Offline sync and local caching mechanisms",
      "Automated CI/CD build pipelines and deployment setup",
    ],
    capabilities: [
      "Flutter & Dart",
      "Android SDK & Kotlin",
      "Node.js, Python & Go backends",
      "Relational databases & distributed caching",
      "Secure authentication & OAuth 2.0",
    ],
    faqs: [
      {
        question: "Can one codebase run on both Android and iOS?",
        answer:
          "Yes. Using Flutter, we build single-codebase applications that deliver near-native performance, unified design systems, and rapid feature parity across both platforms.",
      },
      {
        question: "Can you build custom ERP or CRM systems tailored to our specific business workflow?",
        answer:
          "Yes. We specialize in custom business management tools that map directly to your existing internal processes, avoiding the bloat and costly licensing of off-the-shelf software.",
      },
    ],
  },
  {
    id: "ai-automation",
    slug: "ai-automation",
    title: "AI & Automation",
    tagline: "Intelligent AI workflows, conversational bots, and automated process pipelines.",
    shortDescription:
      "Transforming business productivity through LLM integrations, custom chatbots, and automated workflows.",
    fullDescription:
      "We design and deploy practical artificial intelligence and automation solutions that eliminate repetitive manual labor, enhance customer support, and extract actionable intelligence from your organizational data.",
    iconName: "Bot",
    subServices: [
      "AI Chatbots",
      "Python Automation",
      "Workflow Automation",
      "AI Integrations",
      "AI-powered Applications",
      "Business Automation Solutions",
    ],
    deliverables: [
      "Custom-trained conversational AI agents & chatbots",
      "Automated multi-system data synchronization pipelines",
      "Natural language document parsing and extraction",
      "Integration with OpenAI, Google Gemini, and Anthropic APIs",
      "Task automation scripts and web scrapers",
    ],
    capabilities: [
      "Python, LangChain & LlamaIndex",
      "Google Gemini & OpenAI APIs",
      "Vector databases (Pinecone, pgvector)",
      "Automated cron jobs & message queues (Celery/BullMQ)",
      "Zapier, Make & custom webhook integrations",
    ],
    faqs: [
      {
        question: "How can AI chatbots help our business?",
        answer:
          "AI chatbots provide 24/7 client response, qualify incoming sales leads, answer common customer questions using your documentation, and automatically route complex queries to your team.",
      },
      {
        question: "Is our proprietary company data safe when integrating AI?",
        answer:
          "Yes. We implement enterprise-grade privacy standards, ensuring data passed to AI APIs is never used for external public training models.",
      },
    ],
  },
  {
    id: "graphic-design",
    slug: "graphic-design-branding",
    title: "Graphic Design & Branding",
    tagline: "Distinctive brand identities, logos, and high-impact visual design assets.",
    shortDescription:
      "Crafting memorable visual identities, comprehensive brand guidelines, marketing graphics, and digital media.",
    fullDescription:
      "Your visual identity is the first impression your audience receives. We craft cohesive, modern brand identities that stand out in crowded markets, reflecting confidence, authority, and professional craft.",
    iconName: "Palette",
    subServices: [
      "Logo Design",
      "Brand Identity",
      "Social Media Creatives",
      "Posters",
      "Banners",
      "Business Stationery",
      "Digital Advertisements",
    ],
    deliverables: [
      "Vector logo files (SVG, EPS, PNG, PDF) in multiple lockups",
      "Brand style guide (color palettes, typography rules, spacing)",
      "Social media post & story template sets",
      "Print-ready stationery (business cards, letterheads)",
      "High-resolution banner and display ad collateral",
    ],
    capabilities: [
      "Figma & Adobe Creative Suite (Illustrator, Photoshop)",
      "Vector typography & custom iconography",
      "Design systems & component libraries",
      "CMYK print preparation & bleed calibration",
    ],
    faqs: [
      {
        question: "What files do we receive with a completed logo project?",
        answer:
          "You receive all original vector master files (.AI, .EPS, .SVG) as well as high-resolution PNGs with transparent backgrounds, ready for both web and print production.",
      },
    ],
  },
  {
    id: "video-production",
    slug: "video-creative-production",
    title: "Video & Creative Production",
    tagline: "Dynamic motion graphics, corporate video editing, and AI-accelerated visual storytelling.",
    shortDescription:
      "Creating engaging video content, promotional reels, motion graphics, and corporate presentations.",
    fullDescription:
      "In a video-first world, high-caliber motion content commands immediate attention. We combine cinematic editing, motion typography, and emerging AI generative tools to craft compelling visual stories that convert viewers into loyal clients.",
    iconName: "Video",
    subServices: [
      "AI Video Creation",
      "Promotional Videos",
      "Corporate Videos",
      "Invitation Videos",
      "Social Media Videos",
      "Video Editing",
      "Motion Graphics",
    ],
    deliverables: [
      "4K & 1080p master video renders optimized for social platforms",
      "Custom kinetic typography and animated lower-thirds",
      "Professional audio mixing, sound design, and color grading",
      "Short-form vertical video cuts (Reels, TikTok, Shorts)",
      "Interactive digital event & wedding invitations",
    ],
    capabilities: [
      "Adobe Premiere Pro & After Effects",
      "DaVinci Resolve color workflows",
      "Generative AI video workflows",
      "Sound design & licensed audio mastering",
    ],
    faqs: [
      {
        question: "Do you create vertical videos for Instagram Reels and YouTube Shorts?",
        answer:
          "Yes. We format and optimize video creative specifically for 9:16 vertical mobile consumption, complete with engaging captions and dynamic pacing.",
      },
    ],
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing",
    tagline: "Strategic campaigns, social content systems, and creative digital advertising.",
    shortDescription:
      "Amplifying brand reach and generating qualified interest through targeted creative campaigns.",
    fullDescription:
      "Great products need targeted visibility. We help businesses build a credible digital footprint, structure persuasive advertising campaigns, and develop social content systems that attract and nurture qualified prospects.",
    iconName: "Megaphone",
    subServices: [
      "Social Media Content",
      "Digital Campaigns",
      "Brand Presence",
      "Creative Advertising",
      "Digital Content Solutions",
    ],
    deliverables: [
      "Monthly social media content calendars and design templates",
      "Targeted ad creative (visuals, copy, and call-to-actions)",
      "Landing page conversion rate optimization (CRO)",
      "Campaign analytics and performance reporting",
    ],
    capabilities: [
      "Meta Ads & Google Ads creative optimization",
      "Content strategy & copywriting",
      "Audience segmentation & funnels",
      "Performance tracking & UTM architecture",
    ],
    faqs: [
      {
        question: "How do you align marketing with technical development?",
        answer:
          "Because we build both the digital platforms and the marketing creative, your campaigns seamlessly align with fast-loading, high-converting landing pages.",
      },
    ],
  },
];
