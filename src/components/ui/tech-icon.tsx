"use client";

import Image from "next/image";
import { Boxes, Code2, Network } from "lucide-react";
import { cn } from "@/lib/utils";
import { getTechIconUrl, getTechIconUrlBySlug } from "@/lib/tech-icons";

const ARCHITECTURE_ICONS: Record<string, typeof Code2> = {
  "System Design": Network,
  Microservices: Boxes,
  "Scalable APIs": Code2,
};

type TechIconProps = {
  name: string;
  slug?: string;
  size?: number;
  className?: string;
  showFallbackInitials?: boolean;
};

export function TechIcon({
  name,
  slug,
  size = 20,
  className,
  showFallbackInitials = false,
}: TechIconProps) {
  if (slug === "architecture") {
    const ArchIcon = ARCHITECTURE_ICONS[name] ?? Code2;
    return (
      <ArchIcon
        className={cn("shrink-0 text-blue-400", className)}
        style={{ width: size, height: size }}
        aria-hidden
      />
    );
  }

  const url =
    slug && slug !== "architecture"
      ? getTechIconUrlBySlug(slug)
      : getTechIconUrl(name);

  if (!url) {
    if (showFallbackInitials) {
      return (
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-md bg-white/10 text-[10px] font-bold uppercase text-muted-foreground",
            className
          )}
          style={{ width: size, height: size }}
        >
          {name.slice(0, 2)}
        </span>
      );
    }
    return (
      <Code2
        className={cn("shrink-0 text-muted-foreground", className)}
        style={{ width: size, height: size }}
        aria-hidden
      />
    );
  }

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-white/5",
        className
      )}
      style={{ width: size, height: size }}
      title={name}
    >
      <Image
        src={url}
        alt={`${name} logo`}
        width={size}
        height={size}
        className="object-contain p-0.5"
        unoptimized
      />
    </span>
  );
}

export function TechIconBadge({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium",
        className
      )}
    >
      <TechIcon name={name} size={16} />
      {name}
    </span>
  );
}
