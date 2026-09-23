import { ContactLink } from "./contact-link";
import { DimensionLine, GridBubble, Period, Sheet } from "./drafting";
import { SurfacePlan } from "./surface-plan";
import { COVER_SHEET } from "./sheet-index";
import {
  awards,
  education,
  formatMonth,
  monthsBetween,
  profile,
  projects,
  suiteProjects,
  otherProjects,
  roles,
  skillGroups,
  yearsSince,
  type Project,
  type ProjectImage,
} from "@/content";

const ENCODED_EMAIL = Buffer.from(profile.email).toString("base64");

const actionClass =
  "inline-flex min-h-11 items-center border-[length:var(--lw-med)] border-line px-6 py-3 lettering text-[0.8125rem] font-600 text-line transition-colors duration-200 hover:bg-line hover:text-sheet focus-visible:bg-line focus-visible:text-sheet";

const ghostActionClass =
  "inline-flex min-h-11 items-center border border-line-hair px-6 py-3 lettering text-[0.8125rem] font-600 text-line transition-colors duration-200 hover:border-line focus-visible:border-line";

const linkClass =
  "inline-flex min-h-11 items-center text-[0.9375rem] text-line-soft underline decoration-line-hair transition-colors duration-200 hover:text-line hover:decoration-revision";

function Annotated({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line-hair pt-2.5">
      <dt className="annotation">{label}</dt>
      <dd className="mt-1.5 text-[0.9375rem] leading-snug text-line">{children}</dd>
    </div>
  );
}

export function Cover() {
  const years = yearsSince(profile.careerStart);
  const reactYears = yearsSince(profile.reactFocusStart);

  return (
    <div id="top" className="scroll-mt-28 pt-[var(--title-block-h)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-1.5 border-b border-line-hair py-3">
          {["1", "2", "3", "4"].map((b) => (
            <GridBubble key={b} label={b} />
          ))}
        </div>

        <div className="pt-14 sm:pt-20 lg:pt-24">
          <h1 className="lettering text-[clamp(2.75rem,10vw,6.5rem)] font-700 leading-[0.92] text-line">
            {profile.name}
          </h1>

          {/*
            The title is the line that says what he does, so it reads as a deck
            rather than a caption: full ink, set on the sheet's heaviest rule.
          */}
          <p className="lettering mt-5 border-t-[length:var(--lw-heavy)] border-line pt-3 text-[clamp(0.9375rem,1.7vw,1.375rem)] font-600 leading-snug tracking-[0.07em] text-line">
            {profile.title} — React Native, React &amp; Next.js
          </p>

          <p className="mt-8 max-w-[24ch] text-[clamp(1.375rem,3.4vw,2.125rem)] leading-[1.25] text-line-body sm:max-w-[30ch]">
            {profile.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href="#projects" className={actionClass}>
              View work
            </a>
            <ContactLink
              encoded={ENCODED_EMAIL}
              fallbackHref={profile.links[1].href}
              label="Get in touch"
              className={ghostActionClass}
            />
            {/* Kept together so one link never orphans onto its own line. */}
            <span className="flex items-center gap-x-6">
              {profile.links.map((link) => (
                <a key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </a>
              ))}
            </span>
          </div>

          {/* The cover's data strip, as a title sheet carries one. */}
          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-6 border-t-[length:var(--lw-med)] border-line pt-5 sm:grid-cols-4 sm:gap-x-10">
            <Annotated label="Status">Open to remote roles</Annotated>
            <Annotated label="Experience">
              <span data-numeric>{years} yrs</span> software ·{" "}
              <span data-numeric>{reactYears}</span> React
            </Annotated>
            <Annotated label="Based">{profile.location}</Annotated>
            <Annotated label="Set">{COVER_SHEET}–A-900</Annotated>
          </dl>
        </div>

        <SurfacePlan />
      </div>
    </div>
  );
}

/**
 * A project's captures, hung as plates.
 *
 * Orientation sets the grid — phone captures run three to a row, console and
 * kiosk captures two — and anything wider than 2:1 takes the full sheet rather
 * than being squeezed into a column it cannot be read in. Each plate carries
 * its number and name, the way a drawing set labels one.
 */
function Plates({ images }: { images: ProjectImage[] }) {
  const tall = images[0].height > images[0].width;

  return (
    <ul
      className={`mb-9 grid gap-x-4 gap-y-6 sm:gap-x-5 lg:gap-x-6 ${
        tall ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"
      }`}
    >
      {images.map((shot, i) => (
        <li
          key={shot.src}
          className={shot.width / shot.height > 2 ? "sm:col-span-full" : undefined}
        >
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              loading="lazy"
              className="block w-full border border-line-hair"
            />
            <figcaption className="mt-2.5 flex items-baseline gap-2.5">
              <span className="dim-string shrink-0 text-line-faint" data-numeric>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="annotation">{shot.caption}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

function ProjectEntry({
  project,
  index,
  lead = false,
  first = false,
}: {
  project: Project;
  index: number;
  /** The key drawing of the sheet: drawn larger, ruled heavier. */
  lead?: boolean;
  /** The group heading already rules above it, so it carries no rule of its own. */
  first?: boolean;
}) {
  return (
    <article
      className={
        first
          ? ""
          : lead
            ? "border-t-[length:var(--lw-heavy)] border-line pt-8"
            : "border-t border-line-hair pt-8"
      }
    >
      {project.gallery ? <Plates images={project.gallery} /> : null}

      <div>
        <div className="flex items-baseline gap-3">
          <span className="dim-string shrink-0" data-numeric>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className={
              lead
                ? "lettering text-[clamp(2rem,5vw,3.25rem)] font-700 leading-[0.95] text-line"
                : "lettering text-[1.25rem] font-700 leading-tight text-line"
            }
          >
            {project.name}
          </h3>
          {lead ? (
            <span className="annotation ml-auto flex shrink-0 items-center gap-2 text-revision">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-revision"
              />
              Key drawing
            </span>
          ) : null}
        </div>
        <p className="annotation mt-2">
          {project.surface ? project.surface : project.organization} ·{" "}
          {project.role}
        </p>
        <Period
          start={project.start}
          end={project.end}
          className="dim-string mt-1 block"
        />

        <p
          className={
            lead
              ? "mt-5 max-w-[56ch] text-[clamp(1.0625rem,1.6vw,1.3125rem)] leading-[1.5] text-line-body"
              : "mt-4 max-w-[68ch] text-[1rem] leading-[1.6] text-line-body"
          }
        >
          {project.summary}
        </p>
      </div>
    </article>
  );
}

function ProjectGroup({
  title,
  note,
  items,
}: {
  title: string;
  /** One line saying what holds this group together. */
  note?: string;
  items: Project[];
}) {
  return (
    <div className="mt-16">
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b-[length:var(--lw-med)] border-line pb-2">
        <p className="annotation">{title}</p>
        {note ? <p className="dim-string">{note}</p> : null}
      </div>
      <div className="mt-10 space-y-16 lg:space-y-20">
        {items.map((project, i) => (
          <ProjectEntry
            key={project.slug}
            project={project}
            index={i}
            lead={project.lead}
            first={i === 0}
          />
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  const other = projects.filter((p) => !p.featured);

  return (
    <Sheet
      id="projects"
      sheet="A-300"
      title="Projects"
      scope="Products that shipped, grouped by the surface they run on."
    >
      <ProjectGroup
        title="Wayfarer Group — the Kabin suite"
        note="One shared domain model · four surfaces"
        items={suiteProjects}
      />
      <ProjectGroup title="Other work" items={otherProjects} />

      <div className="mt-14 border-t border-line-hair pt-6">
        <p className="annotation">Also shipped</p>
        <ul className="mt-4 space-y-3">
          {other.map((p) => (
            <li key={p.slug} className="max-w-[72ch] text-[0.9375rem] leading-snug">
              <span className="lettering text-[0.875rem] font-600 text-line">
                {p.name}
              </span>
              <span className="text-line-soft"> — {p.summary}</span>
            </li>
          ))}
        </ul>
      </div>
    </Sheet>
  );
}

/** A span written the way a dimension string is: years and months. */
function duration(months: number): string {
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  if (yrs === 0) return `${mos} MO`;
  if (mos === 0) return `${yrs} YR`;
  return `${yrs} YR ${mos} MO`;
}

export function Experience() {
  return (
    <Sheet
      id="experience"
      sheet="A-200"
      title="Experience"
      scope="Twelve years across five teams, dimensioned by how long each one actually ran."
    >
      <ol className="mt-10">
        {roles.map((role) => {
          const months = monthsBetween(role.start, role.end);
          const current = role.end === null;
          return (
            <li
              key={`${role.company}-${role.start}`}
              className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-x-7 lg:grid-cols-[4rem_minmax(0,1fr)_minmax(0,13rem)] lg:gap-x-10"
              style={{ minHeight: `${Math.min(months * 3.2 + 96, 420)}px` }}
            >
              <div className="pb-8">
                <DimensionLine label={duration(months)} />
              </div>

              <div className="min-w-0 pb-8">
                <h3 className="lettering text-[1.0625rem] font-700 leading-tight text-line">
                  {role.company}
                </h3>
                <p className="annotation mt-1.5">
                  {role.title} · {role.location}
                </p>
                <Period
                  start={role.start}
                  end={role.end}
                  className="dim-string mt-1 block"
                />
                <ul className="mt-4 space-y-2.5">
                  {role.highlights.map((h) => (
                    <li
                      key={h}
                      className="relative max-w-[68ch] pl-6 text-[0.9375rem] leading-[1.55] text-line-soft before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-3.5 before:bg-line-hair"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Keynotes: the right-hand field a sheet is drawn to fill. */}
              <div className="hidden pb-8 lg:block">
                <div className="border-l border-line-hair pl-5">
                  <p className="annotation">Span</p>
                  <p className="dim-string mt-1" data-numeric>
                    {duration(months)}
                  </p>
                  <p className="annotation mt-4">Engagement</p>
                  <p className="mt-1 text-[0.875rem] text-line-soft">
                    {role.location}
                  </p>
                  {current ? (
                    <p className="annotation mt-4 flex items-center gap-1.5 text-revision">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-revision"
                      />
                      Current revision
                    </p>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Sheet>
  );
}

export function About() {
  return (
    <Sheet
      id="about"
      sheet="A-100"
      title="About"
      scope="Twelve years of it, read as an arc rather than a pitch."
    >
      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-14">
        <div className="min-w-0">
          <figure className="float-right ml-6 mb-4 w-[104px] sm:ml-8 sm:w-[136px]">
            <div className="border-[length:var(--lw-med)] border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/portrait.webp"
                alt={profile.name}
                width={440}
                height={566}
                className="block aspect-[35/45] w-full object-cover"
              />
            </div>
            <figcaption className="annotation mt-2 text-[0.5625rem]">
              Issued photo
            </figcaption>
          </figure>
          <p className="max-w-[66ch] text-[1.0625rem] leading-[1.65] text-line-body">
            {profile.summary}
          </p>
          <p className="mt-5 max-w-[66ch] text-[1.0625rem] leading-[1.65] text-line-body">
            {profile.about}
          </p>
        </div>

        <div className="lg:border-l lg:border-line-hair lg:pl-6">
          <p className="annotation border-b border-line-hair pb-2">Education</p>
          <ul className="mt-4 space-y-4">
            {education.map((e) => (
              <li key={e.institution}>
                <p className="lettering text-[0.875rem] font-600 text-line">
                  {e.credential}
                </p>
                <p className="mt-1 text-[0.9375rem] text-line-soft">{e.institution}</p>
                <time dateTime={`${e.start}/${e.end}`} className="dim-string mt-1 block">
                  {e.start}–{e.end}
                </time>
              </li>
            ))}
          </ul>

          <p className="annotation mt-10 border-b border-line-hair pb-2">
            Recognition
          </p>
          <ul className="mt-4 space-y-4">
            {awards.map((a) => (
              <li key={a.title}>
                <p className="lettering text-[0.875rem] font-600 text-line">{a.title}</p>
                <p className="mt-1 text-[0.9375rem] text-line-soft">{a.organization}</p>
                <time dateTime={a.date} className="dim-string mt-1 block">
                  {formatMonth(a.date)}
                </time>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Sheet>
  );
}

export function Skills() {
  return (
    <Sheet
      id="skills"
      sheet="A-200"
      title="Skills"
      scope="A schedule of what the work is built with, marked and grouped the way a drawing set schedules its parts."
    >
      <div className="mt-12">
        {/* Column headings, as a schedule carries them. */}
        <div className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-5 border-b-[length:var(--lw-heavy)] border-line pb-2 sm:grid-cols-[4rem_minmax(0,13rem)_minmax(0,1fr)] sm:gap-x-8">
          <span className="annotation">Mark</span>
          <span className="annotation">Group</span>
          <span className="annotation hidden sm:block">Items</span>
        </div>

        <dl>
          {skillGroups.map((group, i) => (
            <div
              key={group.name}
              className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-5 border-b border-line-hair py-9 sm:grid-cols-[4rem_minmax(0,13rem)_minmax(0,1fr)] sm:gap-x-8"
            >
              <dt
                className="font-[family-name:var(--font-mono)] text-[1.5rem] leading-none text-line-faint"
                data-numeric
              >
                {String(i + 1).padStart(2, "0")}
              </dt>
              <dd className="lettering text-[clamp(1.125rem,2.4vw,1.75rem)] font-700 leading-[1.05] text-line">
                {group.name}
              </dd>
              <dd className="col-span-2 col-start-1 mt-6 sm:col-span-1 sm:col-start-3 sm:mt-0">
                <ul className="grid grid-cols-2 gap-x-7 gap-y-0 lg:grid-cols-3">
                  {group.skills.map((skill, n) => (
                    <li
                      key={skill}
                      className="flex items-baseline gap-2.5 border-b border-line-hair py-2"
                    >
                      <span
                        className="dim-string shrink-0 text-line-faint"
                        data-numeric
                      >
                        {i + 1}.{n + 1}
                      </span>
                      <span className="text-[0.9375rem] leading-snug text-line-body">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Sheet>
  );
}

export function Contact() {
  return (
    <Sheet
      id="contact"
      sheet="A-900"
      title="Contact"
      scope="Open to remote roles, mobile or web, permanent or contract."
    >
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-14">
        <div>
      <p className="max-w-[60ch] text-[1.0625rem] leading-[1.65] text-line-body">
        Mobile and web, permanent or contract. Email is the fastest way to reach
        me — I answer every message that describes the actual work.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
        <ContactLink
          encoded={ENCODED_EMAIL}
          fallbackHref={profile.links[1].href}
          label="Get in touch"
          revealAddress
          className={actionClass}
        />
        {profile.links.map((link) => (
          <a key={link.href} href={link.href} className={linkClass}>
            {link.label}
          </a>
        ))}
      </div>

      <noscript>
        <p className="mt-5 max-w-[60ch] text-[0.9375rem] text-line-soft">
          The address is assembled by script to keep it away from scrapers. With
          JavaScript off, the button routes to LinkedIn instead.
        </p>
      </noscript>

        </div>

        <dl className="grid grid-cols-2 gap-5 lg:grid-cols-1 lg:border-l lg:border-line-hair lg:pl-6">
          <Annotated label="Drawn by">{profile.name}</Annotated>
          <Annotated label="Status">Open to remote roles</Annotated>
          <Annotated label="Based">{profile.location}</Annotated>
          <Annotated label="Set">{COVER_SHEET}–A-900</Annotated>
        </dl>
      </div>
    </Sheet>
  );
}
