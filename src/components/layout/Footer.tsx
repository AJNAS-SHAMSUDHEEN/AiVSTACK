"use client";

import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ArrowUpRight, Mail, Phone, MapPin, Sparkles, ArrowUp } from "lucide-react";

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#0B0F14] text-white pt-16 sm:pt-20 pb-8 border-t border-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Columns (Matching Screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-gray-800/80">
          {/* Brand & Corporate Column */}
          <div className="lg:col-span-5 space-y-5">
            <Logo variant="horizontal" size="md" lightMode={true} />

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              AIVSTACK is an international technology and digital innovation studio. We engineer bespoke web applications,
              Flutter mobile systems, conversational AI models, and striking brand identities for modern enterprises.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 text-xs font-semibold uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-[#00A859] animate-pulse" />
                <span>INNOVATION • TECHNOLOGY • CREATIVITY</span>
              </span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Services */}
            <div>
              <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white mb-4">
                Services
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <Link href="/services/web-development" className="text-gray-400 hover:text-white transition-colors">
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link href="/services/software-app-development" className="text-gray-400 hover:text-white transition-colors">
                    Software & Apps
                  </Link>
                </li>
                <li>
                  <Link href="/services/ai-automation" className="text-gray-400 hover:text-white transition-colors">
                    AI & Automation
                  </Link>
                </li>
                <li>
                  <Link href="/services/graphic-design-branding" className="text-gray-400 hover:text-white transition-colors">
                    Graphic & Branding
                  </Link>
                </li>
                <li>
                  <Link href="/services/video-creative-production" className="text-gray-400 hover:text-white transition-colors">
                    Video Production
                  </Link>
                </li>
                <li>
                  <Link href="/services/digital-marketing" className="text-gray-400 hover:text-white transition-colors">
                    Digital Marketing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white mb-4">
                Company
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors">
                    Portfolio Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/process" className="text-gray-400 hover:text-white transition-colors">
                    5-Step Process
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/start-a-project" className="text-[#00A859] font-bold hover:underline inline-flex items-center gap-1">
                    <span>Get a Quote</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
                <li>
                  <Link href="/admin/login" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Staff Portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Direct Connect */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white mb-4">
                Direct Inquiries
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-400">
                <li className="flex items-start gap-2.5">
                  <Mail className="h-4 w-4 text-[#00A859] mt-0.5 shrink-0" />
                  <a href="mailto:hello@aivstack.com" className="hover:text-white transition-colors break-all">
                    hello@aivstack.com
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="h-4 w-4 text-[#00A859] mt-0.5 shrink-0" />
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    +91 98765 43210
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-[#00A859] mt-0.5 shrink-0" />
                  <span>India & Global Operations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Locations, Copyright & Socials (Matching Screenshot) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} AIVSTACK Technologies. All rights reserved.</span>
            <span className="hidden sm:inline text-gray-800">•</span>
            <span className="text-gray-400">Your Vision. Our Innovation.</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors" aria-label="X">
                <XIcon />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors" aria-label="GitHub">
                <GitHubIcon />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors" aria-label="Instagram">
                <InstagramIcon />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-all hover:scale-105"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}