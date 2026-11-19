"use client";

export function TechLogos() {
  const TECHS = [
    { name: "Next.js 16", tag: "App Router" },
    { name: "TypeScript", tag: "Strict Types" },
    { name: "Flutter", tag: "Native Engine" },
    { name: "Dart", tag: "SDK 3.13" },
    { name: "Python", tag: "FastAPI / AI" },
    { name: "PostgreSQL", tag: "ACID Relational" },
    { name: "SQLite", tag: "Embedded DB" },
    { name: "Tailwind CSS", tag: "Design Tokens" },
    { name: "Framer Motion", tag: "Fluid Physics" },
    { name: "Docker", tag: "Containers" },
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-6">
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400">
          ENTERPRISE ARCHITECTURE & BATTLE-TESTED TECHNOLOGIES
        </span>
      </div>

      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee-left flex items-center gap-12 sm:gap-16">
          {[...TECHS, ...TECHS].map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity cursor-default shrink-0"
            >
              <span className="font-heading font-black text-lg sm:text-xl text-gray-800 tracking-tight">
                {tech.name}
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 font-semibold">
                {tech.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}