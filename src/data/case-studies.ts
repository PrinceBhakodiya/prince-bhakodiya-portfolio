import type { Post } from "./blog-types";

const PUBLISHED = "2026-11-16";

/** One case study per shipped product. Facts here mirror src/data/projects.ts. */
export const caseStudies: Post[] = [
  {
    slug: "building-vayu-ride-hailing-app-flutter-nodejs",
    projectId: "vayu",
    kind: "case-study",
    title: "Building Vayu: a ride-hailing app with Flutter, Node.js and Socket.IO",
    description:
      "How I built Vayu, a ride-hailing platform with separate rider and driver apps, real-time matching, live GPS tracking, wallet payments and multi-city support.",
    tldr:
      "Vayu is a ride-hailing platform I built with Flutter for the rider and driver apps and Node.js, MongoDB and Socket.IO on the backend. It matches riders with nearby drivers in real time, streams live GPS location over sockets, handles wallet and gateway payments, verifies rides with an OTP and runs across multiple cities from one admin panel.",
    date: PUBLISHED,
    tags: ["Flutter", "Node.js", "Socket.IO", "Ride-hailing", "Case study"],
    body: [
      { type: "h2", text: "The problem" },
      {
        type: "p",
        text: "A ride-hailing product is really three products that have to agree with each other every second: the rider app, the driver app and the operations team behind them. A booking only feels instant if location, driver status and trip state stay in sync across all three, even on patchy mobile networks.",
      },
      { type: "h2", text: "What I built" },
      {
        type: "ul",
        items: [
          "A rider app to book autos and cabs, see the fare up front and track the driver live.",
          "A driver app to go online, accept rides, navigate and get paid.",
          "An admin panel to run cities, drivers, pricing and support.",
          "Backend APIs behind all three, split into ride, payment and socket services.",
        ],
      },
      { type: "h2", text: "How real-time matching works" },
      {
        type: "p",
        text: "When a rider requests a trip, the ride service looks for online drivers near the pickup point and offers the ride to them. Drivers push their location over a persistent Socket.IO connection, so the server always has a fresh picture of who is available and where. The moment a driver accepts, both apps move into the same trip room and every status change (arriving, started, completed) is broadcast to both sides instead of being polled.",
      },
      {
        type: "callout",
        text: "Sockets carry live state; REST carries anything that must be durable. Payments, trip records and receipts always go through normal API calls and MongoDB, so a dropped socket never loses money or history.",
      },
      { type: "h2", text: "Safety and payments" },
      {
        type: "p",
        text: "Every trip starts with an OTP that the rider shares with the driver, which stops the wrong person getting into the wrong vehicle. Riders can pay from an in-app wallet or through the payment gateway, and the payment service settles the fare once the trip closes.",
      },
      { type: "h2", text: "Running more than one city" },
      {
        type: "p",
        text: "Cities are data, not code. Service areas, vehicle types and pricing are configured per city in the admin panel, so launching somewhere new is an operations task rather than a release.",
      },
      { type: "h2", text: "What I would tell anyone building a ride app" },
      {
        type: "ol",
        items: [
          "Design the trip as a state machine first; the UI on both apps is just a view of that state.",
          "Expect sockets to drop. Reconnect quietly and re-sync the current trip from the API.",
          "Keep location updates small and frequent, and stop sending them when the driver is offline to save battery.",
        ],
      },
      {
        type: "p",
        text: "I used the same foundations again for [Gogogo](/blog/gogogo-on-demand-transport-dispatch-fare-engine/). If you need something similar, see how I work as a [Flutter developer in Ahmedabad](/hire/flutter-developer-ahmedabad/).",
      },
    ],
    faqs: [
      {
        q: "What tech stack does the Vayu ride-hailing app use?",
        a: "Flutter for the rider and driver apps, Node.js for the backend APIs, MongoDB for data, Socket.IO for real-time location and trip updates, and AWS for hosting.",
      },
      {
        q: "How does Vayu track drivers in real time?",
        a: "Driver apps stream their GPS location over a persistent Socket.IO connection. The server keeps the latest position of every online driver and broadcasts trip updates to the rider and driver in the same trip room.",
      },
    ],
  },
  {
    slug: "gogogo-on-demand-transport-dispatch-fare-engine",
    projectId: "gogogo",
    kind: "case-study",
    title: "Gogogo: dispatch, fares and driver onboarding for on-demand transport",
    description:
      "A look at Gogogo's production ride-hailing ecosystem: user and driver apps, a dispatch engine, fare calculation with surge, driver KYC and an operations dashboard.",
    tldr:
      "Gogogo is an on-demand transport platform with a user app, a separate driver (crew) app and an operations dashboard. I built it with Flutter, Node.js, MongoDB, Socket.IO and Firebase. Its core pieces are a dispatch engine, a fare engine with surge pricing, driver onboarding with KYC, in-app chat and notifications, and trip history with receipts.",
    date: PUBLISHED,
    tags: ["Flutter", "Node.js", "Firebase", "Ride-hailing", "Case study"],
    body: [
      { type: "h2", text: "Two apps, one system" },
      {
        type: "p",
        text: "Gogogo ships as two store apps: one for riders and one for the drivers who carry them. Keeping them separate keeps each app small and focused, while both talk to the same REST and WebSocket APIs.",
      },
      { type: "h2", text: "The dispatch engine" },
      {
        type: "p",
        text: "Dispatch decides which driver gets which request. It looks at who is online and close to the pickup, offers the trip, and moves on to the next driver if nobody accepts in time. Trip events go out over WebSockets so both apps update together.",
      },
      { type: "h2", text: "Fares and surge" },
      {
        type: "p",
        text: "The fare engine prices a trip from distance, time and vehicle type, and applies surge when demand outruns supply. The price is calculated on the server and shown before booking, so the rider and driver always see the same number.",
      },
      { type: "h2", text: "Driver onboarding and KYC" },
      {
        type: "p",
        text: "Drivers sign up in the crew app, upload their documents and go through verification before they can take rides. The operations dashboard is where the team reviews documents, approves drivers and handles support.",
      },
      { type: "h2", text: "Talking to users" },
      {
        type: "ul",
        items: [
          "In-app chat between rider and driver for pickup details.",
          "Push notifications through Firebase for every important trip event.",
          "Trip history and receipts, plus ratings and support flows after each ride.",
        ],
      },
      {
        type: "p",
        text: "Read the companion story on [Vayu's real-time matching](/blog/building-vayu-ride-hailing-app-flutter-nodejs/), or see the [Gogogo project page](/projects/gogogo/).",
      },
    ],
    faqs: [
      {
        q: "How does Gogogo calculate fares?",
        a: "A server-side fare engine prices each trip from distance, time and vehicle type and adds surge pricing when demand is higher than the number of available drivers.",
      },
    ],
  },
  {
    slug: "speartrades-realtime-crypto-trading-app",
    projectId: "speartrades",
    kind: "case-study",
    title: "Speartrades: real-time crypto prices, orders and portfolios on mobile",
    description:
      "How Speartrades streams live market data over WebSockets, places market and limit orders, tracks portfolio P&L and keeps wallets secure with KYC.",
    tldr:
      "Speartrades is a mobile-first crypto trading and analytics app for Android and iOS. It is built with Flutter on the front end and Node.js, WebSockets, PostgreSQL and Redis on the back end. It streams live prices, supports market and limit orders, tracks portfolio profit and loss, handles wallet deposits and withdrawals behind KYC, and sends price alerts.",
    date: PUBLISHED,
    tags: ["Flutter", "WebSocket", "FinTech", "Redis", "Case study"],
    body: [
      { type: "h2", text: "Why speed matters here" },
      {
        type: "p",
        text: "Traders judge an app by how fresh its prices feel. A chart that lags by a few seconds is a chart nobody trusts, so the whole app is designed around a live data stream rather than refresh buttons.",
      },
      { type: "h2", text: "Live prices over WebSockets" },
      {
        type: "p",
        text: "Market data reaches the app over a WebSocket feed. Redis holds the latest prices in memory so the backend can fan updates out to many connected users cheaply, and the Flutter app only redraws the rows and candles that actually changed.",
      },
      { type: "h2", text: "Orders and portfolio" },
      {
        type: "ul",
        items: [
          "Market and limit orders, with every order and fill stored in PostgreSQL.",
          "Portfolio and P&L tracking calculated from the user's trade history.",
          "Watchlists and price alerts for the coins a user follows.",
          "Full transaction history for deposits, withdrawals and trades.",
        ],
      },
      { type: "h2", text: "Security" },
      {
        type: "p",
        text: "Money movement sits behind KYC and extra security layers. Balances and ledgers live in PostgreSQL, where transactions keep them consistent, while Redis is only ever a fast cache, never the source of truth.",
      },
      {
        type: "p",
        text: "The same real-time patterns power my ride apps; see [Vayu](/blog/building-vayu-ride-hailing-app-flutter-nodejs/). Planning a fintech app? Read [how I work as a Node.js developer](/hire/nodejs-developer-india/).",
      },
    ],
    faqs: [
      {
        q: "Which database does Speartrades use?",
        a: "PostgreSQL stores orders, balances and transactions, and Redis caches live prices for fast real-time updates.",
      },
    ],
  },
  {
    slug: "ipo-buzz-app-ipo-calendar-gmp-subscription",
    projectId: "ipohub",
    kind: "case-study",
    title: "IPO Buzz app: an IPO calendar, GMP and subscription tracker for Indian investors",
    description:
      "Building the IPO Buzz mobile app with Flutter, Node.js, MongoDB and FastAPI: IPO calendar and alerts, company profiles, comparisons and subscription updates.",
    tldr:
      "IPO Buzz is an Android and iOS app that puts every Indian IPO in one place: an IPO calendar with alerts, company profiles and prospectus highlights, side-by-side comparisons, price band and lot size details, subscription status and IPO news. I built it with Flutter, a Node.js and MongoDB backend and FastAPI services.",
    date: PUBLISHED,
    tags: ["Flutter", "FastAPI", "FinTech", "IPO", "Case study"],
    body: [
      { type: "h2", text: "The idea" },
      {
        type: "p",
        text: "IPO information in India is scattered across exchange notices, prospectuses and news sites. IPO Buzz collects it into one clean app so a retail investor can see what is open, what is coming and how hot each issue is, without opening five websites.",
      },
      { type: "h2", text: "What the app does" },
      {
        type: "ul",
        items: [
          "IPO calendar with open, upcoming and listed issues, plus alerts before key dates.",
          "Company profiles with prospectus highlights.",
          "Side-by-side comparison of two IPOs.",
          "Price band and lot size tracking, and subscription status notifications.",
          "IPO news and market updates.",
        ],
      },
      { type: "h2", text: "How it is built" },
      {
        type: "p",
        text: "The Flutter app reads from a Node.js API backed by MongoDB. FastAPI services handle the data work behind the scenes, keeping IPO details and subscription numbers up to date so the app always shows the latest picture.",
      },
      {
        type: "p",
        text: "IPO Buzz also has a full website; read [how I built the IPO Buzz website with Next.js](/blog/ipo-buzz-website-nextjs-seo/).",
      },
    ],
  },
  {
    slug: "ipo-buzz-website-nextjs-seo",
    projectId: "ipobuzz-web",
    kind: "case-study",
    title: "IPO Buzz website: server-rendered IPO pages with Next.js for search",
    description:
      "How ipobuzz.in uses Next.js server rendering to make live IPOs, grey market premium, allotment status and listing dates fast and searchable.",
    tldr:
      "The IPO Buzz website (ipobuzz.in) is a Next.js site with a Node.js and MongoDB backend. It shows live IPOs with a bidding countdown, a grey market premium (GMP) tracker, the IPO calendar and allotment status for Mainboard and SME issues. Pages are server-rendered so search engines can index every IPO.",
    date: PUBLISHED,
    tags: ["Next.js", "SEO", "FinTech", "Case study"],
    body: [
      { type: "h2", text: "Why a website as well as an app" },
      {
        type: "p",
        text: "Most people discover an IPO by searching for it. A website meets them at that moment, then points them to the app for alerts. That only works if every IPO has its own fast, indexable page.",
      },
      { type: "h2", text: "What is on the site" },
      {
        type: "ul",
        items: [
          "Live IPOs with a bidding countdown, timeline and subscription bar.",
          "A grey market premium (GMP) tracker.",
          "IPO calendar and allotment status for Mainboard and SME issues.",
        ],
      },
      { type: "h2", text: "SEO-first Next.js" },
      {
        type: "p",
        text: "Pages are rendered on the server, so the content is in the HTML the moment a crawler arrives. Each IPO gets its own URL, title and description, which is what lets the site show up for searches on individual issues.",
      },
      {
        type: "p",
        text: "Need a site like this? See [how I work as a Next.js developer](/hire/nextjs-developer-india/).",
      },
    ],
  },
  {
    slug: "clozzet-30-minute-fashion-delivery-quick-commerce",
    projectId: "clozzet",
    kind: "case-study",
    title: "Clozzet: the architecture behind 30-minute fashion delivery",
    description:
      "How Clozzet delivers clothing in 30 minutes: buyer and seller apps, an order orchestrator, real-time inventory sync, hub routing and rider tracking.",
    tldr:
      "Clozzet is a quick-commerce fashion app that promises delivery in 30 minutes. I built buyer and seller apps in Flutter with a Node.js, MongoDB and Redis backend. Orders are routed to the nearest fulfilment hub, stock is synced in real time, and delivery partners are tracked on a map until the order arrives. It also handles returns, size exchanges and flash sales.",
    date: PUBLISHED,
    tags: ["Flutter", "Quick commerce", "Redis", "E-commerce", "Case study"],
    body: [
      { type: "h2", text: "Thirty minutes is an architecture decision" },
      {
        type: "p",
        text: "You cannot deliver a shirt in 30 minutes from a central warehouse. Clozzet keeps stock in small fulfilment hubs close to customers, and the software's job is to always pick the right hub and never sell something that is not on the shelf.",
      },
      { type: "h2", text: "The moving parts" },
      {
        type: "ul",
        items: [
          "User app for browsing and ordering, and a seller app for catalog and inventory.",
          "An order orchestrator that routes each order to the nearest hub with stock.",
          "An inventory service that syncs stock in real time, with Redis for fast reads.",
          "Rider dispatch and live delivery partner tracking using the Maps API.",
          "A notification bus that keeps the buyer, seller and rider updated.",
        ],
      },
      { type: "h2", text: "Returns and exchanges" },
      {
        type: "p",
        text: "Fashion means sizes, and sizes mean exchanges. Returns and size exchanges are built into the order flow from the start, using the same hubs and riders as a normal delivery.",
      },
      {
        type: "p",
        text: "Similar real-time dispatch powers my ride apps: see [Vayu](/blog/building-vayu-ride-hailing-app-flutter-nodejs/).",
      },
    ],
  },
  {
    slug: "cravekart-corporate-food-delivery-platform",
    projectId: "cravekart",
    kind: "case-study",
    title: "Cravekart: corporate food delivery, meal plans and team allowances",
    description:
      "Building Cravekart, a B2B food delivery platform for offices: corporate accounts, scheduled and recurring orders, vendor menus, meal allowances and invoicing.",
    tldr:
      "Cravekart is a B2B food delivery platform for offices and corporate campuses. It has a user app, a vendor app and a corporate admin, built with Flutter, Node.js, MongoDB and AWS. Companies set up accounts and meal allowances, teams place scheduled or recurring orders, vendors manage menus, and finance gets invoices and expense reports.",
    date: PUBLISHED,
    tags: ["Flutter", "B2B", "Food tech", "Case study"],
    body: [
      { type: "h2", text: "Ordering for a team is different" },
      {
        type: "p",
        text: "Consumer food apps optimise for one person ordering now. Offices order for many people, on a schedule, paid by the company. Cravekart is built around those three facts.",
      },
      { type: "h2", text: "What it includes" },
      {
        type: "ul",
        items: [
          "Corporate accounts with central billing.",
          "Scheduled and recurring orders, such as a team lunch every weekday.",
          "Delivery zones for offices and campuses.",
          "Vendor menu management in a dedicated vendor app.",
          "Team meal allowances, order tracking with ETA, and invoices and expense reports for finance.",
        ],
      },
      {
        type: "p",
        text: "See the [Cravekart project page](/projects/cravekart/) for the store link.",
      },
    ],
  },
  {
    slug: "suppr-home-dining-marketplace-private-chefs",
    projectId: "suppr",
    kind: "case-study",
    title: "Suppr: a marketplace for private chefs and hosted house parties",
    description:
      "How Suppr connects guests with private chefs and hosted dinners: a guest app, the Suppr Pro app for chefs, a website and Razorpay payments and payouts.",
    tldr:
      "Suppr is an India-first home dining marketplace. Guests can hire a verified private chef to cook at home or book a seat at a hosted house party. It has a guest app, a separate Suppr Pro app for chefs, a website at thesuppr.in and an admin panel, built with Flutter, React, Node.js and MongoDB, with Razorpay handling payments and payouts.",
    date: PUBLISHED,
    tags: ["Flutter", "React", "Marketplace", "Razorpay", "Case study"],
    body: [
      { type: "h2", text: "Two sides of the table" },
      {
        type: "p",
        text: "A marketplace has to work for both sides. Suppr has a guest app for people who want to eat well and Suppr Pro for the chefs and hosts who cook, each focused on what that side needs.",
      },
      { type: "h2", text: "For guests" },
      {
        type: "ul",
        items: [
          "Hire a verified chef: pick a date and number of guests and pay in the app.",
          "Join a house party: book a seat at a hosted dinner nearby, with the menu and house rules shown up front.",
          "One all-in price, including the platform fee, shown before paying.",
        ],
      },
      { type: "h2", text: "For chefs" },
      {
        type: "ul",
        items: [
          "Get verified with a quick identity check.",
          "Set cuisines, packages and rates, or host a party with a fixed number of seats.",
          "Accept bookings, chat with guests and get paid to a bank account or UPI after each booking.",
        ],
      },
      { type: "h2", text: "Payments" },
      {
        type: "p",
        text: "Razorpay handles guest payments and chef payouts, so money only moves when a booking is confirmed and completed.",
      },
    ],
  },
  {
    slug: "brokersite-whatsapp-to-website-ai-listings",
    projectId: "brokersite",
    kind: "case-study",
    title: "BrokerSite: turning WhatsApp messages into broker websites with AI",
    description:
      "How BrokerSite builds property websites for Indian brokers from the photos and details they already send on WhatsApp, with Gemini-written listings in English, Hindi and Gujarati.",
    tldr:
      "BrokerSite gives Indian property brokers a website in about a minute. Brokers send photos and details on WhatsApp, and BrokerSite publishes a clean property page with their name and number. Google's Gemini writes the listing in English, Hindi or Gujarati, and each broker gets enquiries, a lead list, reviews and QR codes. It is built with Next.js, Node.js, MongoDB and the WhatsApp API.",
    date: PUBLISHED,
    tags: ["Next.js", "Gemini", "WhatsApp API", "PropTech", "AI", "Case study"],
    body: [
      { type: "h2", text: "Meet brokers where they already work" },
      {
        type: "p",
        text: "Most brokers in India run their business on WhatsApp. They will not learn a website builder, but they already send property photos and details to clients every day. BrokerSite turns those exact messages into a website.",
      },
      { type: "h2", text: "How it works" },
      {
        type: "ol",
        items: [
          "The broker messages the BrokerSite WhatsApp number with photos and a few lines about the property.",
          "The server parses the details, and Gemini writes a clean listing in English, Hindi or Gujarati.",
          "A property page goes live on the broker's site with their name and number, ready to share.",
        ],
      },
      { type: "h2", text: "What brokers get" },
      {
        type: "ul",
        items: [
          "Property pages generated from WhatsApp.",
          "Enquiries and a lead list in one place.",
          "Reviews from clients and QR codes for boards and flyers.",
        ],
      },
      {
        type: "p",
        text: "Curious how I use LLMs in real products? Read [practical LLM features](/blog/adding-llm-features-to-real-products/).",
      },
    ],
  },
  {
    slug: "antoc-crm-whatsapp-automation-sales-pipeline",
    projectId: "antoc",
    kind: "case-study",
    title: "Antoc CRM: WhatsApp automation and sales pipelines on web and mobile",
    description:
      "Inside Antoc CRM: lead pipelines, WhatsApp API broadcasts and drip campaigns, team permissions, dashboards and a mobile app for field sales.",
    tldr:
      "Antoc CRM is a sales CRM with a web dashboard and Android and iOS apps, built with Flutter, React, Node.js and MongoDB. It brings leads from every source into one pipeline, automates WhatsApp with the official API (broadcasts and drip campaigns), manages follow-ups and site visits, supports team roles and permissions, and gives managers dashboards and analytics.",
    date: PUBLISHED,
    tags: ["Flutter", "React", "WhatsApp API", "SaaS", "CRM", "Case study"],
    body: [
      { type: "h2", text: "A CRM for teams that live on WhatsApp" },
      {
        type: "p",
        text: "For many Indian sales teams, especially in real estate, the conversation happens on WhatsApp, not email. Antoc puts WhatsApp at the centre of the CRM instead of bolting it on.",
      },
      { type: "h2", text: "Core features" },
      {
        type: "ul",
        items: [
          "Lead tracking and pipelines from first enquiry to won deal.",
          "WhatsApp API integration for broadcasts and drip campaigns.",
          "Follow-ups, site visits and reminders for every lead.",
          "Team and role permissions, so each person sees the right leads.",
          "Dashboards and analytics for managers.",
          "Automation workflows that move leads and send messages without manual work.",
        ],
      },
      { type: "h2", text: "Web for managers, mobile for the field" },
      {
        type: "p",
        text: "Managers live in the React web dashboard. Field sales teams use the Flutter app on Android and iOS to see today's follow-ups, call or message a lead and update the deal from a site visit.",
      },
      {
        type: "p",
        text: "Antoc pairs well with [BrokerSite](/blog/brokersite-whatsapp-to-website-ai-listings/), which turns WhatsApp messages into websites.",
      },
    ],
  },
];
