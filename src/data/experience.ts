export type ExperienceItem = {
  year: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
};

export const experiences: ExperienceItem[] = [
  {
    year: "2026 — Present",
    title: "Tech Lead",
    company: "Product Engineering",
    description:
      "Leading engineering across multiple products — mobility, fintech, CRM, and quick-commerce — from system design and delivery to mentoring teams and shipping production software.",
    tags: ["Tech Lead", "Product Building", "Scalable Software"],
  },
  {
    year: "2024 — 2025",
    title: "Senior Full Stack Developer",
    company: "Startup",
    description:
      "Owned end-to-end delivery for high-traffic apps and backends — real-time ride platforms, enterprise CRM, crypto analytics, and food-tech products serving thousands of users.",
    tags: ["Senior", "Full Stack", "Scale"],
  },
  {
    year: "2022 — 2024",
    title: "Full Stack Developer",
    company: "Startup",
    description:
      "Built and shipped mobile apps with Node.js backends, Socket.IO real-time systems, payments, and cloud deployments on AWS and Firebase.",
    tags: ["Full Stack", "Flutter", "Node.js"],
  },
  {
    year: "2022",
    title: "App Developer",
    company: "Mobile Products",
    description:
      "Focused on Flutter mobile development — UI, APIs, state management, and Play Store releases for consumer and business applications.",
    tags: ["Flutter", "Mobile", "Android & iOS"],
  },
  {
    year: "2021",
    title: "Software Development Intern",
    company: "First Role",
    description:
      "Started my career learning production workflows — building features, fixing bugs, and collaborating on real client and internal projects.",
    tags: ["Intern", "Learning", "Foundation"],
  },
];
