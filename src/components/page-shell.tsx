"use client";

import type { ReactNode } from "react";
import { AppNavigation } from "@/components/app-navigation";
import { UsgLabSeal } from "@/components/usg-lab-seal";
import { useLanguage } from "@/lib/i18n/language-context";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  const { dictionary } = useLanguage();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090806] text-stone-100">
      <div className="pointer-events-none absolute inset-0 usg-lab-grid opacity-45" />
      <div className="pointer-events-none absolute left-[-12rem] top-24 h-96 w-96 rounded-full bg-amber-300/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-16rem] top-[32rem] h-[30rem] w-[30rem] rounded-full bg-stone-100/5 blur-3xl" />

      <div className="relative z-10">
        <AppNavigation />
        <section className="mx-auto w-full max-w-7xl px-6 py-8">{children}</section>
        <footer className="mx-auto w-full max-w-7xl px-6 pb-8 pt-2">
          <div className="usg-lab-surface rounded-[2rem] p-5">
            <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <UsgLabSeal />
                <div>
                  <p className="text-sm font-semibold text-amber-100">
                    {dictionary.app.labSeal}
                  </p>
                  <p className="mt-1 max-w-3xl text-sm leading-6 text-stone-400">
                    {dictionary.app.disclaimer}
                  </p>
                </div>
              </div>
              <div className="w-fit rounded-full border border-amber-200/15 bg-black/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100/75">
                {dictionary.app.educationalMl}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
