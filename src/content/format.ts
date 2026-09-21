/**
 * Display helpers for the `YYYY-MM` dates stored across the content modules.
 *
 * These parse the string by hand rather than via `new Date("2026-07")`, which
 * JavaScript reads as UTC midnight and can render as the previous month for
 * anyone west of Greenwich.
 */

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function parse(yearMonth: string): { year: number; month: number } {
  const [year, month] = yearMonth.split("-");
  return { year: Number(year), month: Number(month) };
}

/** `"2026-07"` → `"Jul 2026"`. */
export function formatMonth(yearMonth: string): string {
  const { year, month } = parse(yearMonth);
  return `${MONTHS[month - 1]} ${year}`;
}

/** `("2022-03", "2023-12")` → `"Mar 2022 – Dec 2023"`; a null end reads "Present". */
export function formatPeriod(start: string, end: string | null): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : "Present"}`;
}

/** A machine-readable range for the `dateTime` attribute on `<time>`. */
export function machinePeriod(start: string, end: string | null): string {
  return end ? `${start}/${end}` : start;
}

/**
 * Whole years elapsed since `yearMonth`, as of `now`.
 *
 * Used so the site never advertises a stale "10+ years" — the figure grows on
 * its own. `now` is injectable so this stays testable.
 */
export function yearsSince(yearMonth: string, now: Date = new Date()): number {
  const { year, month } = parse(yearMonth);
  const elapsed =
    (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
  return Math.floor(elapsed / 12);
}
