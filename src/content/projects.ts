import type { Project } from "./types";

/**
 * Featured projects get a case study page at `/work/<slug>`; the rest appear
 * as a short list.
 *
 * Every `stack` entry below is verified — from the source repositories where
 * they are available locally, and from the resume otherwise. Nothing here is
 * inferred from what a project of this kind "probably" used.
 *
 * No metrics appear anywhere. Arnan has no figures he can stand behind, so
 * these describe scope and technical decisions instead of inventing numbers.
 */
export const projects: Project[] = [
  {
    slug: "kabin",
    name: "Kabin",
    organization: "Wayfarer Group",
    role: "Frontend Developer",
    start: "2024-02",
    end: null,
    summary:
      "A self pre-check-in suite for hotels in Kyoto and Osaka, spanning a " +
      "guest mobile app, a public website, an in-lobby kiosk and an internal " +
      "operations console.",
    // Verified against the Kabin, kabin-web, kabin-pad and materia packages.
    stack: [
      "React Native",
      "TypeScript",
      "Next.js",
      "AWS Amplify",
      "Amazon Cognito",
      "Stripe",
      "Stripe Identity",
      "MobX",
      "TanStack Query",
      "i18next",
      "next-intl",
      "Sentry",
      "Mixpanel",
      "EAS",
    ],
    highlights: [
      "Four surfaces sharing one domain model: a React Native guest app, a Next.js site, a kiosk app and an operations console.",
      "In-app payments through Stripe, including Apple Pay and Google Pay.",
      "Government ID verification through Stripe Identity, so guests can complete check-in before arriving.",
      "Secure authentication on AWS Amplify and Cognito, with biometric unlock and encrypted on-device storage.",
      "Full EN/JP localization, since guests and hotel staff use the same flows in different languages.",
      "Releases shipped through EAS CI/CD, with Sentry and Mixpanel for crash and behaviour monitoring.",
    ],
    featured: true,
  },
  {
    slug: "vemasys",
    name: "Vemasys",
    organization: "i-Cube Digital Solutions",
    role: "Mobile Developer, React Native",
    start: "2022-03",
    end: "2023-12",
    summary:
      "A fleet management app for real-time vessel tracking and voyage " +
      "planning, used by crews working from the water rather than a desk.",
    // From the resume only — the source is not available locally. Do not add
    // to this list without confirming with Arnan.
    stack: ["React Native", "REST APIs"],
    highlights: [
      "Diagnosed and fixed memory leaks and rendering stalls in a data-dense mobile app.",
      "Reviewed code and mentored teammates, and worked closely with QA through each release.",
      "Took part in sprint planning, stand-ups and retrospectives.",
    ],
    featured: true,
  },
  {
    slug: "renta",
    name: "Renta",
    organization: "Personal project",
    role: "Sole developer",
    start: "2026-07",
    end: null,
    summary:
      "A gown and costume rental app: customers browse and reserve, while " +
      "the shop manages inventory, bookings, payments and returns. Built " +
      "end to end, from database schema to design system.",
    // Verified against the project's package.json and README.
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
      "React Hook Form",
      "Zod",
    ],
    highlights: [
      "Sole ownership of every layer: Postgres schema and row-level security, authentication, storage, edge functions and UI.",
      "Payments wired through PayMongo, chosen for Philippine payment methods that Stripe does not cover.",
      "Typed end to end, with Zod schemas validating at the boundaries and TanStack Query owning server state.",
    ],
    featured: true,
  },
  {
    slug: "onelsgh-nexus",
    name: "OneLSGH Nexus",
    organization: "Serino Systems",
    role: "React Native Developer",
    start: "2021-06",
    end: "2022-03",
    summary:
      "A school management app giving La Salle Green Hills parents access to " +
      "their children's records and school communications.",
    stack: ["React Native", "Redux", "REST APIs"],
    highlights: [
      "Built cross-platform screens from UI through API integration.",
      "Implemented Redux for state shared across the app.",
    ],
    featured: false,
  },
  {
    slug: "intellicare-apps",
    name: "Intellicare Agora & Dr. Aruga",
    organization: "Intellicare",
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
];

/** Projects with a full case study page, in display order. */
export const featuredProjects: Project[] = projects.filter((p) => p.featured);

/** Look up a project by its URL segment. */
export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
