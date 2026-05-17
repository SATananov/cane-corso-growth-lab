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
  const selectedDog =
    demoDogProfiles.find((demoDog) => demoDog.id === selectedDemoDogId) ?? demoDogProfiles[0];
  const selectedText = selectedDog.localized[language];

  return (
    <section className="mb-5 rounded-[1.5rem] border border-amber-200/10 bg-black/25 p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">
            {copy.eyebrow}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">{copy.title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-400">
            {copy.description}
          </p>
        </div>

        <div className="w-fit shrink-0 rounded-full border border-amber-200/15 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100/80">
          {copy.simulatedBadge}
        </div>
      </div>

      <label className="mt-5 block text-sm font-medium text-stone-300">
        {copy.loadLabel}
        <select
          className="mt-2 w-full rounded-2xl border border-amber-200/15 bg-black/35 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/55 focus:ring-2 focus:ring-amber-300/10"
          value={selectedDog.id}
          onChange={(event) => {
            const nextDog = demoDogProfiles.find((demoDog) => demoDog.id === event.target.value);
            if (nextDog) onSelectDemoDog(nextDog);
          }}
        >
          {demoDogProfiles.map((demoDog) => (
            <option key={demoDog.id} value={demoDog.id}>
              {demoDog.localized[language].name}
            </option>
          ))}
        </select>
      </label>

      <article className="mt-4 rounded-3xl border border-amber-200/15 bg-white/[0.035] p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">{selectedText.name}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-amber-200/70">
              {selectedText.role}
            </p>
          </div>
          <span className="w-fit shrink-0 rounded-full border border-amber-200/15 bg-amber-300/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-amber-100">
            {copy.activeLabel}
          </span>
        </div>

        <p className="mt-3 text-sm leading-6 text-stone-400">{selectedText.summary}</p>

        <div className="mt-4 grid gap-3 text-xs leading-5 text-stone-400 sm:grid-cols-2">
          <div className="rounded-2xl border border-stone-700 bg-black/20 p-3">
            <p className="font-semibold text-amber-100">{copy.geometryLabel}</p>
            <p className="mt-1">{selectedText.geometryNote}</p>
          </div>
          <div className="rounded-2xl border border-stone-700 bg-black/20 p-3">
            <p className="font-semibold text-amber-100">{copy.modelUseLabel}</p>
            <p className="mt-1">{selectedText.modelUse}</p>
          </div>
        </div>
      </article>
    </section>
  );
}
