import Image from "next/image";
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

function CrmScreen({ project }: { project: Project }) {
  const c = project.color;
  const columns = [
    ["New leads", 5],
    ["Contacted", 4],
    ["Demo booked", 3],
    ["Won", 2],
  ] as const;
  return (
    <div className="flex h-full bg-[#0f0e15] text-white">
      {/* Sidebar */}
      <div className="w-[19%] border-r border-white/[0.06] p-[1.6cqw]">
        <div className="flex items-center gap-[0.8cqw]">
          <span className="relative h-[2.6cqw] w-[2.6cqw] overflow-hidden rounded-[0.7cqw]">
            <Image src={project.icon} alt="" fill sizes="24px" className="object-cover" unoptimized />
          </span>
          <span className="text-[1.4cqw] font-semibold">antoc</span>
        </div>
        <div className="mt-[2cqw] space-y-[0.6cqw] text-[1cqw] text-white/55">
          {["Dashboard", "Leads", "Pipelines", "WhatsApp", "Broadcasts", "Automations", "Team", "Billing"].map((item, i) => (
            <p key={item} className="rounded-[0.6cqw] px-[0.8cqw] py-[0.55cqw]" style={{ background: i === 2 ? `${c}33` : undefined, color: i === 2 ? "#fff" : undefined }}>
              {item}
            </p>
          ))}
        </div>
      </div>
      {/* Board */}
      <div className="flex-1 p-[2cqw]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[2cqw] font-semibold">Sales pipeline</p>
            <p className="text-[1cqw] text-white/45">14 open deals · ₹18.4L value</p>
          </div>
          <span className="rounded-[0.7cqw] px-[1.2cqw] py-[0.6cqw] text-[1cqw] font-medium" style={{ background: c }}>
            + New lead
          </span>
        </div>
        <div className="mt-[1.6cqw] grid grid-cols-4 gap-[1.2cqw]">
          {columns.map(([name, count], col) => (
            <div key={name} className="rounded-[1cqw] bg-white/[0.03] p-[0.9cqw]">
              <p className="flex items-center gap-[0.6cqw] text-[1cqw] text-white/60">
                <span className="h-[0.7cqw] w-[0.7cqw] rounded-full" style={{ background: ["#60a5fa", "#fbbf24", c, "#34d399"][col] }} />
                {name} <span className="ml-auto">{count}</span>
              </p>
              {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
                <div key={i} className="mt-[0.8cqw] rounded-[0.8cqw] border border-white/[0.06] bg-white/[0.04] p-[0.8cqw]">
                  <span className="block h-[0.8cqw] w-[70%] rounded-full bg-white/60" />
                  <span className="mt-[0.6cqw] block h-[0.6cqw] w-[45%] rounded-full bg-white/20" />
                  <div className="mt-[0.8cqw] flex items-center justify-between">
                    <span className="h-[1.6cqw] w-[1.6cqw] rounded-full bg-white/15" />
                    <span className="rounded-full bg-[#25d366]/20 px-[0.6cqw] text-[0.8cqw] text-[#25d366]">WA</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Laptop({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="rounded-[2.2%/3.4%] bg-[#1b1a21] p-[1.4%] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/15">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1%/1.6%] bg-black" style={{ containerType: "inline-size" }}>
          <CrmScreen project={project} />
          <span className="absolute left-1/2 top-0 h-[3.2%] w-[14%] -translate-x-1/2 rounded-b-[0.8cqw] bg-black" />
        </div>
      </div>
      <div className="relative mx-[-4%] h-[3.6%] min-h-3 rounded-b-[40%_100%] bg-gradient-to-b from-[#2c2b33] to-[#141318]">
        <span className="absolute left-1/2 top-0 h-[45%] w-[14%] -translate-x-1/2 rounded-b-lg bg-[#0f0e13]" />
      </div>
    </div>
  );
}
