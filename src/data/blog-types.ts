/**
 * Blog content model. Text supports inline links written as [label](/path) so
 * posts can link to each other, to project pages and to hire pages.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** One-paragraph direct answer at the top: what AI answer engines quote */
  tldr: string;
  date: string;
  updated?: string;
  tags: string[];
  kind: "case-study" | "article";
  /** Case studies link back to their project */
  projectId?: string;
  body: Block[];
  faqs?: { q: string; a: string }[];
};
