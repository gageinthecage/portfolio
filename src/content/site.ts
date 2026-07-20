// ============================================================
// SITE CONTENT — edit everything about the portfolio here.
// No component code needs to change when this file changes.
// ============================================================

export const site = {
  name: "Gage William Boyd",
  firstName: "Gage",
  school: "Northern Arizona University",
  // Academic details shown in the hero (degrees, GPA, honors, school).
  education: {
    school: "Northern Arizona University",
    location: "Flagstaff, AZ",
    // Rendered as a single line, e.g. "B.S. Mathematics & B.S. Computer Science".
    degrees: ["B.S. Mathematics", "B.S. Computer Science"],
    gpa: "3.6",
    graduation: "Expected May 2028",
    // Rendered as a row of small pills under the summary.
    honors: ["Dean's List", "Lumberjack Scholar", "SCLA Honors Society"],
  },
  // Rotating typewriter lines under the name (hero)
  taglines: [
    "Computer Science & Mathematics. Machine Learning Researcher. Problem Solver.",
  ],
  // Short summary shown in the Home section
  summary:
    "Junior majoring in Mathematics and Computer Science at Northern Arizona University, " +
    "specializing in machine learning and data science. Currently researching in the UQLID Lab, " +
    "focused on developing physics-informed neural networks (PINNs) to predict bandgap location and " +
    "dimensions in differently structured photonic materials. Actively seeking Summer 2027 internships " +
    "in software engineering, embedded systems, data science, quantitative trading, and machine learning " +
    "engineering. Passionate about solving difficult problems and seeking a career that enables me to be " +
    "a lifelong learner.",
  links: {
    github: "https://github.com/gageinthecage",
    linkedin: "https://www.linkedin.com/in/gage-boyd-9078063bb/",
    email: "gagewboyd@gmail.com",
    phone: "602-469-2854",
    // Résumé PDF lives in /public; opens in a new tab.
    resume: "/Gage-Boyd-Resume.pdf",
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
    title: "Math Lab",
    blurb:
      "A searchable, categorized database of every Putnam competition problem (1995–2025) with full solutions.",
    details:
      "372 problems and solutions transcribed verbatim from Kedlaya's Putnam Archive and rendered with KaTeX. Browse by mathematical topic, competition year, or full-text search; every problem gets its own page with a hidden-by-default solution. A static single-page app — vanilla JS, no backend — with a documented JSON schema and import pipeline for growing the corpus.",
    tags: ["JavaScript", "KaTeX", "Python", "JSON"],
    art: "math",
    github: "https://github.com/gageinthecage/math-lab",
    demo: "https://math-lab-psi.vercel.app/",
  },
];

export type InterestQuote = {
  text: string;
  author: string;
};

export type InterestBook = {
  title: string;
  author: string;
  // Spine tint (hex) for the little book graphic.
  tint: string;
};

export type InterestItem = {
  name: string;
  icon: "chess" | "poker" | "mma" | "book";
  // Header illustration shown at the top of the popup.
  art: "chess" | "poker" | "mma" | "literature";
  // One-line hook shown under the title.
  tagline: string;
  // Main text of the popup (may contain multiple sentences).
  body: string;
  // Optional pull-quote shown at the bottom of the popup.
  quote?: InterestQuote;
  // Literature only: little book graphics shown at the bottom.
  books?: InterestBook[];
};

export const interests: InterestItem[] = [
  {
    name: "Chess",
    icon: "chess",
    art: "chess",
    tagline: "Six pieces, sixty-four squares, infinite depth.",
    body:
      "More possible positions than atoms in the universe. Chess is a very simple game — six distinct pieces on a 64-square board — yet it embodies the highest form of intelligence, creativity, and problem solving.",
    quote: {
      text: "To play for a draw, at any rate with White, is to some degree a crime against chess.",
      author: "Mikhail Tal",
    },
  },
  {
    name: "Poker",
    icon: "poker",
    art: "poker",
    tagline: "Where edge meets luck — the closest game to life.",
    body:
      "Juxtaposing chess, poker is not a 100% skill game — it requires a certain degree of luck. While many point to that and say it doesn't hold the same quality as a game as chess, I'd argue the exact opposite. Managing luck — knowing when to bet on your luck and when to bet against it — is as close to life as one game can get. That edge of luck, paired with the real technical skills of risk management and game theory, condenses poker into the pinnacle of over-the-board games.",
    quote: {
      text: "Limit poker is a science, and these kids are scientists. But no-limit is an art. In limit you're shooting at a target. In no-limit the target comes alive and shoots back at you.",
      author: "Crandell Addington",
    },
  },
  {
    name: "MMA",
    icon: "mma",
    art: "mma",
    tagline: "Discipline, grit, and serenity — good for body, mind, and soul.",
    body:
      "Wrestling taught me unforgettable life lessons — discipline, grit, determination, and loss. The serenity you get from putting your all into something is unforgettable. I aspire to treat all my ventures the way I did wrestling, BJJ, and Muay Thai. Regardless of loss or victory, the sport of fighting is good for body, mind, and soul. I implore everyone to try it at least once in their life.",
  },
  {
    name: "Literature",
    icon: "book",
    art: "literature",
    tagline: "Stories are as human as a thing can be.",
    body:
      "A universal truth across all cultures and peoples is the importance of stories. I'd argue that literature is as human as a thing can be — something that comes purely from the fibers of one's being, and, when read by different people, can carry vastly different meanings. Literature is a massive passion of mine, and I love developing myself through challenging rhetoric and beautiful stories.",
    quote: {
      text: "The man who believes that the secrets of the world are forever hidden lives in mystery and fear. Superstition will drag him down. The rain will erode the deeds of his life. But that man who sets himself the task of singling out the thread of order from the tapestry will by the decision alone have taken charge of the world and it is only by such taking charge that he will effect a way to dictate the terms of his own fate.",
      author: "Cormac McCarthy, Blood Meridian",
    },
    books: [
      { title: "Blood Meridian", author: "Cormac McCarthy", tint: "#7f1d1d" },
      { title: "A Song of Ice and Fire", author: "George R. R. Martin", tint: "#1e3a5f" },
      { title: "The Lord of the Rings", author: "J. R. R. Tolkien", tint: "#3f2d1a" },
      { title: "The Count of Monte Cristo", author: "Alexandre Dumas", tint: "#4a2e6b" },
      { title: "Dune", author: "Frank Herbert", tint: "#8a5a1c" },
    ],
  },
];
