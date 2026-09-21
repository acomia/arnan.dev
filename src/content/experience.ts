import type { Role } from "./types";

/** Newest first. The timeline renders them in this order. */
export const roles: Role[] = [
  {
    company: "Wayfarer",
    title: "Frontend Developer (Freelance)",
    location: "Remote",
    start: "2026-07",
    end: null,
    highlights: [
      "Continue building and maintaining Kabin, a React Native self pre-check-in app for hotels in Kyoto and Osaka, now as an independent freelancer.",
      "Manage in-app payments (Stripe, Apple Pay, Google Pay), ID verification, and secure authentication on AWS Amplify.",
      "Handle releases through EAS CI/CD and monitor app health with Mixpanel and Sentry.",
    ],
  },
  {
    company: "Zigzag Careers",
    title: "Frontend Developer",
    location: "Remote",
    start: "2024-02",
    end: "2026-06",
    highlights: [
      "Built and maintained the Kabin product suite — mobile app, Kabin Web, Materia and Kabin Pad — for client Wayfarer Group.",
      "Integrated Stripe, Apple Pay, Google Pay and Stripe Identity for payments and guest ID verification.",
      "Implemented secure authentication on AWS Amplify and Cognito, biometric login, and EN/JP localization via i18next.",
    ],
  },
  {
    company: "i-Cube Digital Solutions",
    title: "Mobile Developer, React Native",
    location: "Makati City",
    start: "2022-03",
    end: "2023-12",
    highlights: [
      "Optimized app performance by resolving memory leaks and rendering issues.",
      "Conducted code reviews and mentored teammates; worked closely with QA on releases.",
      "Contributed to sprint planning, stand-ups and retrospectives.",
    ],
  },
  {
    company: "Serino Systems",
    title: "React Native Developer",
    location: "Makati City",
    start: "2021-06",
    end: "2022-03",
    highlights: [
      "Built and maintained cross-platform mobile apps in React Native, from UI through API integration.",
      "Implemented Redux for state management across the app.",
    ],
  },
  {
    company: "Intellicare",
    title: "Sr. Software Engineer",
    location: "Makati City",
    start: "2014-09",
    end: "2021-06",
    highlights: [
      "Pioneered React and React Native adoption for internal systems.",
      "Maintained a Visual FoxPro application for an internal client.",
    ],
  },
];
