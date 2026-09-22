import type { Profile } from "./types";

export const profile: Profile = {
  name: "Arnan Comia",
  title: "Frontend Developer",
  tagline:
    "Mobile and web apps that work well and are easy for the next developer " +
    "to pick up.",
  summary:
    "I build mobile and web apps that work well and are easy for other " +
    "developers to pick up. These days I'm working on a React Native app for " +
    "the Japanese hospitality market, covering everything from payments and " +
    "ID verification to secure login and localization. I pick things up fast, " +
    "enjoy mentoring teammates, and try to keep solutions practical rather " +
    "than overengineered.",
  about:
    "Twelve years, with one through-line: take a product that has to work " +
    "for real people and make it hold together across every surface it ships " +
    "on. That started at Intellicare, maintaining a Visual FoxPro application " +
    "while pushing React and React Native into internal systems, and it runs " +
    "through real-time fleet tracking at i-Cube to the Kabin suite, where a " +
    "guest checking into a hotel in Kyoto gets the same result from the app, " +
    "the website or the kiosk in the lobby.",
  location: "General Trias, Cavite, Philippines",
  email: "arnancomia.trey@gmail.com",
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
