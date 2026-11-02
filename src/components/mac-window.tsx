import { cn } from "@/lib/utils";

/** A macOS-style window: traffic lights, centred title, dark body. */
export function MacWindow({
  title,
  children,
  className,
  bodyClassName,
  toolbar,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  toolbar?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line-strong bg-[#121119]/95 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      <div className="relative flex h-11 items-center border-b border-line bg-white/[0.03] px-4">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <p className="absolute inset-x-0 text-center font-mono text-xs text-subtle">{title}</p>
        {toolbar && <div className="ml-auto">{toolbar}</div>}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
