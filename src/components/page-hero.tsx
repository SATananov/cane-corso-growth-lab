"use client";

import { UsgLabSeal } from "@/components/usg-lab-seal";
import { useLanguage } from "@/lib/i18n/language-context";
import type { PageHeroKey } from "@/lib/i18n/dictionaries";

type PageHeroProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  badge?: string;
  copyKey?: PageHeroKey;
};

export function PageHero({ eyebrow, title, description, badge, copyKey }: PageHeroProps) {
  const { dictionary } = useLanguage();
  const localizedCopy = copyKey ? dictionary.pageHeroes[copyKey] : null;
  const finalEyebrow = localizedCopy?.eyebrow ?? eyebrow ?? "";
  const finalTitle = localizedCopy?.title ?? title ?? "";
  const finalDescription = localizedCopy?.description ?? description ?? "";
  const finalBadge = localizedCopy?.badge ?? badge;

  return (
    <section className="usg-lab-surface rounded-[2rem] p-6 md:p-8">
      <div className="pointer-events-none absolute right-6 top-6 h-40 w-40 rounded-full border border-amber-300/10" />
      <div className="pointer-events-none absolute right-16 top-16 h-20 w-20 rounded-full border border-amber-300/10" />
      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4">
            <UsgLabSeal />
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300/70">
              {finalEyebrow}
            </p>
          </div>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {finalTitle}
          </h2>
          <p className="mt-5 text-base leading-8 text-stone-400 md:text-lg">
            {finalDescription}
          </p>
        </div>

        {finalBadge ? (
          <div className="w-fit rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100 shadow-[0_0_30px_rgba(212,175,55,0.12)]">
            {finalBadge}
          </div>
        ) : null}
      </div>
    </section>
  );
}
