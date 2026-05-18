export type TechItem = {
  name: string;
  proficiency: number;
  /** Simple Icons slug — see src/lib/tech-icons.ts */
  icon: string;
};

export type TechCategory = {
  id: string;
  title: string;
  items: TechItem[];
};

export const techCategories: TechCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    items: [
      { name: "Next.js", proficiency: 95, icon: "nextdotjs" },
      { name: "React", proficiency: 95, icon: "react" },
      { name: "TypeScript", proficiency: 92, icon: "typescript" },
      { name: "Tailwind CSS", proficiency: 90, icon: "tailwindcss" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    items: [
      { name: "Flutter", proficiency: 95, icon: "flutter" },
      { name: "Dart", proficiency: 90, icon: "dart" },
      { name: "React Native", proficiency: 80, icon: "react" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    items: [
      { name: "Node.js", proficiency: 95, icon: "nodedotjs" },
      { name: "FastAPI", proficiency: 90, icon: "fastapi" },
      { name: "Socket.IO", proficiency: 88, icon: "socketdotio" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    items: [
      { name: "AWS", proficiency: 88, icon: "amazonaws" },
      { name: "Docker", proficiency: 85, icon: "docker" },
      { name: "Firebase", proficiency: 90, icon: "firebase" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    items: [
      { name: "MongoDB", proficiency: 92, icon: "mongodb" },
      { name: "PostgreSQL", proficiency: 88, icon: "postgresql" },
      { name: "Redis", proficiency: 85, icon: "redis" },
    ],
  },
  {
    id: "ai",
    title: "AI & Automation",
    items: [
      { name: "LangChain", proficiency: 85, icon: "langchain" },
      { name: "LLM APIs", proficiency: 88, icon: "openai" },
      { name: "OpenAI", proficiency: 90, icon: "openai" },
    ],
  },
  {
    id: "architecture",
    title: "Architecture Tools",
    items: [
      { name: "System Design", proficiency: 92, icon: "architecture" },
      { name: "Microservices", proficiency: 88, icon: "architecture" },
      { name: "Scalable APIs", proficiency: 95, icon: "architecture" },
    ],
  },
];
