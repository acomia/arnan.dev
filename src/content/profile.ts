import type { Profile } from "./types";

export const profile: Profile = {
  name: "Arnan Comia",
  title: "Frontend Developer",
  summary:
    "I build mobile and web apps that work well and are easy for other " +
    "developers to pick up. These days I'm working on a React Native app for " +
    "the Japanese hospitality market, covering everything from payments and " +
    "ID verification to secure login and localization. I pick things up fast, " +
    "enjoy mentoring teammates, and try to keep solutions practical rather " +
    "than overengineered.",
  location: "General Trias, Cavite, Philippines",
  email: "arnancomia.dev@gmail.com",
  careerStart: "2014-09",
  reactFocusStart: "2020-01",
  links: [
    { label: "GitHub", href: "https://github.com/acomia" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/arnan-comia" },
  ],
  // Deliberately absent: the phone number on the resume. A phone number on an
  // indexed page invites recruiter spam and worse, and it can't be unpublished
  // once it has been scraped.
};
