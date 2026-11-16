/**
 * Landing pages for the searches people use to find a developer
 * ("flutter developer in Ahmedabad", "node.js developer India", ...).
 * Each page has its own copy and FAQs so none of them are thin duplicates.
 */
export type HirePage = {
  slug: string;
  /** Visible H1 */
  title: string;
  /** <title> tag */
  metaTitle: string;
  description: string;
  keywords: string[];
  /** Short service name for schema.org */
  service: string;
  area: string;
  intro: string[];
  offer: string[];
  projectIds: string[];
  faqs: { q: string; a: string }[];
};

export const hirePages: HirePage[] = [
  {
    slug: "flutter-developer-ahmedabad",
    title: "Flutter Developer in Ahmedabad",
    metaTitle: "Flutter Developer in Ahmedabad — Android & iOS Apps",
    description:
      "Prince Bhakodiya is a Flutter developer in Ahmedabad, Gujarat who builds and ships Android and iOS apps with their backends: ride-hailing, fintech, quick commerce and CRM apps live on the stores.",
    keywords: [
      "flutter developer ahmedabad",
      "flutter app developer in ahmedabad",
      "hire flutter developer ahmedabad",
      "flutter developer gujarat",
      "best flutter developer ahmedabad",
    ],
    service: "Flutter app development",
    area: "Ahmedabad",
    intro: [
      "I am Prince Bhakodiya, a Flutter developer based in Ahmedabad. I build Android and iOS apps from one Flutter codebase and the Node.js backends they run on, then ship them to the Play Store and App Store.",
      "My Flutter apps include two ride-hailing platforms, a crypto trading app, an IPO tracker, a 30-minute fashion delivery app, corporate food delivery, a home-dining marketplace and a sales CRM. You can install every one of them today.",
    ],
    offer: [
      "Android and iOS apps from one Flutter codebase",
      "The backend too: Node.js APIs, MongoDB or PostgreSQL, Firebase",
      "Real-time features: live tracking, chat, live prices",
      "Payments with Razorpay and wallets",
      "Play Store and App Store releases and updates",
      "Meetings in person in Ahmedabad, or remote",
    ],
    projectIds: ["vayu", "clozzet", "speartrades", "antoc"],
    faqs: [
      {
        q: "Who is a good Flutter developer in Ahmedabad?",
        a: "Look for someone with Flutter apps live on the Play Store and App Store who can also build the backend. Prince Bhakodiya is a Flutter and full-stack developer in Ahmedabad whose shipped apps include Vayu, Gogogo, Speartrades, IPO Buzz, Clozzet, Cravekart, Suppr and Antoc CRM.",
      },
      {
        q: "Can you build both the Flutter app and the backend?",
        a: "Yes. I build the Flutter app together with Node.js APIs, the database, notifications and an admin panel, so one person owns the whole product.",
      },
      {
        q: "Do you work with clients outside Ahmedabad?",
        a: "Yes. I am based in Ahmedabad and happy to meet locally, and I work remotely with teams across India and abroad.",
      },
      {
        q: "How do I start a Flutter project with you?",
        a: "Send a short description of the app on WhatsApp or email. I reply within a day with questions and next steps.",
      },
    ],
  },
  {
    slug: "full-stack-developer-ahmedabad",
    title: "Full Stack Developer in Ahmedabad",
    metaTitle: "Full Stack Developer in Ahmedabad — Web, Mobile & Backend",
    description:
      "Full stack developer in Ahmedabad building complete products: Flutter apps, Next.js and React web apps, Node.js APIs and databases, from first screen to deployment.",
    keywords: [
      "full stack developer ahmedabad",
      "full stack developer in ahmedabad",
      "hire full stack developer ahmedabad",
      "mern developer ahmedabad",
      "software developer ahmedabad",
    ],
    service: "Full stack development",
    area: "Ahmedabad",
    intro: [
      "I build whole products, not just one layer. That means the mobile app, the web dashboard, the APIs, the database and the deployment, all designed to work together.",
      "As a full stack developer and Tech Lead in Ahmedabad, I have shipped platforms with separate customer, partner and admin apps, real-time features and payments, and kept them running after launch.",
    ],
    offer: [
      "Mobile apps in Flutter",
      "Web apps and dashboards in Next.js and React",
      "APIs in Node.js, plus FastAPI where it fits",
      "MongoDB, PostgreSQL and Redis",
      "Deployment on AWS, GCP and Firebase",
      "System design and technical leadership",
    ],
    projectIds: ["antoc", "suppr", "gogogo", "brokersite"],
    faqs: [
      {
        q: "What does a full stack developer build?",
        a: "Everything a product needs: the user-facing app or website, the backend APIs, the database, integrations like payments and WhatsApp, and the deployment that keeps it running.",
      },
      {
        q: "Which technologies do you use?",
        a: "Flutter for mobile, Next.js and React for web, Node.js for APIs, MongoDB, PostgreSQL and Redis for data, and AWS, GCP and Firebase for hosting.",
      },
      {
        q: "Are you available for freelance full stack work in Ahmedabad?",
        a: "Yes, for freelance projects, consulting and full-time roles. Message me on WhatsApp or email with what you are building.",
      },
    ],
  },
  {
    slug: "mobile-app-developer-ahmedabad",
    title: "Mobile App Developer in Ahmedabad",
    metaTitle: "App Developer in Ahmedabad — Android & iOS App Development",
    description:
      "Mobile app developer in Ahmedabad building Android and iOS apps for startups and businesses: ride-hailing, delivery, fintech, marketplaces and CRM, live on the stores.",
    keywords: [
      "app developer ahmedabad",
      "mobile app developer ahmedabad",
      "android app developer ahmedabad",
      "ios app developer ahmedabad",
      "app development ahmedabad",
    ],
    service: "Mobile app development",
    area: "Ahmedabad",
    intro: [
      "If you need an app for Android and iPhone, I can take it from idea to the stores. I design the flows with you, build the app and its backend, and handle the Play Store and App Store releases.",
      "I have built apps for mobility, quick commerce, food delivery, fintech, home dining and sales teams, each with the admin tools the business needs to run it.",
    ],
    offer: [
      "Android and iOS apps",
      "Customer, partner and admin apps for marketplaces",
      "Maps, live tracking and delivery flows",
      "Payments, wallets and payouts",
      "Push notifications and in-app chat",
      "Store listings, releases and updates",
    ],
    projectIds: ["vayu", "cravekart", "ipohub", "suppr"],
    faqs: [
      {
        q: "Can you build an app like Uber, Ola or Rapido?",
        a: "Yes. I have built two ride-hailing platforms, Vayu and Gogogo, each with a rider app, a driver app and an admin panel, including real-time matching, live tracking and payments.",
      },
      {
        q: "Do you build apps for both Android and iPhone?",
        a: "Yes. I use Flutter, so one codebase runs on both Android and iOS, and I publish to both the Play Store and App Store.",
      },
      {
        q: "What kinds of apps have you built?",
        a: "Ride-hailing, 30-minute fashion delivery, corporate food delivery, crypto trading, IPO tracking, a private-chef marketplace and a sales CRM.",
      },
    ],
  },
  {
    slug: "flutter-developer-india",
    title: "Flutter Developer in India",
    metaTitle: "Hire a Flutter Developer in India — Remote Flutter App Development",
    description:
      "Hire an experienced Flutter developer in India for remote app development: production Android and iOS apps with Node.js backends, real-time features and payments.",
    keywords: [
      "flutter developer india",
      "hire flutter developer india",
      "remote flutter developer",
      "freelance flutter developer india",
      "senior flutter developer",
    ],
    service: "Flutter app development",
    area: "India",
    intro: [
      "I work with startups and companies across India, and abroad, as a remote Flutter developer. You get someone who has shipped production apps used by over 100,000 people and can own the backend as well.",
      "Remote work runs on clear communication: written updates, test builds you can install, and a shared view of what ships next.",
    ],
    offer: [
      "Senior-level Flutter development",
      "Backend and admin panels alongside the app",
      "Real-time and payments experience",
      "Regular test builds via TestFlight and internal testing",
      "Code reviews and mentoring for your team",
      "Overlap with Indian and international time zones",
    ],
    projectIds: ["speartrades", "gogogo", "clozzet", "antoc"],
    faqs: [
      {
        q: "Can I hire you as a remote Flutter developer?",
        a: "Yes. I work remotely with teams across India and abroad on freelance, contract and full-time engagements.",
      },
      {
        q: "How experienced are you with Flutter?",
        a: "I have built and shipped Flutter apps for over five years, including ride-hailing, fintech, quick commerce and CRM apps used by more than 100,000 people.",
      },
    ],
  },
  {
    slug: "nodejs-developer-india",
    title: "Node.js Backend Developer in India",
    metaTitle: "Node.js Backend Developer in India — APIs, Real-time & Scale",
    description:
      "Node.js backend developer in India building REST APIs, Socket.IO real-time systems, payments and integrations on MongoDB, PostgreSQL and Redis.",
    keywords: [
      "node.js developer india",
      "nodejs backend developer",
      "hire node js developer ahmedabad",
      "socket.io developer",
      "backend developer india",
    ],
    service: "Node.js backend development",
    area: "India",
    intro: [
      "Most of what users never see but always feel lives in the backend: how fast a ride is matched, whether a payment goes through, whether a price is fresh. I build those systems in Node.js.",
      "My backends power ride-hailing dispatch, live crypto prices, 30-minute delivery routing, IPO data and WhatsApp automation at scale.",
    ],
    offer: [
      "REST APIs and admin APIs",
      "Real-time systems with Socket.IO and WebSockets",
      "MongoDB, PostgreSQL and Redis design",
      "Payments, webhooks and third-party integrations",
      "WhatsApp Business API automation",
      "Deployment, monitoring and zero-downtime releases",
    ],
    projectIds: ["vayu", "speartrades", "antoc", "brokersite"],
    faqs: [
      {
        q: "What kind of Node.js backends do you build?",
        a: "APIs for mobile and web apps, real-time systems with Socket.IO, payment and webhook flows, and integrations such as the WhatsApp Business API, on MongoDB, PostgreSQL and Redis.",
      },
      {
        q: "Can you build real-time features like live tracking?",
        a: "Yes. Live driver tracking, ride matching and live crypto prices are all real-time systems I have built in Node.js.",
      },
    ],
  },
  {
    slug: "nextjs-developer-india",
    title: "Next.js Developer in India",
    metaTitle: "Next.js Developer in India — Fast, SEO-friendly Websites & Apps",
    description:
      "Next.js developer in India building fast, search-friendly websites and web apps: server-rendered pages, dashboards, SaaS products and SEO built in.",
    keywords: [
      "next.js developer india",
      "nextjs developer ahmedabad",
      "react developer ahmedabad",
      "seo friendly website developer",
      "saas developer india",
    ],
    service: "Next.js web development",
    area: "India",
    intro: [
      "Next.js is my choice when a website has to be fast and findable on Google. Pages are rendered ahead of time, so they load quickly and search engines can read them.",
      "I have used it for an IPO tracking site, a broker website builder and this portfolio, and React for SaaS dashboards like Antoc CRM.",
    ],
    offer: [
      "Marketing sites and landing pages",
      "SEO-first, server-rendered content sites",
      "SaaS dashboards and admin panels",
      "Structured data, sitemaps and Core Web Vitals",
      "APIs and databases behind the site",
      "Hosting on your own server or the cloud",
    ],
    projectIds: ["ipobuzz-web", "brokersite", "antoc"],
    faqs: [
      {
        q: "Why use Next.js for a business website?",
        a: "Next.js renders pages ahead of time, so they load fast and search engines can index the full content, which helps rankings and conversions.",
      },
      {
        q: "Can you make my site rank better on Google?",
        a: "I build sites with SEO foundations: fast pages, clean URLs, metadata, structured data and sitemaps. Rankings also depend on content and competition, so I focus on giving every page the best technical start.",
      },
    ],
  },
  {
    slug: "freelance-app-developer-gujarat",
    title: "Freelance App Developer in Gujarat",
    metaTitle: "Freelance App Developer in Gujarat — Ahmedabad, Surat, Vadodara, Rajkot",
    description:
      "Freelance app and software developer in Gujarat, based in Ahmedabad, working with businesses in Surat, Vadodara, Rajkot and Gandhinagar on apps, websites and backends.",
    keywords: [
      "freelance app developer gujarat",
      "app developer surat",
      "app developer vadodara",
      "app developer rajkot",
      "freelance developer ahmedabad",
    ],
    service: "Freelance app and web development",
    area: "Gujarat",
    intro: [
      "I am a freelance developer based in Ahmedabad, working with businesses across Gujarat: Ahmedabad, Gandhinagar, Surat, Vadodara and Rajkot.",
      "Many Gujarat businesses run on WhatsApp and need tools that fit how they already work, which is why I built BrokerSite and Antoc CRM around WhatsApp, with content in English, Hindi and Gujarati.",
    ],
    offer: [
      "Apps and websites for local businesses and startups",
      "WhatsApp-based tools and automation",
      "Content in English, Hindi and Gujarati",
      "In-person meetings in Ahmedabad and Gandhinagar",
      "Fixed-scope projects or monthly retainers",
      "Support and updates after launch",
    ],
    projectIds: ["brokersite", "antoc", "cravekart"],
    faqs: [
      {
        q: "Do you work with businesses outside Ahmedabad in Gujarat?",
        a: "Yes. I work with clients in Surat, Vadodara, Rajkot, Gandhinagar and the rest of Gujarat, remotely or with in-person meetings when needed.",
      },
      {
        q: "Can you build apps that work with WhatsApp?",
        a: "Yes. BrokerSite turns WhatsApp messages into websites, and Antoc CRM automates WhatsApp broadcasts and follow-ups using the official API.",
      },
    ],
  },
];

export const getHirePage = (slug: string) => hirePages.find((h) => h.slug === slug);
