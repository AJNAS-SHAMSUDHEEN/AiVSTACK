"use client";

import { Sparkles } from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  iconBg: string;
  iconColor: string;
  svg: React.ReactNode;
}

const ROW_ONE: TechItem[] = [
  {
    name: "Next.js",
    category: "Framework",
    iconBg: "bg-black",
    iconColor: "text-white",
    svg: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 180 180">
        <mask height="180" id="mask0" maskUnits="userSpaceOnUse" width="180" x="0" y="0">
          <circle cx="90" cy="90" fill="white" r="90" />
        </mask>
        <g mask="url(#mask0)">
          <circle cx="90" cy="90" fill="black" r="90" />
          <path d="M149.508 157.508L69.141 54H54V125.97H66.1136V69.3831L139.999 164.845C143.333 162.614 146.509 160.163 149.508 157.508Z" fill="white" />
          <rect fill="white" height="72" width="12" x="115" y="54" />
        </g>
      </svg>
    ),
  },
  {
    name: "React",
    category: "UI",
    iconBg: "bg-[#222222]",
    iconColor: "text-[#61DAFB]",
    svg: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" fill="none" stroke="#61DAFB" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" fill="none" stroke="#61DAFB" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" fill="none" stroke="#61DAFB" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    category: "Language",
    iconBg: "bg-[#3178C6]",
    iconColor: "text-white",
    svg: (
      <span className="text-[11px] font-black tracking-tighter leading-none">TS</span>
    ),
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    iconBg: "bg-[#0B1120]",
    iconColor: "text-[#38BDF8]",
    svg: (
      <svg className="h-4 w-4 fill-[#38BDF8]" viewBox="0 0 24 24">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
      </svg>
    ),
  },
  {
    name: "Python",
    category: "Backend",
    iconBg: "bg-[#1E293B]",
    iconColor: "text-[#38BDF8]",
    svg: (
      <span className="text-[12px] font-extrabold text-[#FACC15]">🐍</span>
    ),
  },
  {
    name: "Flutter",
    category: "Mobile",
    iconBg: "bg-[#02569B]",
    iconColor: "text-[#54C5F8]",
    svg: (
      <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
        <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zM6.005 15.698l6.004 6.004h7.37l-6.004-6.004H6.005z" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    category: "Database",
    iconBg: "bg-[#336791]",
    iconColor: "text-white",
    svg: (
      <span className="text-[11px] font-black">SQL</span>
    ),
  },
  {
    name: "Vercel",
    category: "Edge",
    iconBg: "bg-black",
    iconColor: "text-white",
    svg: (
      <svg className="h-3.5 w-3.5 fill-white" viewBox="0 0 24 24">
        <path d="M12 1L24 22H0L12 1Z" />
      </svg>
    ),
  },
  {
    name: "OpenAI",
    category: "AI",
    iconBg: "bg-[#10A37F]",
    iconColor: "text-white",
    svg: (
      <Sparkles className="h-3.5 w-3.5 text-white" />
    ),
  },
  {
    name: "Node.js",
    category: "Runtime",
    iconBg: "bg-[#22C55E]/20",
    iconColor: "text-[#22C55E]",
    svg: (
      <span className="text-[11px] font-extrabold text-[#4ADE80]">JS</span>
    ),
  },
  {
    name: "Figma",
    category: "Design",
    iconBg: "bg-[#1E1E1E]",
    iconColor: "text-white",
    svg: (
      <span className="text-[11px] font-bold text-[#F24E1E]">❖</span>
    ),
  },
  {
    name: "Docker",
    category: "DevOps",
    iconBg: "bg-[#2496ED]",
    iconColor: "text-white",
    svg: (
      <span className="text-[12px]">🐳</span>
    ),
  },
];

const ROW_TWO: TechItem[] = [
  {
    name: "JavaScript",
    category: "Language",
    iconBg: "bg-[#F7DF1E]",
    iconColor: "text-black",
    svg: (
      <span className="text-[11px] font-black text-black">JS</span>
    ),
  },
  {
    name: "Git",
    category: "VCS",
    iconBg: "bg-[#F05032]",
    iconColor: "text-white",
    svg: (
      <span className="text-[11px] font-black text-white">git</span>
    ),
  },
  {
    name: "FastAPI",
    category: "Backend",
    iconBg: "bg-[#009688]",
    iconColor: "text-white",
    svg: (
      <span className="text-[11px] font-black text-white">⚡</span>
    ),
  },
  {
    name: "Google Gemini",
    category: "AI",
    iconBg: "bg-gradient-to-tr from-[#6366F1] to-[#EC4899]",
    iconColor: "text-white",
    svg: (
      <Sparkles className="h-3.5 w-3.5 text-white" />
    ),
  },
  {
    name: "Redis",
    category: "Cache",
    iconBg: "bg-[#DC382D]",
    iconColor: "text-white",
    svg: (
      <span className="text-[10px] font-black text-white">RDS</span>
    ),
  },
  {
    name: "Android",
    category: "Mobile",
    iconBg: "bg-[#3DDC84]",
    iconColor: "text-white",
    svg: (
      <span className="text-[12px]">🤖</span>
    ),
  },
  {
    name: "GitHub",
    category: "DevOps",
    iconBg: "bg-[#24292F]",
    iconColor: "text-white",
    svg: (
      <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    category: "Backend",
    iconBg: "bg-[#1C1C1C]",
    iconColor: "text-[#3ECF8E]",
    svg: (
      <span className="text-[11px] font-black text-[#3ECF8E]">⚡</span>
    ),
  },
  {
    name: "Cloudflare",
    category: "CDN & Edge",
    iconBg: "bg-[#F38020]",
    iconColor: "text-white",
    svg: (
      <span className="text-[12px]">☁️</span>
    ),
  },
  {
    name: "Prisma",
    category: "ORM",
    iconBg: "bg-[#2D3748]",
    iconColor: "text-[#5A67D8]",
    svg: (
      <span className="text-[11px] font-black text-white">◬</span>
    ),
  },
  {
    name: "Adobe CC",
    category: "Motion & Media",
    iconBg: "bg-[#FF0000]",
    iconColor: "text-white",
    svg: (
      <span className="text-[10px] font-black text-white">CC</span>
    ),
  },
  {
    name: "Linux",
    category: "OS",
    iconBg: "bg-[#FCC624]",
    iconColor: "text-black",
    svg: (
      <span className="text-[12px]">🐧</span>
    ),
  },
];

export function TechCapabilities() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#0C081A] text-white overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-[#6D28D9]/20 via-[#A78BFA]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Giant Faint Watermark Text (Matching reference image) */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center pointer-events-none select-none -z-10">
        <span className="font-heading text-7xl sm:text-9xl md:text-[13rem] font-extrabold tracking-tight text-white/[0.03] uppercase">
          SKILLS
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section (Matching reference style) */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          {/* Active status pulse dot */}
          <div className="mx-auto mb-6 flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Our Technology Ecosystem
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Technologies we engineer with every day to build modern, fast, resilient, and scalable digital experiences.
          </p>
        </div>
      </div>

      {/* Full-width marquee rows with edge gradient masks */}
      <div className="relative w-full overflow-hidden space-y-4">
        {/* Left & Right gradient fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-[#0C081A] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-[#0C081A] to-transparent z-10" />

        {/* Row 1: Scrolling Left */}
        <div className="flex animate-marquee-left gap-3.5">
          {/* Duplicate set for seamless continuous infinite loop */}
          {[...ROW_ONE, ...ROW_ONE].map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#171228] border border-white/10 hover:border-[#A78BFA]/50 hover:bg-[#221B38] text-white transition-all duration-200 cursor-pointer shadow-sm group shrink-0"
            >
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor} shrink-0 transition-transform duration-200 group-hover:scale-110 shadow-xs`}
              >
                {item.svg}
              </div>
              <span className="text-sm font-semibold tracking-wide text-white/90 group-hover:text-white">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="flex animate-marquee-right gap-3.5">
          {/* Duplicate set for seamless continuous infinite loop */}
          {[...ROW_TWO, ...ROW_TWO].map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#171228] border border-white/10 hover:border-[#A78BFA]/50 hover:bg-[#221B38] text-white transition-all duration-200 cursor-pointer shadow-sm group shrink-0"
            >
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor} shrink-0 transition-transform duration-200 group-hover:scale-110 shadow-xs`}
              >
                {item.svg}
              </div>
              <span className="text-sm font-semibold tracking-wide text-white/90 group-hover:text-white">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
