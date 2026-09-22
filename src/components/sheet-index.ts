/** The set's contents. Sheet numbers are the addressing system, not decoration. */
export const COVER_SHEET = "A-001";

export const SHEETS = [
  { id: "about", mark: "A", sheet: "A-100", label: "About" },
  { id: "skills", mark: "B", sheet: "A-200", label: "Skills" },
  { id: "projects", mark: "C", sheet: "A-300", label: "Projects" },
  { id: "experience", mark: "D", sheet: "A-400", label: "Experience" },
  { id: "contact", mark: "E", sheet: "A-900", label: "Contact" },
] as const;

export type SheetId = (typeof SHEETS)[number]["id"];
