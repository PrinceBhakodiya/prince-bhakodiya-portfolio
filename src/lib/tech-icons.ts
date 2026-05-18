export type TechIconConfig = {
  slug: string;
  color: string;
};

const BRAND_COLORS: Record<string, string> = {
  nextdotjs: "ffffff",
  react: "61DAFB",
  typescript: "3178C6",
  tailwindcss: "06B6D4",
  flutter: "02569B",
  dart: "0175C2",
  nodedotjs: "339933",
  fastapi: "009688",
  socketdotio: "ffffff",
  amazonaws: "FF9900",
  docker: "2496ED",
  firebase: "FFCA28",
  mongodb: "47A248",
  postgresql: "4169E1",
  redis: "FF4438",
  langchain: "1C3C3C",
  openai: "ffffff",
  stripe: "635BFF",
  googlemaps: "4285F4",
};

const TECH_BY_NAME: Record<string, string> = {
  "next.js": "nextdotjs",
  react: "react",
  typescript: "typescript",
  "tailwind css": "tailwindcss",
  flutter: "flutter",
  dart: "dart",
  "react native": "react",
  "node.js": "nodedotjs",
  fastapi: "fastapi",
  websockets: "socketdotio",
  websocket: "socketdotio",
  "socket.io": "socketdotio",
  aws: "amazonaws",
  docker: "docker",
  firebase: "firebase",
  mongodb: "mongodb",
  postgresql: "postgresql",
  redis: "redis",
  langchain: "langchain",
  "llm apis": "openai",
  openai: "openai",
  "ai integrations": "openai",
  "payment gateway": "stripe",
  "maps api": "googlemaps",
};

export function normalizeTechName(name: string): string {
  return name.trim().toLowerCase();
}

export function getTechIcon(name: string): TechIconConfig | null {
  const slug = TECH_BY_NAME[normalizeTechName(name)];
  if (!slug) return null;
  return { slug, color: BRAND_COLORS[slug] ?? "ffffff" };
}

export function getTechIconUrl(name: string): string | null {
  const config = getTechIcon(name);
  if (!config) return null;
  return `https://cdn.simpleicons.org/${config.slug}/${config.color}`;
}

export function getTechIconUrlBySlug(slug: string): string {
  const color = BRAND_COLORS[slug] ?? "ffffff";
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}

export const featuredTechLogos = [
  { name: "Flutter", slug: "flutter" },
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "AWS", slug: "amazonaws" },
  { name: "Firebase", slug: "firebase" },
  { name: "Redis", slug: "redis" },
  { name: "Docker", slug: "docker" },
  { name: "FastAPI", slug: "fastapi" },
  { name: "Socket.IO", slug: "socketdotio" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
] as const;
