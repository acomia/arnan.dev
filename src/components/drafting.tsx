import type { ReactNode } from "react";
import { formatMonth } from "@/content";

/**
 * Drawing primitives.
 *
 * Every mark here is one a real construction document uses, and each carries
 * information: bubbles address the grid, section marks cut through to another
 * sheet, dimension lines measure a real span. Nothing is drawn for texture.
 */

/** A grid bubble: the drawing's own addressing system, made visible. */
export function GridBubble({ label }: { label: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-grid h-6 w-6 place-items-center rounded-full border border-line-hair font-[family-name:var(--font-mono)] text-[0.625rem] text-line-soft"
    >
      {label}
    </span>
  );
}

/**
 * A section mark. On a drawing it names a cut and the sheet the cut is drawn
 * on; here it is the navigation, and clicking it cuts through to that sheet.
 */
export function SectionMark({
  mark,
  sheet,
  active = false,
  className = "",
}: {
  mark: string;
  sheet: string;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors duration-200 ${
        active
          ? "border-revision bg-revision text-sheet"
          : "border-line-soft text-line-soft"
      } ${className}`}
    >
      <span className="font-[family-name:var(--font-mono)] text-[0.625rem] leading-none">
        {mark}
      </span>
      <span className="sr-only">{sheet}</span>
    </span>
  );
}

/**
 * A vertical dimension: extension ticks at both ends, arrowheads, and a line
 * whose length is proportional to the months it measures.
 */
export function DimensionLine({
  label,
}: {
  /** The span this dimension measures, set along the line as a drawing sets it. */
  label: string;
}) {
  return (
    <div className="relative h-full w-full">
      <svg
        aria-hidden="true"
        className="h-full w-full text-line-soft"
        preserveAspectRatio="none"
        viewBox="0 0 40 100"
      >
        <g
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          fill="none"
        >
          <line x1="8" y1="0.5" x2="32" y2="0.5" />
          <line x1="8" y1="99.5" x2="32" y2="99.5" />
          <line data-draw x1="20" y1="0.5" x2="20" y2="99.5" />
        </g>
        <g fill="currentColor">
          <polygon points="20,3 17,10 23,10" />
          <polygon points="20,97 17,90 23,90" />
        </g>
      </svg>
      {/*
        Set as HTML rather than SVG text: the drawing is stretched with
        preserveAspectRatio="none" to measure a real span, which would distort
        any lettering inside it.
      */}
      <span
        className="dim-string absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-sheet px-1 py-2 [writing-mode:vertical-rl]"
        data-numeric
      >
        {label}
      </span>
    </div>
  );
}

/** The sheet's own identification, set in its corner as a drawing sets it. */
export function SheetRule({ sheet, title }: { sheet: string; title: string }) {
  return (
    <div className="pb-3">
      <div className="flex items-baseline gap-4">
        <h2 className="lettering text-[clamp(1.375rem,3.2vw,2rem)] font-700 leading-none text-line">
          {title}
        </h2>
        <span className="dim-string ml-auto shrink-0" data-numeric>
          {sheet}
        </span>
      </div>
      {/* The heaviest rule on the sheet, drawn so the ink reaches it too. */}
      <svg
        aria-hidden="true"
        className="mt-3 block h-[3px] w-full text-line"
        viewBox="0 0 1000 3"
        preserveAspectRatio="none"
      >
        <line
          data-draw
          x1="0"
          y1="1.5"
          x2="1000"
          y2="1.5"
          stroke="currentColor"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

/** A sheet: one addressed drawing in the set. */
export function Sheet({
  id,
  sheet,
  title,
  scope,
  children,
}: {
  id: string;
  sheet: string;
  title: string;
  /** The sheet's scope note: one line saying what this drawing covers. */
  scope: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 py-24 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <SheetRule sheet={sheet} title={title} />
        <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-[1.6] text-line-body">
          {scope}
        </p>
        {children}
      </div>
    </section>
  );
}

/**
 * A period, with an open end marked in revision red — the one colour in the
 * palette that means "this is the live revision" on a drawing.
 */
export function Period({
  start,
  end,
  className = "",
}: {
  start: string;
  end: string | null;
  className?: string;
}) {
  return (
    <span className={className}>
      {formatMonth(start)} –{" "}
      {end ? (
        formatMonth(end)
      ) : (
        <span className="text-revision">Present</span>
      )}
    </span>
  );
}
