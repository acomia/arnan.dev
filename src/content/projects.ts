import type { Project } from "./types";

/**
 * Work, grouped by the surface it shipped on.
 *
 * The Kabin suite is split into the surfaces it actually is — a React Native
 * guest app, a Next.js site, and an operations console — rather than listed as
 * one entry, because they are separate products sharing a domain model.
 *
 * Every `stack` entry is verified: from the source repositories where they are
 * available locally, and from the resume otherwise. Nothing is inferred from
 * what a project of this kind "probably" used.
 *
 * No metrics appear anywhere. Arnan has no figures he can stand behind, so
 * these describe scope and technical decisions instead of inventing numbers.
 */
export const projects: Project[] = [
  {
    slug: "kabin",
    name: "Kabin",
    organization: "Wayfarer Group",
    platform: "mobile",
    surface: "Mobile app",
    role: "Frontend Developer",
    start: "2024-02",
    end: null,
    summary:
      "The guest app for a hotel group in Kyoto, Osaka and Tokyo: book a " +
      "stay, invite the people travelling with you, and complete check-in — " +
      "including the passport scan Japanese law requires — before arriving.",
    stack: [
      "React Native",
      "TypeScript",
      "AWS Amplify",
      "Amazon Cognito",
      "Stripe",
      "Stripe Identity",
      "MobX",
      "i18next",
      "Sentry",
      "Mixpanel",
      "EAS",
    ],
    highlights: [
      "In-app payments through Stripe, including Apple Pay and Google Pay.",
      "Government ID verification through Stripe Identity, so guests clear the legal requirement before they arrive.",
      "Secure authentication on AWS Amplify and Cognito, with biometric unlock and encrypted on-device storage.",
      "Full EN/JP localization, since guests and hotel staff use the same flows in different languages.",
      "Releases shipped through EAS CI/CD, with Sentry and Mixpanel for crash and behaviour monitoring.",
    ],
    featured: true,
    lead: true,
    gallery: [
      {
        src: "/work/kabin-home.webp",
        caption: "Home",
        alt: "Kabin home screen: the guest's upcoming stay in Las Vegas, a pre check-in action, and extras to order before arrival.",
        width: 800,
        height: 1707,
      },
      {
        src: "/work/kabin-reservations.webp",
        caption: "Reservation",
        alt: "Kabin reservation summary: dates, crew, rooms and total for a Kyoto stay, with a pre check-in action.",
        width: 800,
        height: 1783,
      },
      {
        src: "/work/kabin-checkin.webp",
        caption: "Identity check",
        alt: "Kabin identity verification step: scan your passport, with camera capture or upload.",
        width: 800,
        height: 1783,
      },
    ],
  },
  {
    slug: "renta",
    name: "Renta",
    organization: "Personal project",
    platform: "mobile",
    role: "Sole developer",
    start: "2026-07",
    end: null,
    summary:
      "A gown and costume rental app: customers browse and reserve, while " +
      "the shop manages inventory, bookings, payments and returns. Built " +
      "end to end, from database schema to design system.",
    stack: [
      "React Native",
      "Expo",
      "Expo Router",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "NativeWind",
      "TanStack Query",
      "MMKV",
      "PayMongo",
      "Zod",
    ],
    highlights: [
      "Sole ownership of every layer: Postgres schema and row-level security, authentication, storage, edge functions and UI.",
      "Payments wired through PayMongo, chosen for Philippine payment methods that Stripe does not cover.",
      "Typed end to end, with Zod schemas validating at the boundaries and TanStack Query owning server state.",
    ],
    featured: true,
    gallery: [
      {
        src: "/work/renta-home.webp",
        caption: "Home",
        alt: "Renta home screen: a featured gown carousel, quick actions, and the customer's upcoming booking.",
        width: 800,
        height: 1739,
      },
      {
        src: "/work/renta-browse.webp",
        caption: "Browse",
        alt: "Renta browse screen: search, a featured collection, and category filters for gowns, Filipiniana, barong and costumes.",
        width: 800,
        height: 1739,
      },
      {
        src: "/work/renta-bookings.webp",
        caption: "Bookings",
        alt: "Renta bookings screen: a confirmed rental with its fitting and pickup dates on a progress track.",
        width: 800,
        height: 1739,
      },
    ],
  },
  {
    slug: "vemasys",
    name: "Vemasys",
    organization: "i-Cube Digital Solutions",
    platform: "mobile",
    role: "Mobile Developer, React Native",
    start: "2022-03",
    end: "2023-12",
    summary:
      "A fleet management app for inland shipping crews: track the vessel, " +
      "plan and log voyages, and record fuel and engine readings from the " +
      "wheelhouse rather than a desk.",
    stack: ["React Native", "REST APIs", "Maps"],
    highlights: [
      "Diagnosed and fixed memory leaks and rendering stalls in a data-dense mobile app.",
      "Reviewed code and mentored teammates, and worked closely with QA through each release.",
      "Took part in sprint planning, stand-ups and retrospectives.",
    ],
    featured: true,
    gallery: [
      {
        src: "/work/vemasys-map.webp",
        caption: "Map",
        alt: "Vemasys map view: a vessel's position and next planned berth on a live chart.",
        width: 800,
        height: 1731,
      },
      {
        src: "/work/vemasys-planning.webp",
        caption: "Planning",
        alt: "Vemasys planning view: scheduled berths with tonnage, cargo and unloading actions.",
        width: 800,
        height: 1731,
      },
      {
        src: "/work/vemasys-technical.webp",
        caption: "Technical",
        alt: "Vemasys technical view: gasoil tank levels and bunkering records for the vessel.",
        width: 800,
        height: 1731,
      },
    ],
  },
  {
    slug: "onelsgh-nexus",
    name: "OneLSGH Nexus",
    organization: "Serino Systems",
    platform: "mobile",
    role: "React Native Developer",
    start: "2021-06",
    end: "2022-03",
    summary:
      "A school app giving La Salle Green Hills parents their children's " +
      "attendance, grades and school communications in one place.",
    stack: ["React Native", "Redux", "REST APIs"],
    highlights: [
      "Built cross-platform screens from UI through API integration.",
      "Implemented Redux for state shared across the app.",
    ],
    featured: true,
    gallery: [
      {
        src: "/work/onelsgh-nexus.webp",
        caption: "Student dashboard",
        alt: "OneLSGH Nexus: a student dashboard showing attendance percentage, school days, lates, absences and general average.",
        width: 800,
        height: 1422,
      },
    ],
  },
  {
    slug: "kabin-web",
    name: "Kabin Web",
    organization: "Wayfarer Group",
    platform: "web",
    surface: "Web",
    role: "Frontend Developer",
    start: "2024-02",
    end: null,
    summary:
      "The public site and booking funnel for the same hotel group, sharing " +
      "the app's domain model and carrying the same online check-in in the " +
      "browser for guests who never install anything.",
    stack: [
      "Next.js",
      "TypeScript",
      "next-intl",
      "TanStack Query",
      "Stripe",
      "AWS Amplify",
      "GSAP",
      "Playwright",
    ],
    highlights: [
      "Bilingual EN/JP throughout, with currency switching, on the same content the app consumes.",
      "Direct booking funnel and browser-based online check-in for guests who never install the app.",
      "End-to-end coverage with Playwright over the booking path.",
    ],
    featured: true,
    gallery: [
      {
        src: "/work/kabin-web.webp",
        caption: "Home",
        alt: "Kabin Web home: a direct-booking banner, bilingual currency and language switcher, and an online check-in entry point over a Kyoto property.",
        width: 1200,
        height: 750,
      },
      {
        src: "/work/kabin-web-stay.webp",
        caption: "Property & rooms",
        alt: "A Kabin Web property page: the stay's photo gallery and booking panel, with room types showing occupancy, size, and member versus non-member rates.",
        width: 1800,
        height: 758,
      },
    ],
  },
  {
    slug: "materia",
    name: "Materia",
    organization: "Wayfarer Group",
    platform: "web",
    surface: "Ops console",
    role: "Frontend Developer",
    start: "2024-02",
    end: null,
    summary:
      "The operations console hotel staff actually run the property from: " +
      "reservations, pre check-in status, housekeeping, door locks, tasks " +
      "and guest chat.",
    stack: [
      "Next.js",
      "TypeScript",
      "Ant Design",
      "MobX",
      "TanStack Query",
      "next-intl",
    ],
    highlights: [
      "Reservation board showing room, party, status and pre check-in progress at a glance.",
      "Operational surfaces for housekeeping, inventory, door locks and tasks in one console.",
      "Guest chat built into the same workspace staff already work in.",
    ],
    featured: true,
    gallery: [
      {
        src: "/work/materia-reservations.webp",
        caption: "Reservations board",
        alt: "Materia reservations board: upcoming stays as cards with room, guest count, status and pre check-in progress, beside a sidebar for housekeeping, door locks, tasks and chat.",
        width: 1100,
        height: 640,
      },
      {
        src: "/work/materia-detail.webp",
        caption: "Reservation detail",
        alt: "A single Materia reservation: dates, room, party, payment status, channel and bill, with the guest record and the rooms to be issued codes. Guest contact fields are redacted.",
        width: 1100,
        height: 634,
      },
    ],
  },
  {
    slug: "intellicare-apps",
    name: "Intellicare Agora & Dr. Aruga",
    organization: "Intellicare",
    platform: "mobile",
    role: "Sr. Software Engineer",
    start: "2014-09",
    end: "2021-06",
    summary:
      "Healthcare marketplace apps connecting plan members with accredited " +
      "physicians.",
    stack: ["React", "React Native"],
    highlights: [
      "Pioneered React and React Native adoption for internal systems.",
    ],
    featured: false,
  },
  {
    slug: "kabin-pad",
    name: "Kabin Pad",
    organization: "Wayfarer Group",
    platform: "mobile",
    surface: "Kiosk",
    role: "Frontend Developer",
    start: "2024-02",
    end: null,
    summary:
      "The in-lobby kiosk running the same check-in on hotel hardware, with " +
      "document capture and on-screen signature.",
    stack: ["React Native", "TypeScript", "Vision Camera", "Stripe Identity"],
    highlights: [
      "Shares the guest app's domain model on fixed lobby hardware.",
    ],
    featured: true,
    gallery: [
      {
        src: "/work/kabinpad-welcome.webp",
        caption: "Lobby welcome",
        alt: "The Kabin Pad kiosk welcome screen: check-in and check-out times, a QR code to install the app, and the property's wifi details.",
        width: 1100,
        height: 687,
      },
      {
        src: "/work/kabinpad-find.webp",
        caption: "Find reservation",
        alt: "The kiosk check-in step: scan a QR code or enter a reservation number or last name to find the booking.",
        width: 1100,
        height: 687,
      },
    ],
  },
];

/** Work with a full write-up and imagery, in display order. */
export const featuredProjects: Project[] = projects.filter((p) => p.featured);

/** The client whose products are drawn as one suite. */
const SUITE_ORG = "Wayfarer Group";

/**
 * The four surfaces of the Kabin suite, in the same order the cover's key
 * drawing sets them out: mobile app, web, kiosk, ops console.
 */
const SUITE_ORDER = ["Mobile app", "Web", "Kiosk", "Ops console"];

export const suiteProjects: Project[] = projects
  .filter((p) => p.featured && p.organization === SUITE_ORG)
  .sort(
    (a, b) =>
      SUITE_ORDER.indexOf(a.surface ?? "") - SUITE_ORDER.indexOf(b.surface ?? ""),
  );

/** Featured work that is not part of the suite. */
export const otherProjects: Project[] = projects.filter(
  (p) => p.featured && p.organization !== SUITE_ORG,
);

/** Look up a project by its URL segment. */
export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
