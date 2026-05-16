"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UsgLabSeal } from "@/components/usg-lab-seal";
import { appCopy, appNavigation } from "@/lib/app-copy";

export function AppNavigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-amber-200/10 bg-[#090806]/82 py-4 backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="group flex w-fit items-center gap-4">
          <UsgLabSeal />
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-300/70 transition group-hover:text-amber-200">
              {appCopy.eyebrow}
            </p>
            <h1 className="mt-2 text-xl font-semibold tracking-tight text-white">
              {appCopy.name}
            </h1>
          </div>
        </Link>

        <nav aria-label="Main navigation" className="flex flex-wrap gap-2 rounded-full border border-amber-200/10 bg-black/20 p-1.5">
          {appNavigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "border-amber-200/70 bg-amber-300 text-stone-950 shadow-[0_0_30px_rgba(212,175,55,0.22)]"
                    : "border-transparent text-amber-100/76 hover:border-amber-200/25 hover:bg-amber-200/10 hover:text-amber-50"
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
