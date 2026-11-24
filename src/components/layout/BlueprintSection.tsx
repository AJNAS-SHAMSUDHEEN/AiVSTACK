"use client";

import React, { ReactNode } from "react";

interface BlueprintSectionProps {
  id?: string;
  eyebrow?: string;
  index?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  hasTopRule?: boolean;
}

export function BlueprintSection({
  id,
  eyebrow,
  index,
  children,
  className = "",
  innerClassName = "",
  hasTopRule = true,
}: BlueprintSectionProps) {
  return (
    <section id={id} data-choreo="true" className={`relative ${className}`}>
      {/* Top Hairline Drawing Rule */}
      {hasTopRule && (
        <span
          aria-hidden="true"
          data-draw-rule="true"
          className="absolute inset-x-0 top-0 h-px origin-left bg-[var(--line)]"
        />
      )}

      {/* Centered Structural Column with Border Lines */}
      <div className={`relative mx-auto max-w-[1280px] border-x border-[var(--line)] ${innerClassName}`}>
        {/* Corner Registration Crosshair Ticks (+) */}
        <span aria-hidden="true" data-draw-tick="true" className="tick -top-[5px] -left-[5px]" />
        <span aria-hidden="true" data-draw-tick="true" className="tick -top-[5px] -right-[5px]" />
        <span aria-hidden="true" data-draw-tick="true" className="tick -bottom-[5px] -left-[5px]" />
        <span aria-hidden="true" data-draw-tick="true" className="tick -bottom-[5px] -right-[5px]" />

        {/* Optional Eyebrow HUD Header */}
        {(eyebrow || index) && (
          <div data-draw-eyebrow="true" className="flex items-center justify-between border-b border-[var(--line)] px-6 py-3 sm:px-8">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span className="hud-label text-[var(--accent-ink)]">{eyebrow}</span>
            </div>
            {index && <span className="hud-label text-[var(--faint)]">{index}</span>}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
