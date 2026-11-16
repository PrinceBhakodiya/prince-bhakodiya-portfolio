import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const ogSize = { width: 1200, height: 630 };

/** Shared 1200×630 share card: dark background, violet glow, big title. */
export function ogCard({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  const long = title.length > 48;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(70% 90% at 50% 0%, #3b2577 0%, #0a0910 65%)",
          color: "#f3f2f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#a78bfa", letterSpacing: 6, textTransform: "uppercase" }}>
          {eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: long ? 64 : 92, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 30, color: "rgba(243,242,245,0.65)", lineHeight: 1.35 }}>{subtitle}</div>}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "rgba(243,242,245,0.7)" }}>
          <span>{siteConfig.name}</span>
          <span>princebhakodiya.in</span>
        </div>
      </div>
    ),
    ogSize
  );
}
