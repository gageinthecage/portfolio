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
    "in software engineering, embedded systems, data science, and machine learning " +
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
  { name: "Competitions", href: "#competitions" },
  { name: "Interests", href: "#interests" },
];

export const sectionTitles = {
  experience: "Experience",
  projects: "Projects",
  competitions: "Competitions",
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
    blurb:
      "Machine-learning surrogates & uncertainty quantification for phononic-composite bandgap prediction.",
    details: [
      "Benchmarked nine model families — MLP ensembles, Gaussian processes, gradient-boosted trees, random forests, k-NN, mixture-of-experts, and stacked ensembles — against the lab's baseline neural network for predicting bandgap midpoint and width from composite design parameters, all under a shared fixed 5-fold cross-validation protocol with a 1,000-sample held-out test set.",
      "Cut held-out bandgap-midpoint RMSE 11.8% below the baseline network with a 5-seed MLP ensemble (median absolute error down 25%), and matched the baseline's near-floor width accuracy (R² 0.97) with a ridge-stacked ensemble blending MLP and Gaussian-process predictions.",
      "Diagnosed the dominant error mode as branch-switching rather than surface roughness: bandgap midpoints lie on ~5 discrete dispersion branches, and the ~4% of samples routed to the wrong branch dominate RMSE — establishing a ~96% routing-accuracy ceiling that mixture-of-experts architectures cannot beat from the design parameters alone.",
      "Quantified predictive uncertainty with Matérn-kernel Gaussian processes: empirical ±2σ coverage of 0.90 against the nominal 0.95 showed raw GP variances are overconfident, motivating conformal calibration for the lab's UQ pipeline.",
      "Designed controlled follow-up experiments that falsified the hypothesis that predicted bandgap width could repair branch routing — width's discriminative signal collapses exactly at branch crossovers — redirecting effort toward exporting intermediate dispersion features from the MATLAB data-generation pipeline.",
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
    title: "CivilFLOW — AI Document Engine",
    blurb:
      "Retrieval-augmented drafting for construction POs, subcontracts, and RFIs — every section cited back to its source.",
    details:
      "A hybrid RAG pipeline (BM25 + embeddings fused with reciprocal-rank fusion) retrieves a contractor's own clause library and spec corpus; Claude composes drafts through JSON-schema-constrained outputs, with prompt-injection screening and a citation-grounding audit that strips hallucinated references. Anything the engine assumes becomes a human-review flag. Ships with a zero-setup deterministic demo mode and a golden-set eval harness scoring hit@5, MRR, citation coverage, and schema validity.",
    tags: ["Next.js", "TypeScript", "Claude API", "RAG"],
    image: "/projects/civilflow.svg",
    art: "web",
    github: "https://github.com/gageinthecage/CivilFLOW",
    demo: "https://civil-flow.vercel.app/",
  },
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
    image: "/projects/math-lab.svg",
    art: "math",
    github: "https://github.com/gageinthecage/math-lab",
    demo: "https://math-lab-psi.vercel.app/",
  },
];

export type CompetitionItem = {
  name: string;
  host: string;
  year: string;
  // Headline standing, split for typographic emphasis: "Top 220" + "of 4,012".
  rank: string;
  field: string;
  // Percentile pill, e.g. "Top 5.5%".
  percentile: string;
  // 0–1 position along the field bar (1 = first place end).
  fieldPosition: number;
  blurb: string;
};

export const competitions: CompetitionItem[] = [
  {
    name: "Jump Trading Probability Cup",
    host: "Jump Trading",
    year: "2026",
    rank: "Top 220",
    field: "of 4,012 competitors",
    percentile: "Top 5.5%",
    fieldPosition: 0.945,
    blurb:
      "An open probability-estimation competition hosted by Jump Trading, ranked on forecast accuracy across the season. My approach centered on de-vigging market odds and extremizing consensus estimates rather than forecasting from scratch.",
  },
];

export type InterestQuote = {
  text: string;
  author: string;
};

export type InterestBook = {
  title: string;
  author: string;
  // Spine tint (hex) — used for the styled fallback if no cover image loads.
  tint: string;
  // ISBN used to fetch the real cover from the Open Library covers API.
  isbn: string;
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
      { title: "Blood Meridian", author: "Cormac McCarthy", tint: "#7f1d1d", isbn: "9780679728757" },
      { title: "A Game of Thrones", author: "George R. R. Martin", tint: "#1e3a5f", isbn: "9780553588484" },
      { title: "The Lord of the Rings", author: "J. R. R. Tolkien", tint: "#3f2d1a", isbn: "9780544003415" },
      { title: "The Count of Monte Cristo", author: "Alexandre Dumas", tint: "#4a2e6b", isbn: "9780140449266" },
      { title: "Dune", author: "Frank Herbert", tint: "#8a5a1c", isbn: "9780441172719" },
    ],
  },
];
