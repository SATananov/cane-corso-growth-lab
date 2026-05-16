"use client";

import { useMemo } from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import {
  demoOverlayRatios,
  geometryOverlayStages,
  getGeometryOverlayPermission,
  getGeometryOverlayWorkflow,
  overlaySignalLabels,
  type VisualReadinessState,
} from "@/lib/ml/geometry-overlay-comparison";

type GeometryOverlayComparisonPanelProps = {
  previewUrl: string | null;
  readiness: VisualReadinessState;
};

const copy = {
  en: {
    eyebrow: "Geometry overlay prototype",
    title: "Reference geometry next to the uploaded photo, then an explainable overlay.",
    description:
      "This module shows the intended comparison flow: the app does not compare random photos blindly. It first checks readiness, then compares visible landmarks and proportions against Cane Corso reference geometry.",
    referenceTitle: "Cane Corso reference",
    referenceBody:
      "The reference is a proportional geometry guide, not one individual dog. It represents the standard-inspired body and head relations used for visual orientation.",
    userTitle: "Uploaded photo",
    userEmpty: "Upload a photo in the workspace above to preview it here.",
    userRejected:
      "The current photo is blocked by the quality gate. A visual match score should not be shown until a better image is uploaded.",
    overlayTitle: "Overlay comparison map",
    overlayBody:
      "Gold lines represent the reference geometry. Ivory dashed lines represent the estimated user-photo geometry. In a trained version these points would come from landmark detection.",
    tableTitle: "Ratio evidence",
    ratio: "Ratio",
    reference: "Reference",
    userEstimate: "Photo estimate",
    signal: "Signal",
    workflowTitle: "Why this is the correct ML flow",
    safety:
      "The overlay supports visual similarity review only. It cannot prove pedigree, breed purity, health or official Cane Corso status.",
  },
  bg: {
    eyebrow: "Прототип за геометрично налагане",
    title: "Еталонна геометрия до качената снимка, после ясно overlay сравнение.",
    description:
      "Този модул показва правилния flow: приложението не сравнява произволна снимка директно. Първо проверява дали снимката става, после сравнява видимите точки и пропорции с Cane Corso еталонна геометрия.",
    referenceTitle: "Cane Corso еталон",
    referenceBody:
      "Еталонът е пропорционална геометрична схема, не едно конкретно куче. Той представя ориентиращи връзки на тяло и глава, вдъхновени от стандарта.",
    userTitle: "Качена снимка",
    userEmpty: "Качи снимка в работната зона по-горе, за да я видиш тук.",
    userRejected:
      "Текущата снимка е блокирана от quality gate. Не трябва да се показва визуален match score, докато не се качи по-подходяща снимка.",
    overlayTitle: "Карта за overlay сравнение",
    overlayBody:
      "Златните линии показват еталонната геометрия. Светлите прекъснати линии показват приблизителната геометрия от снимката. В обучена версия тези точки ще идват от landmark detection.",
    tableTitle: "Доказателства чрез пропорции",
    ratio: "Пропорция",
    reference: "Еталон",
    userEstimate: "Оценка от снимка",
    signal: "Сигнал",
    workflowTitle: "Защо това е правилният ML flow",
    safety:
      "Overlay сравнението е само визуален ориентир. То не доказва родословие, породна чистота, здраве или официален Cane Corso статус.",
  },
  it: {
    eyebrow: "Prototipo di sovrapposizione geometrica",
    title: "Geometria di riferimento accanto alla foto caricata, poi confronto overlay spiegabile.",
    description:
      "Questo modulo mostra il flusso corretto: l’app non confronta foto casuali direttamente. Prima valuta se la foto è adatta, poi confronta punti visibili e proporzioni con la geometria di riferimento Cane Corso.",
    referenceTitle: "Riferimento Cane Corso",
    referenceBody:
      "Il riferimento è una guida geometrica proporzionale, non un singolo cane. Rappresenta relazioni orientative di corpo e testa ispirate allo standard.",
    userTitle: "Foto caricata",
    userEmpty: "Carica una foto nell’area sopra per visualizzarla qui.",
    userRejected:
      "La foto corrente è bloccata dal quality gate. Non dovrebbe essere mostrato un punteggio visivo finché non viene caricata un’immagine più adatta.",
    overlayTitle: "Mappa di confronto overlay",
    overlayBody:
      "Le linee oro rappresentano la geometria di riferimento. Le linee chiare tratteggiate rappresentano la geometria stimata dalla foto. In una versione addestrata questi punti arriverebbero dal landmark detection.",
    tableTitle: "Evidenza tramite proporzioni",
    ratio: "Proporzione",
    reference: "Riferimento",
    userEstimate: "Stima foto",
    signal: "Segnale",
    workflowTitle: "Perché questo è il flusso ML corretto",
    safety:
      "Il confronto overlay supporta solo la revisione di somiglianza visiva. Non prova pedigree, purezza di razza, salute o status ufficiale Cane Corso.",
  },
} as const;

const permissionStyles = {
  neutral: "border-stone-700 bg-white/[0.03] text-stone-300",
  success: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  warning: "border-amber-300/25 bg-amber-300/10 text-amber-100",
  danger: "border-red-300/25 bg-red-300/10 text-red-100",
} as const;

const signalStyles = {
  close: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  monitor: "border-amber-300/20 bg-amber-300/10 text-amber-100",
  review: "border-red-300/20 bg-red-300/10 text-red-100",
} as const;

function ReferenceGeometrySvg() {
  return (
    <svg viewBox="0 0 760 360" className="h-auto w-full" role="img" aria-label="Cane Corso reference geometry silhouette">
      <defs>
        <linearGradient id="referenceGold" x1="0" x2="1">
          <stop offset="0" stopColor="#f8eed1" stopOpacity="0.2" />
          <stop offset="1" stopColor="#d4af37" stopOpacity="0.32" />
        </linearGradient>
      </defs>
      <rect x="52" y="62" width="558" height="212" rx="42" fill="url(#referenceGold)" />
      <path d="M96 246 C130 151 204 101 315 91 C442 79 548 124 612 242" fill="none" stroke="#d4af37" strokeWidth="5" strokeLinecap="round" />
      <path d="M131 244 L594 244" stroke="#f8eed1" strokeOpacity="0.28" strokeWidth="2" strokeDasharray="8 8" />
      <path d="M161 246 L161 103" stroke="#f8eed1" strokeOpacity="0.36" strokeWidth="2" strokeDasharray="8 8" />
      <path d="M161 103 L590 103" stroke="#f8eed1" strokeOpacity="0.22" strokeWidth="2" strokeDasharray="8 8" />
      <path d="M590 103 L590 246" stroke="#f8eed1" strokeOpacity="0.22" strokeWidth="2" strokeDasharray="8 8" />
      <path d="M250 111 L250 244" stroke="#d4af37" strokeOpacity="0.55" strokeWidth="3" />
      <path d="M396 94 L396 244" stroke="#d4af37" strokeOpacity="0.55" strokeWidth="3" />
      <path d="M489 126 L489 244" stroke="#d4af37" strokeOpacity="0.55" strokeWidth="3" />
      <path d="M602 151 C653 143 684 164 702 204" fill="none" stroke="#d4af37" strokeWidth="4" strokeLinecap="round" />
      <circle cx="161" cy="103" r="7" fill="#d4af37" />
      <circle cx="590" cy="103" r="7" fill="#d4af37" />
      <circle cx="250" cy="111" r="6" fill="#f8eed1" />
      <circle cx="396" cy="94" r="6" fill="#f8eed1" />
      <circle cx="489" cy="126" r="6" fill="#f8eed1" />
      <text x="156" y="302" fill="#f8eed1" fontSize="17">height</text>
      <text x="326" y="302" fill="#f8eed1" fontSize="17">body length ≈ 1.10 × height</text>
      <text x="585" y="83" fill="#f8eed1" fontSize="15">head</text>
    </svg>
  );
}

function OverlayMapSvg({ canCompare }: { canCompare: boolean }) {
  const userOpacity = canCompare ? 0.88 : 0.16;

  return (
    <svg viewBox="0 0 900 360" className="h-auto w-full" role="img" aria-label="Reference and user geometry overlay comparison">
      <rect x="55" y="52" width="640" height="232" rx="44" fill="#f2d27a" opacity="0.08" />
      <path d="M102 250 C150 138 245 88 380 90 C518 93 620 143 675 252" fill="none" stroke="#d4af37" strokeWidth="5" strokeLinecap="round" />
      <path d="M104 258 C166 150 274 112 408 112 C544 112 637 163 695 264" fill="none" stroke="#f8eed1" strokeOpacity={userOpacity} strokeWidth="4" strokeDasharray="12 10" strokeLinecap="round" />
      <line x1="102" y1="276" x2="675" y2="276" stroke="#d4af37" strokeOpacity="0.35" strokeDasharray="8 8" />
      <line x1="104" y1="294" x2="695" y2="294" stroke="#f8eed1" strokeOpacity={userOpacity * 0.5} strokeDasharray="8 8" />
      <line x1="150" y1="250" x2="150" y2="106" stroke="#d4af37" strokeOpacity="0.35" strokeDasharray="8 8" />
      <line x1="166" y1="258" x2="166" y2="126" stroke="#f8eed1" strokeOpacity={userOpacity * 0.5} strokeDasharray="8 8" />
      {[
        [102, 250, "#d4af37"],
        [245, 98, "#d4af37"],
        [380, 90, "#d4af37"],
        [675, 252, "#d4af37"],
        [104, 258, "#f8eed1"],
        [274, 119, "#f8eed1"],
        [408, 112, "#f8eed1"],
        [695, 264, "#f8eed1"],
      ].map(([x, y, color]) => (
        <circle key={`${x}-${y}`} cx={Number(x)} cy={Number(y)} r="7" fill={String(color)} opacity={color === "#f8eed1" ? userOpacity : 1} />
      ))}
      <rect x="725" y="86" width="126" height="104" rx="22" fill="#0f0d09" stroke="#44403c" />
      <line x1="748" y1="120" x2="790" y2="120" stroke="#d4af37" strokeWidth="5" strokeLinecap="round" />
      <text x="802" y="126" fill="#f8eed1" fontSize="16" fontWeight="700">Reference</text>
      <line x1="748" y1="155" x2="790" y2="155" stroke="#f8eed1" strokeWidth="4" strokeDasharray="10 8" strokeLinecap="round" opacity={userOpacity} />
      <text x="802" y="161" fill="#f8eed1" fontSize="16" fontWeight="700" opacity={canCompare ? 1 : 0.55}>User</text>
    </svg>
  );
}

export function GeometryOverlayComparisonPanel({
  previewUrl,
  readiness,
}: GeometryOverlayComparisonPanelProps) {
  const { language } = useLanguage();
  const t = copy[language];
  const permission = useMemo(() => getGeometryOverlayPermission(readiness), [readiness]);
  const workflow = useMemo(() => getGeometryOverlayWorkflow(), []);

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-6 shadow-2xl shadow-black/20">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-amber-300/70">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {t.title}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-300">
            {t.description}
          </p>
        </div>

        <div className={`rounded-3xl border p-5 ${permissionStyles[permission.severity]}`}>
          <p className="text-xs uppercase tracking-[0.22em] opacity-75">
            Photo gate result
          </p>
          <h3 className="mt-2 text-xl font-semibold">{permission.title}</h3>
          <p className="mt-3 text-sm leading-6 opacity-90">{permission.description}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <article className="rounded-[1.75rem] border border-amber-200/10 bg-white/[0.035] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-300/70">
            {t.referenceTitle}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-400">{t.referenceBody}</p>
          <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-stone-700 bg-[#0f0d09] p-4">
            <ReferenceGeometrySvg />
          </div>
        </article>

        <article className="rounded-[1.75rem] border border-amber-200/10 bg-white/[0.035] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-300/70">
            {t.userTitle}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-400">
            {readiness === "rejected" ? t.userRejected : t.overlayBody}
          </p>
          <div className="relative mt-5 grid min-h-80 place-items-center overflow-hidden rounded-[1.5rem] border border-stone-700 bg-[#0f0d09]">
            {previewUrl ? (
              <div
                className={`absolute inset-0 bg-contain bg-center bg-no-repeat ${readiness === "rejected" ? "opacity-35 grayscale" : "opacity-85"}`}
                style={{ backgroundImage: `url(${previewUrl})` }}
                aria-label="Uploaded dog photo used for visual overlay preview"
              />
            ) : (
              <div className="px-8 text-center text-sm leading-6 text-stone-500">
                {t.userEmpty}
              </div>
            )}
            <div className="absolute inset-5 rounded-[1.25rem] border border-dashed border-amber-200/25" />
            {permission.canCompare ? (
              <div className="absolute inset-0">
                <div className="absolute left-[18%] top-[26%] h-3 w-3 rounded-full bg-amber-300 shadow-lg shadow-amber-300/30" />
                <div className="absolute left-[44%] top-[22%] h-3 w-3 rounded-full bg-amber-300 shadow-lg shadow-amber-300/30" />
                <div className="absolute left-[72%] top-[35%] h-3 w-3 rounded-full bg-amber-300 shadow-lg shadow-amber-300/30" />
                <div className="absolute left-[16%] top-[70%] h-3 w-3 rounded-full bg-amber-100 shadow-lg shadow-amber-100/30" />
                <div className="absolute left-[78%] top-[72%] h-3 w-3 rounded-full bg-amber-100 shadow-lg shadow-amber-100/30" />
              </div>
            ) : null}
            {readiness === "rejected" ? (
              <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-red-200/20 bg-red-950/80 p-4 text-sm font-semibold leading-6 text-red-100">
                {t.userRejected}
              </div>
            ) : null}
          </div>
        </article>
      </div>

      <div className="mt-8 rounded-[1.75rem] border border-amber-200/10 bg-white/[0.035] p-5">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-amber-300/70">
              {t.overlayTitle}
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-400">
              {t.overlayBody}
            </p>
          </div>
          <div className="rounded-2xl border border-red-200/15 bg-red-300/10 p-4 text-sm leading-6 text-red-100">
            {t.safety}
          </div>
        </div>
        <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-stone-700 bg-[#0f0d09] p-4">
          <OverlayMapSvg canCompare={permission.canCompare} />
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-3xl border border-stone-700">
          <div className="border-b border-stone-700 bg-white/[0.04] px-4 py-4">
            <h3 className="font-semibold text-white">{t.tableTitle}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-left text-sm">
              <thead className="bg-black/20 text-xs uppercase tracking-[0.18em] text-stone-500">
                <tr>
                  <th className="px-4 py-3">{t.ratio}</th>
                  <th className="px-4 py-3">{t.reference}</th>
                  <th className="px-4 py-3">{t.userEstimate}</th>
                  <th className="px-4 py-3">Delta</th>
                  <th className="px-4 py-3">{t.signal}</th>
                </tr>
              </thead>
              <tbody>
                {demoOverlayRatios.map((ratio) => (
                  <tr key={ratio.id} className="border-t border-stone-800">
                    <td className="px-4 py-4">
                      <p className="font-semibold text-white">{ratio.label}</p>
                      <code className="mt-2 block rounded-xl border border-stone-800 bg-black/30 px-3 py-2 text-xs text-amber-100/80">
                        {ratio.formula}
                      </code>
                    </td>
                    <td className="px-4 py-4 text-stone-300">{ratio.reference}</td>
                    <td className="px-4 py-4 text-amber-100/90">{permission.canCompare ? ratio.userEstimate : "—"}</td>
                    <td className="px-4 py-4 text-stone-400">{permission.canCompare ? ratio.delta : "Blocked"}</td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${signalStyles[ratio.signal]}`}>
                        {permission.canCompare ? overlaySignalLabels[ratio.signal] : "Gate"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-amber-200/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
            {t.workflowTitle}
          </p>
          <div className="mt-4 space-y-3">
            {workflow.map((item, index) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-stone-700 bg-black/20 p-4">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber-300 text-sm font-bold text-stone-950">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-stone-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-4">
        {geometryOverlayStages.map((stage) => (
          <article key={stage.id} className="rounded-2xl border border-stone-700 bg-[#0f0d09] p-5">
            <h3 className="font-semibold text-white">{stage.title}</h3>
            <p className="mt-3 text-sm leading-6 text-stone-400">{stage.purpose}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
