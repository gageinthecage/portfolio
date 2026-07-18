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
  // Short summary shown in the Home section
  summary:
    "I'm a Computer Science and Mathematics double major at Northern Arizona University, " +
    "passionate about machine learning, mathematical problem solving, and building software " +
    "that matters. Currently conducting ML research and always looking for the next hard problem.",
  links: {
    github: "https://github.com/gageinthecage",
    linkedin: "https://www.linkedin.com/in/gage-boyd-9078063bb/",
    email: "gagewboyd@gmail.com",
    phone: "602-469-2854",
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
    title: "Machine Learning Research Assistant",
    company: "NAU UQLID Lab",
    logo: "/logos/nau.png",
    logoLight: true, // navy/gold logo — needs a light box to stay legible
    location: "Flagstaff, AZ",
    period: "May 2026 — Present",
    blurb: "Scientific machine learning & uncertainty quantification research.",
    details: [
      "Built PyTorch neural-network surrogates predicting natural frequencies of structural materials under uncertainty, fusing sparse high-fidelity finite-element data with low-fidelity simulations.",
      "Trained a high-fidelity model to 97.4% accuracy in predicting bandgap locations, applying backpropagation, gradient descent, and uncertainty quantification.",
      "Integrated physics-informed neural networks (PINNs) as an additional training layer, embedding governing physical equations to improve predictive accuracy on sparse data.",
    ],
  },
  {
    title: "Project Engineer Intern",
    company: "Achen-Gardner Construction",
    logo: "/logos/achen-gardner-color.png",
    logoLight: true, // blue-on-white brand mark
    location: "Phoenix, AZ",
    period: "Summer 2026",
    blurb: "Heavy civil construction project engineering on a $16M public-works project.",
    details: [
      "Tracked quantities and drafted submittals, purchase orders, subcontracts, RFIs, and LOIs for a $16M public-works intersection project across multiple agencies and municipalities.",
      "Cross-referenced vendor submittals against pre-approved materials lists, catching 10+ specification discrepancies before procurement.",
      "Drafted Traffic Control plans in Bluebeam and AutoCAD; drafted Guaranteed Maximum Price (GMP) submittals for the City of Buckeye.",
    ],
  },
];

export type ProjectItem = {
  title: string;
  blurb: string; // one-liner always visible
  details: string; // revealed on hover
  tags: string[];
  // Card header graphic: either an image under /public…
  image?: string;
  // …or a simple built-in gradient + glyph keyed by `art`
  art: "ml" | "math" | "web" | "game" | "data";
  badge?: string; // optional small status pill (e.g. "In development")
  github?: string; // GitHub repo link
  demo?: string; // live site link
  href?: string; // future in-domain detail page (unused for now)
};

export const projects: ProjectItem[] = [
  {
    title: "Monte Carlo Options Pricer & Backtester",
    blurb:
      "Prices European calls via 10,000-path GBM simulation, validated against Black-Scholes.",
    details:
      "Estimates annualized realized volatility from AAPL log returns, benchmarks simulated prices against live market quotes, and visualizes the implied-volatility smile across strikes. Backtested a 21-month mean-reversion volatility strategy and documented a short-gamma drawdown during the April 2025 tariff shock.",
    tags: ["Python", "NumPy", "pandas", "yfinance"],
    image: "/projects/options-pricer.svg",
    art: "ml",
    github: "https://github.com/gageinthecage/Monte-Carlo-Options-Pricer",
  },
  {
    title: "Retirement Monte Carlo Simulator",
    blurb:
      "Full-stack simulator: 2,000-path GBM engine with median timeline, success rate, and decile outcomes.",
    details:
      "React/Vite frontend on Vercel connected to a FastAPI backend on Render, serving simulation statistics through a REST API with full trajectory storage for interactive visualization.",
    tags: ["React", "FastAPI", "Python", "NumPy"],
    image: "/projects/retirement-sim.png",
    art: "data",
    demo: "https://retirement-sim-frontend.vercel.app/",
  },
  {
    title: "Coming Soon",
    blurb: "The next project is in development.",
    details:
      "Already on the resume — the build is underway. Check back shortly.",
    tags: ["TBD"],
    art: "math",
    badge: "In development",
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
