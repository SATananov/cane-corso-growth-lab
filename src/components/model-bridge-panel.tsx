import type { GrowthPrediction } from "@/lib/growth-model";

export type ModelBridgePanelProps = {
  prediction: GrowthPrediction;
};

export function ModelBridgePanel({ prediction }: ModelBridgePanelProps) {
  const bridge = prediction.modelBridge;

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">
            App Model Bridge
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            Notebook evidence connected to the calculator.
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-400">
            The live app does not run a heavy Python model in the browser yet. It
            uses exported ML evidence, model metrics and a calibrated TypeScript
            bridge so the calculator remains fast, visible and safe.
          </p>
        </div>

        <div className="w-fit rounded-full border border-amber-200/15 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100">
          {bridge.version}
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <EvidenceCard
          title={bridge.regression.modelName}
          label="Regression evidence"
          metric={bridge.regression.evidenceMetric}
          detail={bridge.regression.appUsage}
        />
        <EvidenceCard
          title={bridge.classification.modelName}
          label="Classification evidence"
          metric={bridge.classification.evidenceMetric}
          detail={bridge.classification.appUsage}
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <BridgeList title="Feature vector" items={bridge.featureVector} />
        <BridgeList title="Live signals" items={bridge.appSignals} />
      </div>

      <div className="mt-5 rounded-2xl border border-amber-200/10 bg-amber-300/[0.05] p-4">
        <p className="text-sm font-semibold text-amber-100">Safety boundary</p>
        <p className="mt-2 text-sm leading-6 text-stone-400">{bridge.safetyNote}</p>
      </div>
    </section>
  );
}

type EvidenceCardProps = {
  title: string;
  label: string;
  metric: string;
  detail: string;
};

function EvidenceCard({ title, label, metric, detail }: EvidenceCardProps) {
  return (
    <article className="rounded-2xl border border-stone-700 bg-white/[0.03] p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{label}</p>
      <h4 className="mt-2 text-xl font-semibold text-white">{title}</h4>
      <p className="mt-2 font-mono text-sm text-amber-100/80">{metric}</p>
      <p className="mt-3 text-sm leading-6 text-stone-400">{detail}</p>
    </article>
  );
}

type BridgeListProps = {
  title: string;
  items: {
    label: string;
    value: string;
    detail: string;
  }[];
};

function BridgeList({ title, items }: BridgeListProps) {
  return (
    <div className="rounded-2xl border border-stone-700 bg-white/[0.03] p-5">
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div
            key={`${item.label}-${item.value}`}
            className="rounded-2xl border border-stone-800 bg-black/20 p-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="font-mono text-sm text-amber-100/80">{item.value}</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-stone-500">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
