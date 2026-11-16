import type { Post } from "./blog-types";

const PUBLISHED = "2026-11-16";

export const articles: Post[] = [
  {
    slug: "how-to-hire-a-flutter-developer-in-ahmedabad",
    kind: "article",
    title: "How to hire a Flutter developer in Ahmedabad: a practical checklist",
    description:
      "What to check before hiring a Flutter app developer in Ahmedabad or anywhere in India: shipped apps, backend skills, real-time experience, communication and ownership.",
    tldr:
      "When hiring a Flutter developer in Ahmedabad, look for apps that are live on the Play Store and App Store, the ability to build the backend as well as the app, experience with real-time features and payments, a clear process for releases, and someone who will own the product after launch. Ask to see live apps, not just screenshots.",
    date: PUBLISHED,
    tags: ["Hiring", "Flutter", "Ahmedabad", "Freelance"],
    body: [
      {
        type: "p",
        text: "Ahmedabad has a growing startup scene and plenty of developers, so the hard part is not finding someone who knows Flutter. It is finding someone who can take an idea all the way to an app real people use. Here is the checklist I would use myself.",
      },
      { type: "h2", text: "1. Ask for live apps, not screenshots" },
      {
        type: "p",
        text: "Anyone can show a Dribbble shot. Ask for Play Store and App Store links and install them. Check how the app feels on a cheap phone, how fast it opens and whether the reviews mention crashes.",
      },
      { type: "h2", text: "2. Check they can build the backend too" },
      {
        type: "p",
        text: "Most apps need APIs, a database, notifications and an admin panel. A developer who can only build the Flutter side will need a second person for the rest. Full-stack Flutter developers (Flutter plus Node.js, Firebase or similar) keep the whole product in one head.",
      },
      { type: "h2", text: "3. Look for the hard parts in their work" },
      {
        type: "ul",
        items: [
          "Real-time features: live tracking, chat, live prices.",
          "Payments and payouts: Razorpay, wallets, refunds.",
          "Store releases: signing, review rejections, staged rollouts.",
          "Scale: has anything they built been used by thousands of people?",
        ],
      },
      { type: "h2", text: "4. Talk about what happens after launch" },
      {
        type: "p",
        text: "Version one is the start. Ask how they handle crash reports, updates for new Android and iOS versions, and feature requests. You want someone who treats the app as a product, not a one-off delivery.",
      },
      { type: "h2", text: "5. Test the communication" },
      {
        type: "p",
        text: "Send a short brief and see what comes back. Good developers ask questions about users and business goals, not just screens. Clear weekly updates matter more than any framework choice.",
      },
      {
        type: "callout",
        text: "I am a Flutter and full-stack developer based in Ahmedabad. You can install the apps I have shipped from my [projects page](/projects/) or read about [how I work](/hire/flutter-developer-ahmedabad/).",
      },
    ],
    faqs: [
      {
        q: "What should I check before hiring a Flutter developer in Ahmedabad?",
        a: "Check apps they have shipped to the Play Store and App Store, whether they can also build the backend, their experience with real-time features and payments, how they handle releases and updates, and how clearly they communicate.",
      },
      {
        q: "Should a Flutter developer also know backend development?",
        a: "For most startups, yes. Apps need APIs, a database, notifications and an admin panel, and a developer who can build both sides ships faster and with fewer hand-offs.",
      },
    ],
  },
  {
    slug: "realtime-apps-with-socketio-and-nodejs-lessons",
    kind: "article",
    title: "Lessons from building real-time apps with Socket.IO and Node.js",
    description:
      "What ride-hailing and crypto trading apps taught me about real-time systems: what belongs on sockets, reconnecting gracefully, rooms, scaling with Redis and saving battery.",
    tldr:
      "Use sockets for live, throwaway state (locations, prices, trip status) and REST plus a database for anything that must be kept (payments, orders, history). Group users into rooms, expect connections to drop and re-sync from the API when they come back, keep messages small, use Redis to share state across servers, and stop streaming when nobody needs the data.",
    date: PUBLISHED,
    tags: ["Socket.IO", "Node.js", "Real-time", "System design"],
    body: [
      {
        type: "p",
        text: "I have built real-time features into ride-hailing apps like [Vayu](/blog/building-vayu-ride-hailing-app-flutter-nodejs/) and [Gogogo](/blog/gogogo-on-demand-transport-dispatch-fare-engine/), and a live crypto app in [Speartrades](/blog/speartrades-realtime-crypto-trading-app/). These are the rules I keep coming back to.",
      },
      { type: "h2", text: "Split live state from durable state" },
      {
        type: "p",
        text: "A driver's position five seconds ago is worthless; a payment five seconds ago is not. Send live, disposable data over sockets and write anything you must keep through a normal API into the database. When the two get mixed up, a dropped connection loses real data.",
      },
      { type: "h2", text: "Use rooms for everything" },
      {
        type: "p",
        text: "Put the rider and driver of one trip in the same room, or every user watching one coin in one room. Broadcasting to a room is simple, and it stops you sending updates to people who do not need them.",
      },
      { type: "h2", text: "Assume the connection will drop" },
      {
        type: "p",
        text: "Phones switch networks, go into tunnels and get killed in the background. On reconnect, fetch the current state from the API before trusting the socket again. The user should never see a stale trip or price.",
      },
      { type: "h2", text: "Keep messages small and frequent" },
      {
        type: "p",
        text: "Send only what changed. A location update needs coordinates and a timestamp, not the whole driver profile. Smaller payloads mean smoother apps on slow networks.",
      },
      { type: "h2", text: "Share state when you scale" },
      {
        type: "p",
        text: "One Node.js server is easy. With several, a user on server A must still hear about events on server B. A Redis adapter or pub/sub layer solves this, and Redis is also a good home for hot data like latest prices.",
      },
      { type: "h2", text: "Be kind to batteries" },
      {
        type: "p",
        text: "Stream only while it matters. A driver who is offline does not need to send location, and a user who has left the price screen does not need ticks.",
      },
    ],
  },
  {
    slug: "flutter-vs-native-for-startup-apps",
    kind: "article",
    title: "Flutter or native for a startup app? How I decide",
    description:
      "When Flutter is the right choice for a startup's Android and iOS app, when native makes more sense, and the questions I ask before choosing.",
    tldr:
      "For most startups that need an Android and an iOS app, Flutter is the better choice: one codebase, one team and faster releases with a consistent UI. Native makes more sense when the app depends heavily on platform-specific features, deep OS integration or very specialised performance, or when separate platform teams already exist.",
    date: PUBLISHED,
    tags: ["Flutter", "Mobile", "Startups"],
    body: [
      {
        type: "p",
        text: "Nearly every app I have shipped, from [ride-hailing](/blog/building-vayu-ride-hailing-app-flutter-nodejs/) to [quick commerce](/blog/clozzet-30-minute-fashion-delivery-quick-commerce/) and [CRM](/blog/antoc-crm-whatsapp-automation-sales-pipeline/), uses Flutter. That is not loyalty to a framework; it is what fits small teams that need to move fast.",
      },
      { type: "h2", text: "Why Flutter usually wins for startups" },
      {
        type: "ul",
        items: [
          "One codebase for Android and iOS, so features land on both at once.",
          "One team instead of two, which matters when the team is three people.",
          "The UI looks the same everywhere, so design and QA are simpler.",
          "Fast iteration while the product is still finding its shape.",
        ],
      },
      { type: "h2", text: "When I would choose native" },
      {
        type: "ul",
        items: [
          "The core of the app is a platform feature: deep camera, AR, widgets or watch apps.",
          "You need very specialised performance tuning on one platform.",
          "You already have separate, experienced Android and iOS teams.",
        ],
      },
      { type: "h2", text: "The questions I ask first" },
      {
        type: "ol",
        items: [
          "Do you need both platforms at launch?",
          "How big is the team, and will it grow?",
          "Which features depend on the operating system itself?",
          "How fast do you need to ship changes after launch?",
        ],
      },
      {
        type: "p",
        text: "If you are weighing this up, see [how I work as a mobile app developer](/hire/mobile-app-developer-ahmedabad/).",
      },
    ],
  },
  {
    slug: "adding-llm-features-to-real-products",
    kind: "article",
    title: "Adding LLM features to real products without the hype",
    description:
      "How I use large language models in production apps: picking narrow jobs, keeping a human-readable fallback, structured output, multiple languages and cost control.",
    tldr:
      "LLMs work best in products when they do one narrow, well-defined job, such as turning a broker's WhatsApp message into a clean property listing. Ask for structured output, validate it, keep a fallback when the model fails, support the user's languages, and watch cost and latency like any other dependency.",
    date: PUBLISHED,
    tags: ["AI", "LLM", "Gemini", "Product"],
    body: [
      {
        type: "p",
        text: "In [BrokerSite](/blog/brokersite-whatsapp-to-website-ai-listings/) an LLM writes property listings from the photos and short notes brokers send on WhatsApp. It works because the job is narrow and the result is easy to check.",
      },
      { type: "h2", text: "Give the model one job" },
      {
        type: "p",
        text: "\"Write a listing from these details\" is a good job. \"Run my business\" is not. Narrow tasks are easier to test, cheaper to run and far less likely to surprise users.",
      },
      { type: "h2", text: "Ask for structure, then validate it" },
      {
        type: "p",
        text: "Ask for JSON with known fields (price, size, location, description) and check every field before saving. If something is missing or odd, fall back to a simpler template instead of publishing nonsense.",
      },
      { type: "h2", text: "Respect the user's language" },
      {
        type: "p",
        text: "In India a listing might need English, Hindi or Gujarati. LLMs make this cheap to offer, and it matters a lot to users who are not comfortable in English.",
      },
      { type: "h2", text: "Treat it like any other dependency" },
      {
        type: "ul",
        items: [
          "Set timeouts and retries.",
          "Log inputs and outputs so you can debug bad results.",
          "Track cost per request and cache what you can.",
          "Keep a human-editable result, so a person can always fix the output.",
        ],
      },
    ],
  },
];
