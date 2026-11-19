import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Sparkles, Target, Compass, HeartHandshake, ShieldCheck, Cpu } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "About Us | AIVSTACK — Digital Solutions Partner",
  description:
    "Learn about AIVSTACK's mission, values, and engineering approach. We transform ideas into meaningful digital experiences through technology, creativity and innovation.",
};

export default function AboutPage() {
  const VALUES = [
    {
      icon: Cpu,
      title: "Technological Excellence",
      description:
        "We build solutions using modern, stable, typed technologies that guarantee security, high performance, and future scalability.",
    },
    {
      icon: Target,
      title: "Purpose-Driven Execution",
      description:
        "Every line of code and design element serves a direct functional or strategic objective for your organization.",
    },
    {
      icon: HeartHandshake,
      title: "Client-Centric Collaboration",
      description:
        "We view every client engagement as a long-term partnership, providing transparent communication, honest advice, and dependable support.",
    },
    {
      icon: ShieldCheck,
      title: "Integrity & Reliability",
      description:
        "We provide transparent scoping, realistic timelines, and honest project progress tracking. We never over-promise or cut corners.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFF]">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-18 md:pb-24 border-b border-[#A78BFA]/15 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-[#24202D] tracking-tight leading-tight">
                Architecting The Future of{" "}
                <span className="bg-gradient-to-r from-[#30224D] via-[#6D28D9] to-[#A78BFA] bg-clip-text text-transparent">
                  Digital Solutions.
                </span>
              </h1>
              <p className="mt-6 text-lg text-[#706B7D] leading-relaxed">
                AIVSTACK is a digital solutions and technology partner providing software engineering,
                bespoke web applications, artificial intelligence automation, and creative media services
                to businesses, institutions, startups, and visionary individuals.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 bg-[#FAFAFF]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission Card */}
              <div className="rounded-3xl border border-[#A78BFA]/20 bg-white p-8 sm:p-10 shadow-xs">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2EEFF] text-[#7C3AED] mb-6">
                  <Target className="h-6 w-6" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-[#30224D]">Our Mission</h2>
                <p className="mt-4 text-[#706B7D] text-base leading-relaxed">
                  To transform ideas into meaningful, resilient digital experiences through technology,
                  creativity, and innovation. We empower our clients by solving complex operational
                  challenges and crafting digital products that command attention and drive measurable growth.
                </p>
              </div>

              {/* Vision Card */}
              <div className="rounded-3xl border border-[#A78BFA]/20 bg-white p-8 sm:p-10 shadow-xs">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2EEFF] text-[#7C3AED] mb-6">
                  <Compass className="h-6 w-6" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-[#30224D]">Our Vision</h2>
                <p className="mt-4 text-[#706B7D] text-base leading-relaxed">
                  To be recognized internationally as a benchmark of engineering precision, aesthetic
                  refinement, and trustworthy digital execution—where technical rigor meets creative
                  originality to elevate what businesses can achieve online.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Principles & Values */}
        <section className="py-20 bg-white border-y border-[#A78BFA]/15">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED]">
                Foundational Principles
              </span>
              <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold text-[#24202D]">
                Our Core Values
              </h2>
              <p className="mt-3 text-base text-[#706B7D]">
                The guiding beliefs that shape every client interaction, line of code, and creative deliverable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {VALUES.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.title}
                    className="rounded-2xl border border-[#A78BFA]/20 bg-[#FAFAFF] p-7 transition-all duration-300 hover:border-[#A78BFA] hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F2EEFF] text-[#7C3AED] mb-5">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-[#24202D]">
                      {val.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-[#706B7D] leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-20 bg-[#FAFAFF]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-[#A78BFA]/20 bg-white p-8 sm:p-12 lg:p-16">
              <div className="max-w-3xl">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED]">
                  The Engineering Standard
                </span>
                <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold text-[#24202D]">
                  Our Commitment to Every Client
                </h2>
                <div className="mt-6 space-y-4 text-[#706B7D] leading-relaxed">
                  <p>
                    At AIVSTACK, we reject superficial shortcuts. A great digital product is not just a
                    visually appealing surface; it is an integrated ecosystem designed with fast loading
                    speeds, bulletproof security, clean data architecture, and intuitive user experiences.
                  </p>
                  <p>
                    Whether we are developing a high-converting corporate website, an internal ERP system,
                    an AI workflow, or a full branding suite, we work with open communication, documented
                    code, and dedicated post-launch support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
