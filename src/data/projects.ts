export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  platforms: string[];
  features: string[];
  tech: string[];
  gradient: string;
  accent: string;
  image?: string;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
  imageBackground?: string;
  links?: {
    playStore?: string;
    playStoreDriver?: string;
    appStore?: string;
    website?: string;
    demo?: string;
    github?: string;
    caseStudy?: string;
  };
  architecture?: string[];
  /** Square app icon used in the dock and showcase */
  icon: string;
  /** Short serif line under the title */
  tagline: string;
  /** Platform pill, e.g. "Android & iOS" */
  kind: string;
  /** Brand colour for dots, glows and the generated screen */
  color: string;
  screen: "ride" | "trade" | "ipo" | "shop" | "food" | "web";
  /** A ready-made device mockup image (transparent) shown instead of the generated screen */
  mockup?: string;
  /** Show a MacBook browser opened on this web app (see webApps in mockups.tsx) */
  browser?: "antoc" | "ipobuzz" | "suppr" | "brokersite";
  /** Phone placed in front of the browser */
  companion?: "antoc" | "suppr";
  /** Floating detail card next to the device */
  overlay: { label: string; value: string; meta: string };
};

export const projects: Project[] = [
  {
    id: "vayu",
    icon: "/projects/vayu.webp",
    tagline: "Book a ride in two taps.",
    kind: "Android & iOS",
    color: "#4f5bff",
    screen: "ride",
    overlay: { label: "Live ride", value: "Driver 2 min away", meta: "Auto · OTP 4821" },
    title: "Vayu Ride",
    subtitle: "Ride-hailing platform",
    description:
      "Full-stack mobility platform with separate rider and driver apps, real-time matching, live tracking, payments, and multi-city operations at scale.",
    category: "Mobility",
    platforms: ["User App", "Driver App", "Admin Panel", "Backend APIs"],
    features: [
      "Real-time ride matching",
      "Live GPS tracking",
      "Socket-based ride updates",
      "Driver allocation & dispatch",
      "Wallet & payment gateway",
      "Safety alerts & OTP verification",
      "Multi-city support",
    ],
    tech: ["Flutter", "Node.js", "MongoDB", "Socket.IO", "AWS"],
    gradient: "from-blue-600/30 via-sky-500/20 to-blue-800/30",
    accent: "cyan",
    image: "/projects/vayu.webp",
    imageAlt: "Vayu app icon — book auto and cab",
    imageFit: "contain",
    imageBackground: "bg-blue-600",
    links: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.passdnusers.userapp",
      appStore: "https://apps.apple.com/in/app/vayu-book-auto-cab/id6741581638",
    },
    architecture: [
      "Rider & Driver Apps",
      "API Gateway",
      "Socket Layer",
      "Ride Service",
      "Payment Service",
      "MongoDB Cluster",
    ],
  },
  {
    id: "gogogo",
    icon: "/projects/gogogo.webp",
    tagline: "Go anywhere, on demand.",
    kind: "Rider & driver apps",
    color: "#a855f7",
    screen: "ride",
    overlay: { label: "Fare estimate", value: "₹186", meta: "Cab · 12 min trip" },
    title: "Gogogo Ride",
    subtitle: "Ride-hailing platform",
    description:
      "Production ride-hailing ecosystem with dedicated user and driver applications, dispatch logic, fare engine, and operations tooling for on-demand transport.",
    category: "Mobility",
    platforms: ["User App", "Driver App", "Admin Panel", "Backend APIs"],
    features: [
      "On-demand booking",
      "Driver onboarding & KYC",
      "Fare calculation & surge",
      "In-app chat & notifications",
      "Trip history & receipts",
      "Ratings & support flows",
      "Operations dashboard",
    ],
    tech: ["Flutter", "Node.js", "MongoDB", "Socket.IO", "Firebase"],
    gradient: "from-violet-700/30 via-purple-600/20 to-violet-900/30",
    accent: "purple",
    image: "/projects/gogogo.webp",
    imageAlt: "GoGoGo app icon — experiential travel ecosystem",
    imageFit: "contain",
    architecture: [
      "User & Driver Apps",
      "REST + WebSocket APIs",
      "Dispatch Engine",
      "Notification Service",
      "Payments",
      "Ops Admin",
    ],
    links: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.gogogo.life&hl=en_IN",
      playStoreDriver:
        "https://play.google.com/store/apps/details?id=com.gogogocrew.app&hl=en_IN",
      website: "https://gogogo.life/",
    },
  },
  {
    id: "speartrades",
    icon: "/projects/speartrades.webp",
    tagline: "Read the market in real time.",
    kind: "Android & iOS",
    color: "#84cc16",
    screen: "trade",
    overlay: { label: "BTC / USDT", value: "+4.82%", meta: "Live · WebSocket feed" },
    title: "Speartrades",
    subtitle: "Crypto trading platform",
    description:
      "Mobile-first crypto trading app with live market data, order execution, portfolio tracking, and secure wallet flows for active traders.",
    category: "FinTech",
    platforms: ["Mobile App", "Trading APIs", "Admin Panel"],
    features: [
      "Real-time price feeds",
      "Market & limit orders",
      "Portfolio & P&L tracking",
      "Wallet deposits & withdrawals",
      "KYC & security layers",
      "Price alerts & watchlists",
      "Transaction history",
    ],
    tech: ["Flutter", "Node.js", "WebSocket", "PostgreSQL", "Redis"],
    gradient: "from-slate-900/50 via-emerald-950/30 to-lime-500/10",
    accent: "lime",
    image: "/projects/speartrades.webp",
    imageAlt: "SpearTrades app logo — crypto analytics",
    imageFit: "contain",
    links: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.speartrades.app",
      appStore:
        "https://apps.apple.com/in/app/speartrades-crypto-analytics/id6745014891",
    },
  },
  {
    id: "ipohub",
    icon: "/projects/ipobuzz-icon.png",
    tagline: "Never miss an IPO.",
    kind: "Android & iOS",
    color: "#6d4cff",
    screen: "ipo",
    mockup: "/projects/ipobuzz-phones.webp",
    overlay: { label: "GMP today", value: "₹58 (+8.4%)", meta: "Paras Healthcare · Day 3" },
    title: "IPO Buzz",
    subtitle: "All IPO information in one place",
    description:
      "Comprehensive IPO intelligence app — upcoming listings, company profiles, side-by-side comparisons, and real-time news so investors never miss an offering.",
    category: "FinTech",
    platforms: ["Mobile App", "API Backend", "Admin Panel"],
    features: [
      "IPO calendar & alerts",
      "Company profiles & prospectus highlights",
      "Side-by-side IPO comparison",
      "IPO news & market updates",
      "Price band & lot size tracking",
      "Subscription status notifications",
    ],
    tech: ["Flutter", "Node.js", "MongoDB", "FastAPI"],
    gradient: "from-blue-600/30 via-indigo-600/20 to-blue-800/30",
    accent: "blue",
    image: "/projects/ipobuzz-icon.png",
    imageAlt: "IPO Buzz app icon — IPO calendar, GMP and subscription",
    imageFit: "contain",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.ipobuzz.app",
      appStore: "https://apps.apple.com/in/app/ipo-buzz/id6806936127",
      website: "https://ipobuzz.in",
    },
  },
  {
    id: "ipobuzz-web",
    icon: "/projects/ipobuzz-icon.png",
    tagline: "Every IPO, live on the web.",
    kind: "Web platform",
    color: "#5b45e6",
    screen: "web",
    browser: "ipobuzz",
    overlay: { label: "Today in IPOs", value: "7 live IPOs", meta: "2 closing · 3 allotments today" },
    title: "IPO Buzz Web",
    subtitle: "IPO tracking website",
    description:
      "The IPO Buzz website at ipobuzz.in — live IPOs, GMP, subscription updates, allotment status and listing dates for Mainboard and SME issues, server-rendered with Next.js for search.",
    category: "FinTech",
    platforms: ["Website", "Admin Dashboard", "API Backend"],
    features: [
      "Live IPOs with bidding countdown",
      "Grey market premium (GMP) tracker",
      "IPO calendar & allotment status",
      "SEO-first Next.js pages",
    ],
    tech: ["Next.js", "Node.js", "MongoDB"],
    gradient: "from-indigo-600/30 via-violet-600/20 to-indigo-800/30",
    accent: "violet",
    links: {
      website: "https://ipobuzz.in",
    },
  },
  {
    id: "clozzet",
    icon: "/projects/clozzet.webp",
    tagline: "Fashion at your door in 30 minutes.",
    kind: "Android & iOS",
    color: "#2563eb",
    screen: "shop",
    overlay: { label: "Order status", value: "Out for delivery", meta: "Arriving in 18 min" },
    title: "Clozzet",
    subtitle: "30-minute fashion delivery",
    description:
      "Quick-commerce clothing platform promising delivery in 30 minutes — buyer app, seller portal, inventory sync, and a micro-fulfillment architecture built for speed.",
    category: "E-commerce",
    platforms: ["User App", "Seller App", "Admin Panel", "Backend APIs"],
    features: [
      "30-minute delivery SLA",
      "Seller catalog & inventory",
      "Order routing to nearest hub",
      "Real-time stock sync",
      "Returns & size exchange",
      "Promotions & flash sales",
      "Delivery partner tracking",
    ],
    tech: ["Flutter", "Node.js", "MongoDB", "Redis", "Maps API"],
    gradient: "from-blue-600/30 via-blue-500/20 to-sky-600/20",
    accent: "blue",
    image: "/projects/clozzet.webp",
    imageAlt: "Clozzet app icon — fashion in minutes",
    imageFit: "contain",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.app.clozzet",
      appStore:
        "https://apps.apple.com/in/app/clozzet-fashion-in-minutes/id6747312453",
    },
    architecture: [
      "User & Seller Apps",
      "Order Orchestrator",
      "Inventory Service",
      "Fulfillment Hubs",
      "Rider Dispatch",
      "Notification Bus",
    ],
  },
  {
    id: "cravekart",
    icon: "/projects/cravekart.webp",
    tagline: "Lunch for the whole office, sorted.",
    kind: "Android app",
    color: "#22c55e",
    screen: "food",
    overlay: { label: "Team lunch", value: "48 meals", meta: "Scheduled · 12:30 PM" },
    title: "Cravekart",
    subtitle: "Corporate food delivery",
    description:
      "B2B food delivery platform for corporate campuses and offices — bulk ordering, meal plans, vendor management, and scheduled lunch programs for teams.",
    category: "Food Tech",
    platforms: ["User App", "Vendor App", "Corporate Admin", "Backend APIs"],
    features: [
      "Corporate account & billing",
      "Scheduled & recurring orders",
      "Office/campus delivery zones",
      "Vendor menu management",
      "Team meal allowances",
      "Order tracking & ETA",
      "Invoicing & expense reports",
    ],
    tech: ["Flutter", "Node.js", "MongoDB", "Payment Gateway", "AWS"],
    gradient: "from-lime-500/20 via-green-600/10 to-teal-600/20",
    accent: "lime",
    image: "/projects/cravekart.webp",
    imageAlt: "CraveKart app icon — corporate food delivery",
    imageFit: "contain",
    links: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.cravekart.app&hl=en_IN",
    },
  },
  {
    id: "suppr",
    icon: "/projects/suppr-icon.png",
    tagline: "Once-in-a-lifetime dining at home.",
    kind: "Web, Android & iOS",
    color: "#ffd60a",
    screen: "web",
    browser: "suppr",
    companion: "suppr",
    overlay: { label: "House party", value: "8 seats", meta: "Hosted dinner · Saturday" },
    title: "Suppr",
    subtitle: "Home dining marketplace",
    description:
      "India-first home dining marketplace — hire a private chef for the table at home or book a seat at a hosted house party. Suppr for guests, Suppr Pro for chefs, with Razorpay payments and payouts.",
    category: "Marketplace",
    platforms: ["Guest App", "Suppr Pro App", "Website", "Admin Panel"],
    features: [
      "Hire a verified private chef",
      "Hosted house parties with seats",
      "Suppr Pro app for chefs",
      "Razorpay payments & payouts",
    ],
    tech: ["Flutter", "React", "Node.js", "MongoDB"],
    gradient: "from-yellow-500/30 via-amber-500/20 to-yellow-700/30",
    accent: "yellow",
    links: {
      website: "https://thesuppr.in",
    },
  },
  {
    id: "brokersite",
    icon: "/projects/brokersite-icon.png",
    tagline: "A broker website, live in one minute.",
    kind: "Web platform",
    color: "#e8875f",
    screen: "web",
    browser: "brokersite",
    overlay: { label: "Just published", value: "3 BHK · ₹85 Lakh", meta: "From a WhatsApp message" },
    title: "BrokerSite",
    subtitle: "Websites for Indian brokers",
    description:
      "BrokerSite turns the photos and details Indian brokers already send on WhatsApp into a website — property pages, enquiries, reviews and QR codes, with AI-written listings in English, Hindi and Gujarati.",
    category: "PropTech",
    platforms: ["Website builder", "WhatsApp bot", "Broker dashboard", "API"],
    features: [
      "Property pages from WhatsApp",
      "AI listings in 3 languages",
      "Enquiries & lead list",
      "QR codes & reviews",
    ],
    tech: ["Next.js", "Node.js", "MongoDB", "WhatsApp API", "Gemini"],
    gradient: "from-slate-700/30 via-orange-600/20 to-slate-800/30",
    accent: "orange",
    links: {
      website: "https://brokersite.in",
    },
  },
  {
    id: "antoc",
    icon: "/projects/antoc-icon.png",
    tagline: "Every lead, one pipeline.",
    kind: "Web, Android & iOS",
    color: "#8b5cf6",
    screen: "web",
    browser: "antoc",
    companion: "antoc",
    overlay: { label: "Broadcast", value: "2,140 delivered", meta: "WhatsApp · 98% read" },
    title: "Antoc CRM",
    subtitle: "Enterprise sales automation",
    description:
      "End-to-end CRM with mobile and web clients — WhatsApp automation, lead pipelines, team workflows, analytics, and subscription billing for sales teams.",
    category: "SaaS",
    platforms: ["Mobile App", "Web Dashboard", "Admin Panel", "WhatsApp API"],
    features: [
      "WhatsApp API integration",
      "Broadcast & drip campaigns",
      "Lead tracking & pipelines",
      "Team & role permissions",
      "CRM dashboards & analytics",
      "Automation workflows",
      "Mobile-first field sales",
    ],
    tech: ["Flutter", "React", "Node.js", "MongoDB"],
    gradient: "from-violet-600/30 via-purple-600/20 to-violet-800/30",
    accent: "violet",
    image: "/projects/antoc-icon.png",
    imageAlt: "Antoc CRM logo — purple brand mark",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.passdn.business",
      appStore: "https://apps.apple.com/in/app/antoc-crm/id6746353226",
      website: "https://antoc.ai/",
    },
  },
];
