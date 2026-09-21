import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    name: "Mobile & Web",
    skills: [
      "React Native",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux",
      "MobX",
    ],
  },
  {
    name: "Platforms & Services",
    skills: [
      "Stripe",
      "AWS Amplify",
      "Supabase",
      "REST APIs",
      "Sentry",
      "Mixpanel",
      "i18next",
    ],
  },
  {
    name: "Practice & Tooling",
    skills: [
      "Git",
      "CI/CD (EAS)",
      "Jest",
      "Agile / Scrum",
      "Code review",
      "Mentoring",
      // On the resume. Worth reconsidering: some reviewers read AI tools as a
      // baseline expectation rather than a skill. Arnan's call.
      "Claude",
      "ChatGPT",
    ],
  },
];
