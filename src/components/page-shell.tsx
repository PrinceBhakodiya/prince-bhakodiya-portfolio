import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Cursor } from "./cursor";
import { Nav } from "./nav";
import { Footer } from "./footer";

/** Frame for every page other than the home page. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Cursor />
      <Nav />
      <main className="relative overflow-hidden px-4 pb-24 pt-32 sm:px-8 sm:pt-40">
        <div className="pointer-events-none absolute left-1/2 top-[-12%] h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.22),transparent)]" />
        <div className="relative mx-auto max-w-[1200px]">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-10">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-subtle" />}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-foreground/80">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="transition-colors hover:text-foreground">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
