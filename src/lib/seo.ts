import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const absoluteUrl = (path = "/") => new URL(path, siteConfig.url).toString();

export const PERSON_ID = `${siteConfig.url}/#person`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

/** The one Person entity every page points back to, so search and AI engines connect them. */
export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    image: absoluteUrl(siteConfig.logo),
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.bio,
    email: siteConfig.contact.emailAddress,
    telephone: siteConfig.contact.phone,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.emailAddress,
      areaServed: "IN",
      availableLanguage: ["en", "hi", "gu"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.countryCode,
    },
    knowsAbout: siteConfig.knowsAbout,
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.instagram],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": PERSON_ID },
    inLanguage: "en-IN",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Indexable, with large image previews allowed. Set per page so the 404 page never inherits it. */
export const indexable: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
};

/** Page metadata with canonical URL and matching Open Graph / Twitter tags. */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
}): Metadata {
  // The layout appends " | Prince Bhakodiya". Skip it when the title already names
  // the brand or would run past ~70 characters and get cut off in search results.
  const withBrand = `${title} | ${siteConfig.name}`;
  const skipBrand = title.includes(siteConfig.name) || withBrand.length > 70;
  return {
    title: skipBrand ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: path },
    robots: indexable,
    openGraph: {
      type,
      url: path,
      title,
      description,
      siteName: siteConfig.name,
      locale: "en_IN",
      ...(type === "article" ? { publishedTime, modifiedTime, authors: [siteConfig.name] } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
