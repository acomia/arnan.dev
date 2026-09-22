/**
 * Shapes for every piece of resume content on the site.
 *
 * Content lives in typed modules rather than inline in components, so adding a
 * role or a project is a data edit, not a layout edit.
 *
 * Dates are stored as `YYYY-MM` (or `YYYY` for education) and formatted for
 * display by the helpers in `./format`. Never store a pre-formatted date
 * string — it can't be sorted, and it drifts from the rest of the site.
 */

/** An external profile or contact link. */
export interface Link {
  label: string;
  href: string;
}

/** Everything about the person, used by the hero and the contact footer. */
export interface Profile {
  name: string;
  /** Job title, as it should read to a recruiter scanning the page. */
  title: string;
  /**
   * One line for the cover. Short enough to read in a glance, in his own
   * words — the full summary belongs on the About sheet, not the hero.
   */
  tagline: string;
  /** First-person positioning statement. Two or three sentences, no more. */
  summary: string;
  /**
   * A second reading for the About sheet: the same career from the arc rather
   * than the pitch. Assembled from facts already in `experience` and
   * `projects` — it must never introduce a claim those do not support.
   */
  about: string;
  location: string;
  /**
   * Public email. Rendered obfuscated by the contact component — never inline
   * this as a plain `mailto:` in markup.
   */
  email: string;
  /** `YYYY-MM` of the first professional software role, for computing tenure. */
  careerStart: string;
  /** `YYYY-MM` from which React became the primary focus. */
  reactFocusStart: string;
  links: Link[];
}

/** One named cluster of skills, e.g. "Mobile & Web". */
export interface SkillGroup {
  name: string;
  skills: string[];
}

/** A position held, rendered in the experience timeline. */
export interface Role {
  company: string;
  title: string;
  /** "Remote", or a city. */
  location: string;
  /** `YYYY-MM`. */
  start: string;
  /** `YYYY-MM`, or `null` for the current role. */
  end: string | null;
  /** What was done. Each entry stands alone as a sentence. */
  highlights: string[];
}

export interface EducationEntry {
  institution: string;
  credential: string;
  /** `YYYY`. */
  start: string;
  /** `YYYY`. */
  end: string;
}

export interface Award {
  title: string;
  organization: string;
  /** `YYYY-MM`. */
  date: string;
}

/**
 * A screenshot or mockup for a project.
 *
 * Optional by design: no imagery exists yet for Kabin or Renta, and capturing
 * it means running those apps locally. Layouts reserve the space now so images
 * drop in later as a content change rather than a redesign.
 */
export interface ProjectImage {
  src: string;
  /** Describe what the screen shows, not that it is a screenshot. */
  alt: string;
  /** Two or three words naming the plate, as a gallery labels one. */
  caption: string;
  width: number;
  height: number;
}

/** A piece of work, shown as a card and — when featured — a case study page. */
export interface Project {
  /** URL segment under `/work/`. */
  slug: string;
  name: string;
  /** Client, employer, or "Personal project". */
  organization: string;
  /** Which surface this one shipped on; the work sheet groups by it. */
  platform: "mobile" | "web";
  /**
   * For a product that is one surface of a larger suite: the surface's name,
   * matching the cover's key drawing so the two agree.
   */
  surface?: string;
  /** The role held on this specific project. */
  role: string;
  /** `YYYY-MM`. */
  start: string;
  /** `YYYY-MM`, or `null` if ongoing. */
  end: string | null;
  /** One or two sentences: what it is and who it is for. */
  summary: string;
  /** Technologies actually used. Never list something unverified. */
  stack: string[];
  highlights: string[];
  /** `true` gives the project a full case study page at `/work/<slug>`. */
  featured: boolean;
  /**
   * The one piece of work the sheet leads with. Drawn at key-drawing scale;
   * exactly one project should carry it.
   */
  lead?: boolean;
  image?: ProjectImage;
  /**
   * Real captures of the shipped product, in reading order. A project that
   * has these leads with them; one that does not leads with its drawing.
   */
  gallery?: ProjectImage[];
}
