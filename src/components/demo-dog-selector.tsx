"use client";

import { demoDogProfiles, demoDogSelectorCopy, type DemoDogProfile } from "@/lib/demo-dogs";
import { useLanguage } from "@/lib/i18n/language-context";

type DemoDogSelectorProps = {
  selectedDemoDogId: string;
  onSelectDemoDog: (demoDog: DemoDogProfile) => void;
};

export function DemoDogSelector({
  selectedDemoDogId,
  onSelectDemoDog,
}: DemoDogSelectorProps) {
  const { language } = useLanguage();
  const copy = demoDogSelectorCopy[language];

  return (
    <section className="mb-5 rounded-[1.5rem] border border-amber-200/10 bg-black/25 p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">
            {copy.eyebrow}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">{copy.title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-400">
            {copy.description}
          </p>
        </div>

        <div className="w-fit rounded-full border border-amber-200/15 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100/80">
          {copy.simulatedBadge}
        </div>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-5">
        {demoDogProfiles.map((demoDog) => {
          const text = demoDog.localized[language];
          const isSelected = selectedDemoDogId === demoDog.id;

          return (
            <button
              key={demoDog.id}
              type="button"
              onClick={() => onSelectDemoDog(demoDog)}
              className={`rounded-3xl border p-4 text-left transition ${
                isSelected
                  ? "border-amber-200/75 bg-amber-300 text-stone-950 shadow-[0_0_35px_rgba(212,175,55,0.22)]"
                  : "border-amber-200/10 bg-white/[0.035] text-stone-200 hover:border-amber-200/35 hover:bg-amber-200/10"
              }`}
              aria-pressed={isSelected}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      isSelected ? "text-stone-950" : "text-white"
                    }`}
                  >
                    {text.name}
                  </p>
                  <p
                    className={`mt-1 text-xs uppercase tracking-[0.16em] ${
                      isSelected ? "text-stone-800" : "text-amber-200/70"
                    }`}
                  >
                    {text.role}
                  </p>
                </div>
                {isSelected ? (
                  <span className="rounded-full bg-stone-950 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-amber-200">
                    {copy.activeLabel}
                  </span>
                ) : null}
              </div>

              <p
                className={`mt-3 text-xs leading-5 ${
                  isSelected ? "text-stone-800" : "text-stone-400"
                }`}
              >
                {text.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {text.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${
                      isSelected
                        ? "bg-stone-950/10 text-stone-800"
                        : "bg-amber-300/10 text-amber-100/70"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span
                className={`mt-4 inline-flex text-xs font-semibold ${
                  isSelected ? "text-stone-950" : "text-amber-100"
                }`}
              >
                {copy.loadLabel}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
