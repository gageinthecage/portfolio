// ============================================================
// SITE CONTENT — edit everything about the portfolio here.
// No component code needs to change when this file changes.
// ============================================================

export const site = {
  name: "Gage William Boyd",
  firstName: "Gage",
  school: "Northern Arizona University",
  // Rotating typewriter lines under the name (hero)
  taglines: [
    "Computer Science & Mathematics. Machine Learning Researcher. Problem Solver.",
  ],
  // Short summary shown in the Home section (placeholder — Gage will rewrite)
  summary:
    "I'm a Computer Science and Mathematics double major at Northern Arizona University, " +
    "passionate about machine learning, mathematical problem solving, and building software " +
    "that matters. Currently conducting ML research and always looking for the next hard problem.",
  links: {
    github: "https://github.com/", // TODO: add username
    linkedin: "https://www.linkedin.com/", // TODO: add profile
    email: "gagewboyd@gmail.com",
    phone: "+1 (000) 000-0000", // TODO: real number
  },
  // Random captions shown under the preloader percentage
  loadingMessages: [
    "Sharpening pencils…",
    "Proving the lemma…",
    "Compiling ideas…",
    "Setting the board…",
  ],
  footerNote: "Gage William Boyd",
};

export const navItems = [
  { name: "Home", href: "#home" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Interests", href: "#interests" },
];

export const sectionTitles = {
  experience: "Experience",
  projects: "Projects",
  interests: "Interests",
};

export type ExperienceItem = {
  title: string;
  company: string;
  logo: string; // path under /public
  logoLight?: boolean; // true → render logo on a light box (for dark-colored logos)
  location: string;
  period: string;
  blurb: string; // one-liner always visible
  details: string[]; // bullets revealed on hover
  href?: string; // future in-domain detail page (unused for now)
};

export const experience: ExperienceItem[] = [
  {
    title: "Machine Learning Researcher",
    company: "Northern Arizona University",
    logo: "/logos/nau.png",
    logoLight: true, // navy/gold logo — needs a light box to stay legible
    location: "Flagstaff, AZ",
    period: "2024 — Present",
    blurb: "Undergraduate machine learning research.",
    details: [
      "Conducted machine learning research under faculty mentorship.",
      "Designed and trained models; analyzed results and iterated on approach.",
      "Placeholder — Gage will write the real bullets.",
    ],
  },
  {
    title: "Project Engineer Intern",
    company: "Achen-Gardner Construction",
    logo: "/logos/achen-gardner.webp",
    location: "Chandler, AZ",
    period: "Summer 2024",
    blurb: "Heavy civil construction project engineering.",
    details: [
      "Supported project engineering on heavy civil construction projects.",
      "Worked with plans, quantities, and field coordination.",
      "Placeholder — Gage will write the real bullets.",
    ],
  },
];

export type ProjectItem = {
  title: string;
  blurb: string; // one-liner always visible
  details: string; // revealed on hover
  tags: string[];
  // Simple built-in graphic: a gradient + glyph keyed by `art`
  art: "ml" | "math" | "web" | "game" | "data";
  href?: string; // future in-domain detail page (unused for now)
};

export const projects: ProjectItem[] = [
  {
    title: "Project One",
    blurb: "Placeholder project — coolest part shown here.",
    details:
      "A short description of what this project does, what it's built with, and what was hard about it. Gage will replace this.",
    tags: ["Python", "PyTorch"],
    art: "ml",
  },
  {
    title: "Project Two",
    blurb: "Placeholder project — coolest part shown here.",
    details:
      "A short description of what this project does, what it's built with, and what was hard about it. Gage will replace this.",
    tags: ["TypeScript", "Next.js"],
    art: "web",
  },
  {
    title: "Project Three",
    blurb: "Placeholder project — coolest part shown here.",
    details:
      "A short description of what this project does, what it's built with, and what was hard about it. Gage will replace this.",
    tags: ["C++", "Math"],
    art: "math",
  },
];

export type InterestItem = {
  name: string;
  icon: "chess" | "poker" | "mma" | "book" | "math" | "music";
  note: string; // shown when the tile is expanded (click)
};

export const interests: InterestItem[] = [
  { name: "Chess", icon: "chess", note: "Placeholder — a line about chess." },
  { name: "Poker", icon: "poker", note: "Placeholder — a line about poker." },
  { name: "MMA", icon: "mma", note: "Placeholder — a line about MMA." },
  {
    name: "Literature",
    icon: "book",
    note: "Placeholder — a line about reading.",
  },
];
