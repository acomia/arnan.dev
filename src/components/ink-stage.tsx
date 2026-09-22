"use client";

import { useEffect, useRef } from "react";

/**
 * Linework inks itself once, as each drawing is first reached.
 *
 * The observer watches each SVG, not each line: IntersectionObserver is
 * unreliable on individual SVG geometry elements, and observing the drawing as
 * a whole also gives one orchestrated moment per figure rather than fifteen
 * scattered ones. Lines within a drawing stagger in their own document order.
 *
 * The undrawn from-state lives behind `data-ink="armed"`, set here and only
 * when motion is welcome — so with scripting off or reduced motion requested
 * the drawing is simply already inked. Nothing is ever hidden waiting for a
 * script that may not run.
 */
export function InkStage({ children }: { children: React.ReactNode }) {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = stage.current;
    if (!node) return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      return;
    }

    const drawings = Array.from(node.querySelectorAll<SVGSVGElement>("svg")).filter(
      (svg) => svg.querySelector("[data-draw]"),
    );
    if (drawings.length === 0) return;

    node.dataset.ink = "armed";

    // Each line draws at its own rate, measured from the path itself.
    for (const svg of drawings) {
      svg.querySelectorAll<SVGGeometryElement>("[data-draw]").forEach((line) => {
        const length = Math.max(1, Math.round(line.getTotalLength()));
        line.style.setProperty("--ink-length", String(length));
      });
    }

    const draw = (svg: SVGSVGElement) => {
      svg.querySelectorAll<SVGGeometryElement>("[data-draw]").forEach((line, i) => {
        line.style.setProperty("--ink-delay", `${i * 80}ms`);
        line.dataset.drawn = "true";
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          draw(entry.target as SVGSVGElement);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 },
    );

    drawings.forEach((svg) => observer.observe(svg));
    return () => observer.disconnect();
  }, []);

  return <div ref={stage}>{children}</div>;
}
