"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Lock, RotateCw } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/*
 * Device frames with generated, on-brand app screens. Each screen is drawn
 * in container-query units (cqw) so it scales with whatever size the frame is.
 */

function StatusBar({ dark = true }: { dark?: boolean }) {
  return (
    <div className={cn("flex items-center justify-between px-[7cqw] pt-[4.5cqw] text-[3.8cqw] font-semibold", dark ? "text-white" : "text-black")}>
      <span>9:41</span>
      <span className="flex items-center gap-[1.2cqw]">
        <span className="flex items-end gap-[0.6cqw]">
          {[1.4, 2, 2.6, 3.2].map((h) => (
            <span key={h} className="w-[0.8cqw] rounded-sm bg-current" style={{ height: `${h}cqw` }} />
          ))}
        </span>
        <span className="h-[2.6cqw] w-[5cqw] rounded-[0.9cqw] border border-current p-[0.4cqw]">
          <span className="block h-full w-3/4 rounded-[0.4cqw] bg-current" />
        </span>
      </span>
    </div>
  );
}

function AppHeader({ project, subtitle }: { project: Project; subtitle: string }) {
  return (
    <div className="mt-[6cqw] flex items-center gap-[3cqw] px-[6cqw]">
      <span className="relative h-[10cqw] w-[10cqw] shrink-0 overflow-hidden rounded-[2.8cqw]">
        <Image src={project.icon} alt="" fill sizes="40px" className="object-cover" unoptimized={project.icon.endsWith(".svg")} />
      </span>
      <div className="min-w-0 leading-tight">
        <p className="text-[3.2cqw] text-white/50">{subtitle}</p>
        <p className="truncate text-[4.8cqw] font-semibold text-white">{project.title}</p>
      </div>
    </div>
  );
}

function RideScreen({ project }: { project: Project }) {
  const c = project.color;
  return (
    <div className="relative h-full bg-[#101018]">
      {/* Map */}
      <div className="absolute inset-0 opacity-90">
        <svg viewBox="0 0 100 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <rect width="100" height="200" fill="#15151f" />
          {[20, 45, 70, 95, 120, 145, 170].map((y) => (
            <line key={y} x1="0" y1={y} x2="100" y2={y + 12} stroke="#22222e" strokeWidth="4" />
          ))}
          {[15, 40, 68, 88].map((x) => (
            <line key={x} x1={x} y1="0" x2={x - 10} y2="200" stroke="#22222e" strokeWidth="3" />
          ))}
          <rect x="48" y="58" width="16" height="14" rx="2" fill="#1d2a22" />
          <rect x="18" y="128" width="20" height="12" rx="2" fill="#1d2a22" />
          <path d="M26 150 C 30 120, 60 120, 58 95 S 70 60, 74 48" fill="none" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="26" cy="150" r="4" fill="#fff" stroke={c} strokeWidth="2.4" />
          <circle cx="74" cy="48" r="3.6" fill={c} />
          <circle cx="74" cy="48" r="8" fill={c} opacity="0.25" />
        </svg>
      </div>
      <div className="relative">
        <StatusBar />
        <div className="mx-[5cqw] mt-[5cqw] flex items-center gap-[2.5cqw] rounded-[4cqw] bg-black/60 px-[4cqw] py-[3cqw] text-[3.6cqw] text-white backdrop-blur">
          <span className="h-[2.4cqw] w-[2.4cqw] rounded-full" style={{ background: c }} />
          Where to?
        </div>
      </div>
      {/* Bottom sheet */}
      <div className="absolute inset-x-0 bottom-0 rounded-t-[6cqw] bg-[#0b0b10] px-[5cqw] pb-[8cqw] pt-[3cqw] text-white">
        <span className="mx-auto block h-[1.2cqw] w-[10cqw] rounded-full bg-white/20" />
        <p className="mt-[3.5cqw] text-[4.6cqw] font-semibold">Choose a ride</p>
        {[
          ["Auto", "₹86", "3 min"],
          ["Cab", "₹186", "5 min"],
          ["Bike", "₹54", "2 min"],
        ].map(([name, price, eta], i) => (
          <div
            key={name}
            className="mt-[2.5cqw] flex items-center gap-[3cqw] rounded-[3.5cqw] px-[3cqw] py-[2.6cqw]"
            style={{ background: i === 0 ? `${c}26` : "rgba(255,255,255,0.04)", outline: i === 0 ? `1px solid ${c}` : undefined }}
          >
            <span className="h-[8cqw] w-[8cqw] rounded-[2.2cqw] bg-white/10" />
            <span className="text-[3.6cqw] font-medium">{name}</span>
            <span className="text-[3cqw] text-white/45">{eta}</span>
            <span className="ml-auto text-[3.8cqw] font-semibold">{price}</span>
          </div>
        ))}
        <div className="mt-[4cqw] rounded-full py-[3.2cqw] text-center text-[3.8cqw] font-semibold" style={{ background: c }}>
          Book Auto
        </div>
      </div>
    </div>
  );
}

function TradeScreen({ project }: { project: Project }) {
  const c = project.color;
  const candles = [40, 46, 42, 50, 47, 55, 52, 60, 57, 64, 61, 70, 66, 74, 72, 80];
  return (
    <div className="h-full bg-[#0a0f1c] text-white">
      <StatusBar />
      <AppHeader project={project} subtitle="Portfolio" />
      <div className="mt-[5cqw] px-[6cqw]">
        <p className="text-[3.2cqw] text-white/50">BTC / USDT</p>
        <p className="text-[8cqw] font-bold tracking-tight">$98,412</p>
        <p className="text-[3.6cqw] font-semibold" style={{ color: c }}>▲ 4.82% today</p>
      </div>
      <div className="mx-[6cqw] mt-[4cqw] flex h-[42cqw] items-end gap-[1.2cqw] border-b border-white/10 pb-[2cqw]">
        {candles.map((v, i) => {
          const up = i % 3 !== 1;
          return (
            <span key={i} className="relative flex-1" style={{ height: `${v}%` }}>
              <span className="absolute inset-x-[40%] -top-[3cqw] bottom-[-2cqw] bg-white/20" />
              <span className="absolute inset-0 rounded-[0.5cqw]" style={{ background: up ? c : "#f43f5e", height: `${30 + (i % 4) * 10}%` }} />
            </span>
          );
        })}
      </div>
      <div className="mt-[5cqw] space-y-[2.5cqw] px-[6cqw]">
        {[
          ["ETH", "$3,612", "+2.1%"],
          ["SOL", "$212.40", "+6.7%"],
          ["XRP", "$2.31", "−0.8%"],
        ].map(([sym, price, chg]) => (
          <div key={sym} className="flex items-center rounded-[3cqw] bg-white/[0.05] px-[3.5cqw] py-[2.8cqw] text-[3.6cqw]">
            <span className="font-semibold">{sym}</span>
            <span className="ml-auto text-white/70">{price}</span>
            <span className="ml-[4cqw] w-[13cqw] text-right font-semibold" style={{ color: chg.startsWith("+") ? c : "#f43f5e" }}>
              {chg}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IpoScreen({ project }: { project: Project }) {
  const c = project.color;
  return (
    <div className="h-full bg-[#0b1020] text-white">
      <StatusBar />
      <AppHeader project={project} subtitle="IPO calendar" />
      <div className="mt-[4cqw] flex gap-[2cqw] px-[6cqw] text-[3.2cqw]">
        {["Open", "Upcoming", "Listed"].map((tab, i) => (
          <span key={tab} className="rounded-full px-[3.5cqw] py-[1.6cqw]" style={{ background: i === 0 ? c : "rgba(255,255,255,0.06)" }}>
            {tab}
          </span>
        ))}
      </div>
      <div className="mt-[4cqw] space-y-[3cqw] px-[6cqw]">
        {[
          ["Mainboard", "₹420 – 442", 86],
          ["SME", "₹118 – 124", 54],
          ["Mainboard", "₹265 – 280", 32],
        ].map(([type, band, sub], i) => (
          <div key={i} className="rounded-[4cqw] bg-white/[0.05] p-[3.5cqw]">
            <div className="flex items-center gap-[2.5cqw]">
              <span className="h-[8cqw] w-[8cqw] rounded-[2.2cqw] bg-white/10" />
              <div>
                <span className="block h-[2.6cqw] w-[24cqw] rounded-full bg-white/70" />
                <span className="mt-[1.4cqw] block text-[2.8cqw] text-white/45">{type}</span>
              </div>
              <span className="ml-auto text-[3.2cqw] font-semibold">{band}</span>
            </div>
            <div className="mt-[3cqw] h-[1.6cqw] rounded-full bg-white/10">
              <div className="h-full rounded-full" style={{ width: `${sub}%`, background: c }} />
            </div>
            <p className="mt-[1.6cqw] text-[2.8cqw] text-white/45">Subscribed {(Number(sub) / 2).toFixed(1)}×</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShopScreen({ project }: { project: Project }) {
  const c = project.color;
  const swatches = ["#f5d0c5", "#c7d2fe", "#1f2937", "#fde68a"];
  return (
    <div className="h-full bg-[#f6f6f8] text-black">
      <StatusBar dark={false} />
      <div className="mt-[5cqw] px-[6cqw]">
        <p className="text-[3.2cqw] text-black/50">Delivering to Home</p>
        <p className="text-[6cqw] font-bold leading-tight tracking-tight">Fashion in 30 min</p>
      </div>
      <div className="mx-[6cqw] mt-[3cqw] flex items-center gap-[2cqw] rounded-full px-[3.5cqw] py-[2cqw] text-[3.2cqw] font-semibold text-white" style={{ background: c }}>
        ⚡ Express delivery is on
      </div>
      <div className="mt-[4cqw] grid grid-cols-2 gap-[3cqw] px-[6cqw]">
        {swatches.map((s, i) => (
          <div key={i} className="overflow-hidden rounded-[4cqw] bg-white shadow-sm">
            <div className="h-[30cqw]" style={{ background: s }} />
            <div className="p-[2.5cqw]">
              <span className="block h-[2.2cqw] w-[70%] rounded-full bg-black/70" />
              <span className="mt-[1.6cqw] block text-[3cqw] font-semibold">₹{[1299, 899, 1599, 749][i]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FoodScreen({ project }: { project: Project }) {
  const c = project.color;
  return (
    <div className="h-full bg-[#0c120e] text-white">
      <StatusBar />
      <AppHeader project={project} subtitle="Office · Floor 4" />
      <div className="mx-[6cqw] mt-[5cqw] rounded-[5cqw] p-[4.5cqw]" style={{ background: `linear-gradient(135deg, ${c}, #0f766e)` }}>
        <p className="text-[3.2cqw] text-white/80">Today&apos;s team lunch</p>
        <p className="text-[6.4cqw] font-bold leading-tight">48 meals · 12:30</p>
        <div className="mt-[3cqw] flex -space-x-[1.8cqw]">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="h-[6.5cqw] w-[6.5cqw] rounded-full border-2 border-white/60 bg-white/30" />
          ))}
        </div>
      </div>
      <p className="mt-[5cqw] px-[6cqw] text-[4cqw] font-semibold">This week&apos;s menu</p>
      <div className="mt-[2.5cqw] space-y-[2.5cqw] px-[6cqw]">
        {["Paneer bowl", "Thali special", "Millet salad"].map((dish, i) => (
          <div key={dish} className="flex items-center gap-[3cqw] rounded-[3.5cqw] bg-white/[0.05] p-[2.6cqw]">
            <span className="h-[10cqw] w-[10cqw] rounded-[2.6cqw]" style={{ background: ["#f59e0b", "#ef4444", "#84cc16"][i] }} />
            <div className="min-w-0">
              <p className="text-[3.6cqw] font-medium">{dish}</p>
              <p className="text-[2.8cqw] text-white/45">{["Mon", "Tue", "Wed"][i]} · Veg</p>
            </div>
            <span className="ml-auto rounded-full px-[2.6cqw] py-[1cqw] text-[2.8cqw] font-semibold text-black" style={{ background: c }}>
              Added
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const phoneScreens = {
  ride: RideScreen,
  trade: TradeScreen,
  ipo: IpoScreen,
  shop: ShopScreen,
  food: FoodScreen,
} as const;

export function Phone({ project, className }: { project: Project; className?: string }) {
  const Screen = phoneScreens[project.screen as keyof typeof phoneScreens] ?? RideScreen;
  return (
    <div
      className={cn(
        "relative aspect-[9/19.2] rounded-[16%/7.4%] bg-[#1b1a21] p-[3%] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/15",
        className
      )}
    >
      <span className="absolute -left-[1.4%] top-[20%] h-[6%] w-[1.4%] rounded-l bg-[#2c2b33]" />
      <span className="absolute -left-[1.4%] top-[28%] h-[10%] w-[1.4%] rounded-l bg-[#2c2b33]" />
      <span className="absolute -right-[1.4%] top-[26%] h-[13%] w-[1.4%] rounded-r bg-[#2c2b33]" />
      <div className="relative h-full w-full overflow-hidden rounded-[13%/6.2%]" style={{ containerType: "inline-size" }}>
        <Screen project={project} />
        <span className="absolute left-1/2 top-[1.8%] h-[3.6%] w-[31%] -translate-x-1/2 rounded-full bg-black" />
        <span className="absolute bottom-[1.2%] left-1/2 h-[0.6%] w-[34%] -translate-x-1/2 rounded-full bg-white/50 mix-blend-difference" />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent" />
      </div>
    </div>
  );
}


/* ───────────────────────── Antoc CRM (phone) ───────────────────────── */

const ANTOC = "#6c5ce7";

export function AntocPhoneScreen() {
  const followUps = [
    ["Rahul Mehta", "3 BHK · Andheri West", "Call · 11:30"],
    ["Priya Desai", "Office space · BKC", "Site visit · 2:00"],
    ["Amit Shah", "2 BHK · Powai", "WhatsApp · 4:15"],
  ];
  return (
    <div className="h-full bg-[#f5f5fb] text-[#16142b]">
      <div className="rounded-b-[7cqw] pb-[6cqw] text-white" style={{ background: `linear-gradient(160deg, #7d6cf2, ${ANTOC} 60%, #5a48d6)` }}>
        <StatusBar />
        <div className="mt-[5cqw] flex items-center gap-[3cqw] px-[6cqw]">
          <span className="relative h-[10cqw] w-[10cqw] overflow-hidden rounded-[2.8cqw] ring-1 ring-white/40">
            <Image src="/projects/antoc-icon.png" alt="" fill sizes="40px" className="object-cover" />
          </span>
          <div className="leading-tight">
            <p className="text-[3.2cqw] text-white/75">Good morning,</p>
            <p className="text-[4.8cqw] font-semibold">Prince</p>
          </div>
        </div>
        <div className="mx-[6cqw] mt-[5cqw] grid grid-cols-2 gap-[3cqw]">
          {[
            ["Total leads", "381"],
            ["Follow-ups", "522"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[4cqw] bg-white/15 p-[3.5cqw] backdrop-blur">
              <p className="text-[3cqw] text-white/75">{label}</p>
              <p className="text-[7cqw] font-bold leading-tight">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between px-[6cqw] pt-[5cqw]">
        <p className="text-[4.2cqw] font-semibold">Today&apos;s follow-ups</p>
        <span className="text-[3.2cqw] font-medium" style={{ color: ANTOC }}>See all</span>
      </div>
      <div className="mt-[3cqw] space-y-[2.6cqw] px-[6cqw]">
        {followUps.map(([name, need, when], i) => (
          <div key={name} className="flex items-center gap-[3cqw] rounded-[4cqw] bg-white p-[3cqw] shadow-[0_2px_10px_rgba(40,30,120,0.06)]">
            <span className="flex h-[9cqw] w-[9cqw] shrink-0 items-center justify-center rounded-full text-[3.4cqw] font-semibold text-white" style={{ background: ["#6c5ce7", "#f59e0b", "#10b981"][i] }}>
              {name[0]}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[3.6cqw] font-semibold">{name}</p>
              <p className="truncate text-[2.8cqw] text-black/45">{need}</p>
            </div>
            <span className="ml-auto shrink-0 rounded-full px-[2.4cqw] py-[1cqw] text-[2.6cqw] font-medium" style={{ background: `${ANTOC}1a`, color: ANTOC }}>
              {when}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-black/5 bg-white px-[4cqw] pb-[6cqw] pt-[2.6cqw] text-[2.6cqw] text-black/40">
        {["Home", "Leads", "Deals", "Inbox", "More"].map((t, i) => (
          <span key={t} className="flex flex-col items-center gap-[1cqw]" style={{ color: i === 0 ? ANTOC : undefined }}>
            <span className="h-[4.6cqw] w-[4.6cqw] rounded-[1.4cqw]" style={{ background: i === 0 ? ANTOC : "rgba(0,0,0,0.12)" }} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Phone frame around any screen, used where a project brings its own screen. */
export function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative aspect-[9/19.2] rounded-[16%/7.4%] bg-[#1b1a21] p-[3%] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/15", className)}>
      <div className="relative h-full w-full overflow-hidden rounded-[13%/6.2%]" style={{ containerType: "inline-size" }}>
        {children}
        <span className="absolute left-1/2 top-[1.8%] h-[3.6%] w-[31%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

/* ───────────────────────── Suppr ───────────────────────── */

const SUPPR = "#ffd60a";

function SupprWebScreen() {
  return (
    <div className="relative h-full overflow-hidden bg-[#0a0a0a] px-[9cqw] text-white">
      <div className="pointer-events-none absolute -left-[10cqw] -top-[20cqw] h-[50cqw] w-[60cqw] rounded-full bg-[radial-gradient(closest-side,rgba(255,214,10,0.12),transparent)]" />
      <div className="relative flex items-center justify-between py-[2.6cqw]">
        <span className="text-[2.4cqw] font-extrabold tracking-[-0.05em]">
          Suppr<span style={{ color: SUPPR }}>.</span>
        </span>
        <span className="flex items-center gap-[2.4cqw] text-[1.25cqw] text-white/80">
          Guests <span>Chefs &amp; pros</span>
          <span className="rounded-[0.8cqw] px-[1.4cqw] py-[0.8cqw] font-bold text-black" style={{ background: SUPPR }}>Open Suppr</span>
        </span>
      </div>
      <p className="relative mt-[5cqw] text-[1cqw] font-bold tracking-[0.3em]" style={{ color: SUPPR }}>THESUPPR.IN</p>
      <p className="relative mt-[1.4cqw] font-display text-[5.6cqw] font-extrabold leading-[0.98] tracking-[-0.055em]">
        Once-in-a-lifetime dining<span style={{ color: SUPPR }}>,</span>
        <br />
        and the pros who make it
        <br />
        happen<span style={{ color: SUPPR }}>.</span>
      </p>
      <p className="relative mt-[2.4cqw] max-w-[46cqw] text-[1.4cqw] leading-relaxed text-white/55">
        Hire a private chef for the table at home, or take a seat at a house party hosted by someone who cooks like it matters.
      </p>
      <div className="relative mt-[3cqw] flex gap-[1.2cqw] text-[1.3cqw] font-bold">
        <span className="rounded-[1.2cqw] px-[2cqw] py-[1.4cqw] text-black" style={{ background: SUPPR }}>Browse chefs &amp; parties</span>
        <span className="rounded-[1.2cqw] border border-white/20 px-[2cqw] py-[1.4cqw]">I&apos;m a chef or pro</span>
      </div>
    </div>
  );
}

export function SupprPhoneScreen() {
  const chefs = [
    ["Chef Aarav", "Coastal tasting menu", "₹2,400 / guest", "#f97316"],
    ["Meera's table", "House party · 8 seats", "₹1,600 / seat", "#ec4899"],
    ["Chef Kabir", "Modern Punjabi", "₹1,900 / guest", "#22c55e"],
  ];
  return (
    <div className="h-full bg-[#0b0b0b] text-white">
      <StatusBar />
      <div className="mt-[5cqw] flex items-center justify-between px-[6cqw]">
        <span className="text-[6cqw] font-extrabold tracking-[-0.05em]">
          Suppr<span style={{ color: SUPPR }}>.</span>
        </span>
        <span className="relative h-[9cqw] w-[9cqw] overflow-hidden rounded-[2.6cqw]">
          <Image src="/projects/suppr-pro-icon.png" alt="" fill sizes="36px" className="object-cover" />
        </span>
      </div>
      <p className="mt-[4cqw] px-[6cqw] text-[6.6cqw] font-extrabold leading-[1.02] tracking-[-0.045em]">
        Two ways to
        <br />
        eat well<span style={{ color: SUPPR }}>.</span>
      </p>
      <div className="mt-[4cqw] flex gap-[2cqw] px-[6cqw] text-[3.2cqw] font-bold">
        <span className="rounded-full px-[3.6cqw] py-[1.8cqw] text-black" style={{ background: SUPPR }}>Hire a chef</span>
        <span className="rounded-full border border-white/20 px-[3.6cqw] py-[1.8cqw]">House parties</span>
      </div>
      <div className="mt-[4cqw] space-y-[2.6cqw] px-[6cqw]">
        {chefs.map(([name, meta, price, tone]) => (
          <div key={name} className="flex items-center gap-[3cqw] rounded-[4cqw] bg-white/[0.06] p-[3cqw]">
            <span className="h-[12cqw] w-[12cqw] shrink-0 rounded-[3cqw]" style={{ background: `linear-gradient(135deg, ${tone}, #1f1f1f)` }} />
            <div className="min-w-0">
              <p className="truncate text-[3.6cqw] font-bold">{name}</p>
              <p className="truncate text-[2.8cqw] text-white/50">{meta}</p>
              <p className="text-[3cqw] font-semibold" style={{ color: SUPPR }}>{price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── Safari-style browser in a MacBook ───────────────────────── */

function Screenshot({ src, alt }: { src: string; alt: string }) {
  // Eager: tabs swap instantly and cards don't flash blank while the stack scrolls in
  return <Image src={src} alt={alt} fill loading="eager" sizes="(min-width: 1024px) 680px, 90vw" className="object-cover object-top" />;
}

export const webApps = {
  antoc: {
    title: "Antoc AI CRM — Dashboard",
    url: "app.antoc.ai/dashboard",
    href: "https://app.antoc.ai",
    icon: "/projects/antoc-icon.png",
    Screen: () => <Screenshot src="/projects/antoc-web.jpg" alt="Antoc CRM dashboard" />,
  },
  ipobuzz: {
    title: "IPO Buzz — Live IPOs & GMP",
    url: "ipobuzz.in",
    href: "https://ipobuzz.in",
    icon: "/projects/ipobuzz-icon.png",
    Screen: () => <Screenshot src="/projects/ipobuzz-web.jpg" alt="IPO Buzz website home page" />,
  },
  suppr: {
    title: "Suppr — Home dining",
    url: "thesuppr.in",
    href: "https://thesuppr.in",
    icon: "/projects/suppr-icon.png",
    Screen: SupprWebScreen,
  },
  brokersite: {
    title: "BrokerSite — Broker websites",
    url: "brokersite.in",
    href: "https://brokersite.in",
    icon: "/projects/brokersite-icon.png",
    Screen: () => <Screenshot src="/projects/brokersite-web.jpg" alt="BrokerSite home page" />,
  },
} as const;

export type WebAppId = keyof typeof webApps;

/**
 * A MacBook running Safari with a tab for every web app I've shipped. The card's
 * own app opens first; the other tabs switch the page, and clicking the page
 * opens the live site.
 */
export function BrowserLaptop({ initial, className }: { initial: WebAppId; className?: string }) {
  const order = [initial, ...(Object.keys(webApps) as WebAppId[]).filter((id) => id !== initial)];
  const [activeId, setActiveId] = useState<WebAppId>(initial);
  const app = webApps[activeId];

  return (
    <div className={cn("relative", className)}>
      <div className="rounded-[2.2%/3.4%] bg-[#1b1a21] p-[1.4%] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/15">
        <div className="relative flex aspect-[16/10] flex-col overflow-hidden rounded-[1%/1.6%] bg-[#2a2833]" style={{ containerType: "inline-size" }}>
          {/* Tab bar */}
          <div className="flex items-center gap-[1cqw] px-[1.4cqw] pt-[1cqw]">
            <span className="flex gap-[0.6cqw] pb-[0.8cqw]">
              <span className="h-[1.1cqw] w-[1.1cqw] rounded-full bg-[#ff5f57]" />
              <span className="h-[1.1cqw] w-[1.1cqw] rounded-full bg-[#febc2e]" />
              <span className="h-[1.1cqw] w-[1.1cqw] rounded-full bg-[#28c840]" />
            </span>
            <div className="ml-[1cqw] flex min-w-0 flex-1 items-end gap-[0.4cqw]">
              {order.map((id) => {
                const tab = webApps[id];
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveId(id)}
                    className={cn(
                      "flex min-w-0 flex-1 items-center gap-[0.7cqw] rounded-t-[0.8cqw] px-[1cqw] py-[0.7cqw] text-left text-[1.05cqw] transition-colors",
                      id === activeId ? "bg-[#3a3845] text-white" : "text-white/55 hover:bg-white/[0.05] hover:text-white/80"
                    )}
                  >
                    <span className="relative h-[1.4cqw] w-[1.4cqw] shrink-0 overflow-hidden rounded-[0.35cqw]">
                      <Image src={tab.icon} alt="" fill sizes="16px" className="object-cover" />
                    </span>
                    <span className="truncate">{tab.title}</span>
                  </button>
                );
              })}
              <span className="px-[0.8cqw] pb-[0.7cqw] text-[1.3cqw] text-white/40">+</span>
            </div>
          </div>
          {/* Toolbar */}
          <div className="flex items-center gap-[1cqw] bg-[#3a3845] px-[1.4cqw] py-[0.7cqw] text-white/50">
            <ChevronLeft className="h-[1.4cqw] w-[1.4cqw]" />
            <ChevronRight className="h-[1.4cqw] w-[1.4cqw]" />
            <span className="mx-auto flex w-[42%] items-center justify-center gap-[0.6cqw] rounded-[0.7cqw] bg-black/25 py-[0.45cqw] text-[1.05cqw] text-white/80">
              <Lock className="h-[0.9cqw] w-[0.9cqw]" /> {app.url}
            </span>
            <RotateCw className="h-[1.2cqw] w-[1.2cqw]" />
          </div>
          {/* Page */}
          <a
            href={app.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor={`Open ${app.url}`}
            className="relative block flex-1 overflow-hidden bg-white"
            aria-label={`Open ${app.title}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0"
              >
                <app.Screen />
              </motion.div>
            </AnimatePresence>
          </a>
        </div>
      </div>
      <div className="relative mx-[-4%] h-[3.6%] min-h-3 rounded-b-[40%_100%] bg-gradient-to-b from-[#2c2b33] to-[#141318]">
        <span className="absolute left-1/2 top-0 h-[45%] w-[14%] -translate-x-1/2 rounded-b-lg bg-[#0f0e13]" />
      </div>
    </div>
  );
}
