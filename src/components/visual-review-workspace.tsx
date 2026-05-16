"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { CaneCorsoReferenceSilhouette } from "@/components/cane-corso-reference-silhouette";
import { PhotoGuidePanel } from "@/components/photo-guide-panel";
import { PhotoQualityGatePanel } from "@/components/photo-quality-gate-panel";
import { photoReadinessRules, visualComparisonWorkflow } from "@/lib/ml/photo-comparison-criteria";
import { useLanguage } from "@/lib/i18n/language-context";

type ReadinessState = "empty" | "accepted" | "limited" | "rejected";

const readinessStyles: Record<Exclude<ReadinessState, "empty">, string> = {
  accepted: "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
  limited: "border-amber-300/30 bg-amber-300/10 text-amber-100",
  rejected: "border-red-300/30 bg-red-300/10 text-red-100",
};

export function VisualReviewWorkspace() {
  const { dictionary } = useLanguage();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [readiness, setReadiness] = useState<ReadinessState>("empty");

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setPreviewUrl(null);
      setFileName("");
      setReadiness("empty");
      return;
    }

    setFileName(file.name);
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return URL.createObjectURL(file);
    });
    setReadiness("limited");
  }

  const readinessCopy = useMemo(() => {
    if (readiness === "empty") return dictionary.visualReview.workspace.emptyState;
    return dictionary.visualReview.workspace.readiness[readiness];
  }, [dictionary.visualReview.workspace.emptyState, dictionary.visualReview.workspace.readiness, readiness]);

  return (
    <div className="grid gap-8">
      <PhotoGuidePanel />

      <section className="grid gap-6 xl:grid-cols-2">
        <CaneCorsoReferenceSilhouette />

        <div className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-5">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">
                {dictionary.visualReview.workspace.uploadEyebrow}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                {dictionary.visualReview.workspace.uploadTitle}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-stone-400">
                {dictionary.visualReview.workspace.uploadDescription}
              </p>
            </div>
            {readiness !== "empty" ? (
              <div className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${readinessStyles[readiness]}`}>
                {readinessCopy.label}
              </div>
            ) : null}
          </div>

          <label className="group block cursor-pointer rounded-[1.5rem] border border-dashed border-amber-200/20 bg-white/[0.025] p-4 transition hover:border-amber-200/40 hover:bg-amber-200/[0.04]">
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="sr-only"
              onChange={handleFileChange}
            />
            <div className="grid min-h-80 place-items-center overflow-hidden rounded-[1.25rem] border border-stone-700 bg-[#0f0d09]">
              {previewUrl ? (
                <div
                  aria-label={fileName || "Uploaded dog photo preview"}
                  className="h-80 w-full bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${previewUrl})` }}
                />
              ) : (
                <div className="px-6 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-amber-200/20 bg-amber-300/10 text-2xl text-amber-100">
                    +
                  </div>
                  <p className="mt-4 text-lg font-semibold text-white">
                    {dictionary.visualReview.workspace.dropTitle}
                  </p>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-400">
                    {dictionary.visualReview.workspace.dropDescription}
                  </p>
                </div>
              )}
            </div>
          </label>

          <div className="mt-4 rounded-3xl border border-amber-200/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-300/70">
              {dictionary.visualReview.workspace.readinessTitle}
            </p>
            <h4 className="mt-2 text-xl font-semibold text-white">
              {readinessCopy.title}
            </h4>
            <p className="mt-2 text-sm leading-6 text-stone-400">
              {readinessCopy.description}
            </p>
            {readiness !== "empty" ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {(["accepted", "limited", "rejected"] as const).map((state) => (
                  <button
                    key={state}
                    type="button"
                    onClick={() => setReadiness(state)}
                    className={`rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                      readiness === state
                        ? readinessStyles[state]
                        : "border-stone-700 bg-black/20 text-stone-400 hover:border-amber-200/25 hover:text-amber-100"
                    }`}
                  >
                    {dictionary.visualReview.workspace.readiness[state].label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <PhotoQualityGatePanel
            hasPhoto={Boolean(previewUrl)}
            onReadinessChange={setReadiness}
          />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
            {dictionary.visualReview.overlay.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {dictionary.visualReview.overlay.title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">
            {dictionary.visualReview.overlay.description}
          </p>

          <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-stone-700 bg-[#0f0d09] p-5">
            <svg viewBox="0 0 820 320" className="h-auto w-full" role="img" aria-label="Future overlay comparison map">
              <rect x="70" y="55" width="520" height="190" rx="36" fill="#f2d27a" opacity="0.08" />
              <path d="M90 230 C150 96 277 67 430 90 C526 104 600 156 640 236" fill="none" stroke="#d4af37" strokeWidth="4" strokeLinecap="round" />
              <path d="M94 238 C162 121 300 92 441 112 C538 126 610 171 654 244" fill="none" stroke="#f8eed1" strokeOpacity="0.55" strokeWidth="3" strokeDasharray="10 10" strokeLinecap="round" />
              <line x1="90" y1="250" x2="650" y2="250" stroke="#f8eed1" strokeOpacity="0.25" strokeDasharray="8 8" />
              <line x1="90" y1="90" x2="90" y2="250" stroke="#f8eed1" strokeOpacity="0.25" strokeDasharray="8 8" />
              {[
                [90, 230],
                [210, 120],
                [410, 92],
                [640, 236],
                [94, 238],
                [232, 139],
                [441, 112],
                [654, 244],
              ].map(([x, y], index) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r={index < 4 ? 7 : 5} fill={index < 4 ? "#d4af37" : "#f8eed1"} opacity={index < 4 ? 1 : 0.7} />
              ))}
              <text x="690" y="108" fill="#f8eed1" fontSize="18" fontWeight="700">Reference</text>
              <line x1="670" y1="102" x2="684" y2="102" stroke="#d4af37" strokeWidth="4" />
              <text x="690" y="143" fill="#f8eed1" fontSize="18" fontWeight="700">User photo geometry</text>
              <line x1="670" y1="137" x2="684" y2="137" stroke="#f8eed1" strokeWidth="3" strokeDasharray="6 5" />
            </svg>
          </div>
        </div>

        <div className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
            {dictionary.visualReview.workflow.eyebrow}
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            {dictionary.visualReview.workflow.title}
          </h3>
          <div className="mt-5 grid gap-3">
            {visualComparisonWorkflow.map((step, index) => (
              <div key={step} className="flex gap-3 rounded-2xl border border-stone-700 bg-white/[0.025] p-4">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber-300 text-sm font-bold text-stone-950">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-stone-300">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-red-200/15 bg-red-300/10 p-4 text-sm leading-6 text-red-100">
            {dictionary.visualReview.workflow.safety}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
        <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
          {dictionary.visualReview.readinessTable.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
          {dictionary.visualReview.readinessTable.title}
        </h2>
        <div className="mt-6 overflow-x-auto rounded-3xl border border-stone-700">
          <table className="min-w-full divide-y divide-stone-700 text-left text-sm">
            <thead className="bg-black/30 text-xs uppercase tracking-[0.18em] text-stone-500">
              <tr>
                {dictionary.visualReview.readinessTable.headers.map((header) => (
                  <th key={header} className="px-4 py-3 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800 bg-black/15">
              {photoReadinessRules.map((rule) => (
                <tr key={rule.level}>
                  <td className="px-4 py-4 font-semibold text-white">{rule.label}</td>
                  <td className="px-4 py-4 text-stone-300">{rule.scoreRange}</td>
                  <td className="px-4 py-4 text-stone-300">{rule.meaning}</td>
                  <td className="px-4 py-4 text-stone-400">{rule.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
