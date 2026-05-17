import { caneCorsoBreedReferenceGeometry } from "@/lib/ml/breed-reference-geometry";

export function CaneCorsoReferenceSilhouette() {
  const reference = caneCorsoBreedReferenceGeometry;
  const bodyRatio = reference.proportions.find((item) => item.id === "bodyLengthToHeight");
  const headRatio = reference.proportions.find((item) => item.id === "headLengthToHeight");
  const chestRatio = reference.proportions.find((item) => item.id === "chestDepthToHeight");

  return (
    <div className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-5">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">
            Reference geometry
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            Cane Corso proportional guide
          </h3>
        </div>
        <div className="rounded-full border border-amber-200/15 bg-amber-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100">
          Standard-inspired
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[1.5rem] border border-amber-200/10 bg-[#0f0d09] p-4">
        <svg
          aria-label="Cane Corso reference geometry silhouette"
          viewBox="0 0 720 360"
          className="h-auto w-full"
          role="img"
        >
          <defs>
            <linearGradient id="cc-ref-body" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#f2d27a" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#f8eed1" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          <rect x="70" y="72" width="470" height="178" rx="42" fill="url(#cc-ref-body)" />
          <path
            d="M152 96 C209 52 362 52 470 84 C513 97 547 123 564 154 C589 202 540 242 468 244 L150 247 C92 247 55 212 64 164 C70 133 99 109 152 96Z"
            fill="none"
            stroke="#f2d27a"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M515 112 C560 82 618 92 641 132 C657 160 646 191 617 205 C585 221 551 199 548 166"
            fill="none"
            stroke="#f2d27a"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path d="M112 244 L97 319" stroke="#f2d27a" strokeWidth="5" strokeLinecap="round" />
          <path d="M187 247 L172 321" stroke="#f2d27a" strokeWidth="5" strokeLinecap="round" />
          <path d="M405 247 L418 321" stroke="#f2d27a" strokeWidth="5" strokeLinecap="round" />
          <path d="M486 244 L507 319" stroke="#f2d27a" strokeWidth="5" strokeLinecap="round" />

          <line x1="76" y1="318" x2="540" y2="318" stroke="#d4af37" strokeOpacity="0.5" strokeDasharray="8 8" />
          <line x1="76" y1="95" x2="76" y2="318" stroke="#d4af37" strokeOpacity="0.5" strokeDasharray="8 8" />
          <line x1="76" y1="95" x2="548" y2="95" stroke="#f8eed1" strokeOpacity="0.35" strokeDasharray="6 8" />
          <line x1="76" y1="95" x2="548" y2="318" stroke="#f8eed1" strokeOpacity="0.15" />

          <circle cx="76" cy="95" r="6" fill="#f2d27a" />
          <circle cx="76" cy="318" r="6" fill="#f2d27a" />
          <circle cx="548" cy="95" r="6" fill="#f2d27a" />
          <circle cx="548" cy="318" r="6" fill="#f2d27a" />

          <text x="92" y="88" fill="#f8eed1" fontSize="16" fontWeight="700">
            withers / height
          </text>
          <text x="240" y="341" fill="#f8eed1" fontSize="16" fontWeight="700">
            body length ≈ height × 1.10
          </text>
          <text x="472" y="62" fill="#f8eed1" fontSize="15" fontWeight="700">
            head profile
          </text>
        </svg>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-amber-200/10 bg-white/[0.035] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
            Body ratio
          </p>
          <p className="mt-2 text-lg font-semibold text-white">
            {bodyRatio?.target.toFixed(2) ?? "1.11"}×
          </p>
          <p className="mt-1 text-sm leading-6 text-stone-400">
            Body length compared with height at withers.
          </p>
        </div>
        <div className="rounded-2xl border border-amber-200/10 bg-white/[0.035] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
            Head ratio
          </p>
          <p className="mt-2 text-lg font-semibold text-white">
            {headRatio?.target.toFixed(2) ?? "0.36"}×
          </p>
          <p className="mt-1 text-sm leading-6 text-stone-400">
            Head length compared with height at withers.
          </p>
        </div>
        <div className="rounded-2xl border border-amber-200/10 bg-white/[0.035] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
            Chest depth
          </p>
          <p className="mt-2 text-lg font-semibold text-white">
            {chestRatio?.target.toFixed(2) ?? "0.50"}×
          </p>
          <p className="mt-1 text-sm leading-6 text-stone-400">
            Chest depth compared with total height.
          </p>
        </div>
      </div>
    </div>
  );
}
