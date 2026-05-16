"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appCopy, appNavigation } from "@/lib/app-copy";

export function AppNavigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-amber-200/10 bg-[#090806]/90 py-4 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="group block w-fit">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300/70 transition group-hover:text-amber-200">
            {appCopy.eyebrow}
          </p>
          <h1 className="mt-2 text-xl font-semibold tracking-tight text-white">
            {appCopy.name}
          </h1>
        </Link>

        <nav aria-label="Main navigation" className="flex flex-wrap gap-2">
          {appNavigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "border-amber-300/40 bg-amber-300 text-stone-950"
                    : "border-amber-200/15 bg-white/[0.03] text-amber-100/80 hover:border-amber-200/35 hover:bg-amber-200/10"
                }`}
                title={item.description}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
