"use client";

import { useEffect, useState } from "react";
import { ContactLink } from "./contact-link";
import { SectionMark } from "./drafting";
import { COVER_SHEET, SHEETS } from "./sheet-index";
import { profile } from "@/content";

/**
 * The title block: a drawing set's fixed identification strip, and this page's
 * navigation.
 *
 * Jumping to a sheet is a plain anchor, so it works with no JavaScript at all;
 * `scroll-behavior` and `scroll-padding-top` handle the travel and keep the
 * block from covering the sheet it lands on. Script adds only what markup
 * cannot express: which sheet is currently being read.
 *
 * The contact action lives here at every width, because it is the one control
 * that must never scroll away.
 */
export function TitleBlock({ encodedEmail }: { encodedEmail: string }) {
  const [current, setCurrent] = useState<string>(COVER_SHEET);

  useEffect(() => {
    const sections: { sheet: string; el: HTMLElement }[] = [];
    for (const entry of SHEETS) {
      const el = document.getElementById(entry.id);
      if (el) sections.push({ sheet: entry.sheet, el });
    }
    if (sections.length === 0) return;

    /*
     * Which sheet is being read is a question about scroll position, not about
     * how much of an element is visible: an IntersectionObserver comparing
     * ratios always favours the shortest section, so a tall sheet never wins
     * even when it fills the screen. This reads the position directly.
     */
    let frame = 0;
    const update = () => {
      frame = 0;
      /*
       * A jumped-to sheet lands about 192px down, below the block and its
       * scroll padding, so the detection line has to sit below that or the
       * sheet you just navigated to never registers as the one you are on.
       */
      const blockHeight =
        document.querySelector("[data-title-block]")?.clientHeight ?? 0;
      const line = Math.max(blockHeight + 24, window.innerHeight * 0.3);
      let active = COVER_SHEET;
      for (const { sheet, el } of sections) {
        if (el.getBoundingClientRect().top <= line) active = sheet;
      }

      /*
       * The last sheet is short enough that the page bottoms out before it
       * crosses the line, so it would never register. Reaching the end of the
       * document means you are on it.
       */
      const atEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atEnd) active = sections[sections.length - 1].sheet;

      setCurrent(active);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      data-title-block
      className="fixed inset-x-0 top-0 z-50 border-b-[length:var(--lw-heavy)] border-line bg-sheet"
    >
      <div className="mx-auto flex h-[var(--title-block-h)] max-w-6xl flex-col px-5 sm:flex-row sm:items-stretch sm:px-8 lg:px-12">
        {/* Identification. */}
        <div className="flex flex-1 items-center gap-3 border-b border-line-hair sm:flex-none sm:border-b-0 sm:border-r sm:pr-5">
          <a href="#top" className="flex min-h-11 flex-col justify-center">
            <span className="lettering text-[0.8125rem] font-700 leading-none text-line">
              {profile.name}
            </span>
            <span className="annotation mt-1 hidden text-[0.5625rem] sm:block">
              {profile.title}
            </span>
          </a>

          <span className="dim-string ml-auto shrink-0 sm:hidden" data-numeric>
            {current}
          </span>

          <ContactLink
            encoded={encodedEmail}
            fallbackHref={profile.links[1].href}
            label="Email"
            className="inline-flex min-h-11 shrink-0 items-center border border-line px-3 lettering text-[0.6875rem] font-600 text-line transition-colors duration-200 hover:bg-line hover:text-sheet focus-visible:bg-line focus-visible:text-sheet sm:hidden"
          />
        </div>

        <nav
          aria-label="Sheets"
          className="flex min-w-0 flex-1 items-center justify-between gap-0.5 sm:justify-start sm:gap-1 sm:pl-5"
        >
          {SHEETS.map((s) => {
            const active = current === s.sheet;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={active ? "true" : undefined}
                className="group flex min-h-11 items-center justify-center gap-2 px-1 sm:px-2"
              >
                <span className="hidden md:block">
                  <SectionMark mark={s.mark} sheet={s.sheet} active={active} />
                </span>
                <span
                  className={`annotation transition-colors duration-200 ${
                    active ? "text-line" : ""
                  }`}
                >
                  {s.label}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Status, current sheet and the contact action, from 640 up. */}
        <div className="hidden shrink-0 items-center gap-4 border-l border-line-hair pl-5 sm:flex">
          <span className="dim-string hidden md:inline" data-numeric aria-live="polite">
            Sheet {current}
          </span>
          <a
            href="/arnan-comia-cv.pdf"
            download
            className="hidden min-h-9 items-center border border-line-hair px-3 lettering text-[0.6875rem] font-600 text-line-soft transition-colors duration-200 hover:border-line hover:text-line focus-visible:border-line md:inline-flex"
          >
            CV
          </a>
          <ContactLink
            encoded={encodedEmail}
            fallbackHref={profile.links[1].href}
            label="Email"
            className="inline-flex min-h-9 items-center border border-line px-4 lettering text-[0.6875rem] font-600 text-line transition-colors duration-200 hover:bg-line hover:text-sheet focus-visible:bg-line focus-visible:text-sheet"
          />
        </div>
      </div>
    </header>
  );
}
