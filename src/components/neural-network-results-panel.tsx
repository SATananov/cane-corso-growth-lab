"use client";

import { formatMetric, formatPercent } from "@/lib/ml/model-results";
import { neuralNetworkGrowthResults } from "@/lib/ml/neural-network-growth-results";
import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";

type PanelCopy = {
  eyebrow: string;
  title: string;
  description: string;
  badge: string;
  taskLabel: string;
  modelLabel: string;
  dataLabel: string;
  trainLabel: string;
  testLabel: string;
  metricsTitle: string;
  metrics: {
    accuracy: string;
    precision: string;
    recall: string;
    f1: string;
    iterations: string;
    loss: string;
  };
  featuresTitle: string;
  numericFeatures: string;
  categoricalFeatures: string;
  architectureTitle: string;
  hiddenLayers: string;
  confusionTitle: string;
  predictedNormal: string;
  predictedAttention: string;
  actualNormal: string;
  actualAttention: string;
  evidenceTitle: string;
  evidence: string[];
  safetyTitle: string;
  safety: string;
  futureWork: string;
};

const copy: Record<LanguageCode, PanelCopy> = {
  en: {
    eyebrow: "Neural network evidence",
    title: "Real tabular neural network for growth review signals.",
    description:
      "Step 36 adds a trained MLP neural-network prototype. It works with structured growth data and makes a safe educational distinction between normal growth and needs-attention samples.",
    badge: "Step 36 live in app",
    taskLabel: "Task",
    modelLabel: "Model",
    dataLabel: "Dataset split",
    trainLabel: "train rows",
    testLabel: "test rows",
    metricsTitle: "Current training metrics",
    metrics: {
      accuracy: "Точност",
      precision: "Прецизност за нужда от внимание",
      recall: "Обхват за нужда от внимание",
      f1: "F1 за нужда от внимание",
      iterations: "Training iterations",
      loss: "Final training loss",
    },
    featuresTitle: "Model inputs",
    numericFeatures: "Numeric features",
    categoricalFeatures: "Categorical features",
    architectureTitle: "Architecture",
    hiddenLayers: "Hidden layers",
    confusionTitle: "Матрица на объркванията",
    predictedNormal: "Predicted normal",
    predictedAttention: "Predicted needs attention",
    actualNormal: "Actual normal",
    actualAttention: "Actual needs attention",
    evidenceTitle: "Evidence files",
    evidence: [
      "Скрипт за обучение: scripts/ml/train_growth_neural_network.py",
      "Jupyter тетрадка: notebooks/12_tabular_neural_network_growth_prediction.ipynb",
      "Отчет: reports/neural-network-growth-prototype.md",
      "JSON с метрики: reports/neural-network-growth-prototype-results.json",
    ],
    safetyTitle: "Safety boundary",
    safety:
      "This neural network is a tabular growth-review prototype. It is not a veterinary diagnostic system, not an official Cane Corso certification system and not an image-based breed classifier.",
    futureWork:
      "Image neural networks remain future work until a licensed and carefully labeled Cane Corso photo dataset exists.",
  },
  bg: {
    eyebrow: "Доказателства от невронна мрежа",
    title: "Реална таблична невронна мрежа за сигнал за растеж.",
    description:
      "Стъпка 36 добавя обучен MLP прототип на невронна мрежа. Той работи със структурирани данни за растеж и дава безопасно образователно разделение между нормален растеж и проби, които имат нужда от внимание.",
    badge: "Стъпка 36 е видима в приложението",
    taskLabel: "Задача",
    modelLabel: "Модел",
    dataLabel: "Разделяне на данните",
    trainLabel: "обучаващи реда",
    testLabel: "тестови реда",
    metricsTitle: "Текущи метрики от обучението",
    metrics: {
      accuracy: "Точност",
      precision: "Прецизност за нужда от внимание",
      recall: "Обхват за нужда от внимание",
      f1: "F1 за нужда от внимание",
      iterations: "Итерации на обучението",
      loss: "Финална стойност на загубата",
    },
    featuresTitle: "Входове на модела",
    numericFeatures: "Числови характеристики",
    categoricalFeatures: "Категорийни характеристики",
    architectureTitle: "Архитектура",
    hiddenLayers: "Скрити слоеве",
    confusionTitle: "Матрица на объркванията",
    predictedNormal: "Предсказан нормален растеж",
    predictedAttention: "Предсказана нужда от внимание",
    actualNormal: "Реален нормален растеж",
    actualAttention: "Реална нужда от внимание",
    evidenceTitle: "Файлове с доказателства",
    evidence: [
      "Скрипт за обучение: scripts/ml/train_growth_neural_network.py",
      "Jupyter тетрадка: notebooks/12_tabular_neural_network_growth_prediction.ipynb",
      "Отчет: reports/neural-network-growth-prototype.md",
      "JSON с метрики: reports/neural-network-growth-prototype-results.json",
    ],
    safetyTitle: "Граница за безопасност",
    safety:
      "Тази невронна мрежа е табличен прототип за сигнал за растеж. Тя не е ветеринарна диагноза, не е официална Cane Corso сертификация и не е породен класификатор, базиран на снимки.",
    futureWork:
      "Снимковите невронни мрежи остават бъдеща работа, докато няма лицензиран и внимателно етикетиран набор от Cane Corso снимки.",
  },
  it: {
    eyebrow: "Evidenza rete neurale",
    title: "Rete neurale tabellare reale per segnali di crescita.",
    description:
      "Lo Step 36 aggiunge un prototipo MLP addestrato. Lavora con dati strutturati di crescita e distingue in modo educativo tra crescita normale e campioni che richiedono attenzione.",
    badge: "Step 36 visibile nell’app",
    taskLabel: "Compito",
    modelLabel: "Modello",
    dataLabel: "Split dataset",
    trainLabel: "righe train",
    testLabel: "righe test",
    metricsTitle: "Metriche attuali",
    metrics: {
      accuracy: "Точност",
      precision: "Прецизност за нужда от внимание",
      recall: "Обхват за нужда от внимание",
      f1: "F1 за нужда от внимание",
      iterations: "Iterazioni training",
      loss: "Loss finale",
    },
    featuresTitle: "Input del modello",
    numericFeatures: "Feature numeriche",
    categoricalFeatures: "Feature categoriche",
    architectureTitle: "Architettura",
    hiddenLayers: "Layer nascosti",
    confusionTitle: "Matrice di confusione",
    predictedNormal: "Predetto normale",
    predictedAttention: "Predetto attenzione",
    actualNormal: "Reale normale",
    actualAttention: "Reale attenzione",
    evidenceTitle: "File di evidenza",
    evidence: [
      "Скрипт за обучение: scripts/ml/train_growth_neural_network.py",
      "Jupyter тетрадка: notebooks/12_tabular_neural_network_growth_prediction.ipynb",
      "Отчет: reports/neural-network-growth-prototype.md",
      "JSON с метрики: reports/neural-network-growth-prototype-results.json",
    ],
    safetyTitle: "Limite di sicurezza",
    safety:
      "Questa rete neurale è un prototipo tabellare per revisione della crescita. Non è diagnosi veterinaria, non è certificazione ufficiale Cane Corso e non è un classificatore di razza basato su immagini.",
    futureWork:
      "Le reti neurali su immagini restano future work finché non esiste un dataset fotografico Cane Corso licenziato e ben etichettato.",
  },
};

export function NeuralNetworkResultsPanel() {
  const { language } = useLanguage();
  const t = copy[language];
  const result = neuralNetworkGrowthResults;
  const hiddenLayers = result.hiddenLayerSizes.join(" → ");

  const metricCards = [
    { label: t.metrics.accuracy, value: formatPercent(result.accuracy) },
    { label: t.metrics.precision, value: formatPercent(result.precisionNeedsAttention) },
    { label: t.metrics.recall, value: formatPercent(result.recallNeedsAttention) },
    { label: t.metrics.f1, value: formatMetric(result.f1NeedsAttention) },
    { label: t.metrics.iterations, value: String(result.trainingIterations) },
    { label: t.metrics.loss, value: formatMetric(result.finalTrainingLoss) },
  ];

  return (
    <section className="usg-readable-card rounded-[2rem] border border-amber-200/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr] xl:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">{t.eyebrow}</p>
            <span className="rounded-full border border-amber-200/20 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100">
              {t.badge}
            </span>
          </div>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-5xl">{t.title}</h2>
          <p className="mt-4 max-w-4xl text-base leading-7 text-stone-300">{t.description}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <InfoCard label={t.taskLabel} value={result.task} />
            <InfoCard label={t.modelLabel} value={result.modelType} />
            <InfoCard label={t.dataLabel} value={`${result.trainRows.toLocaleString()} ${t.trainLabel} / ${result.testRows.toLocaleString()} ${t.testLabel}`} />
          </div>
        </div>

        <article className="rounded-3xl border border-amber-200/10 bg-black/25 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300/80">{t.safetyTitle}</p>
          <p className="mt-3 text-sm leading-7 text-stone-300">{t.safety}</p>
          <p className="mt-3 text-sm leading-7 text-stone-400">{t.futureWork}</p>
        </article>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <article className="rounded-3xl border border-stone-700 bg-black/25 p-5">
          <p className="text-sm font-semibold text-amber-100">{t.metricsTitle}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {metricCards.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-stone-700 bg-white/[0.025] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-stone-500">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-stone-700 bg-black/25 p-5">
          <p className="text-sm font-semibold text-amber-100">{t.architectureTitle}</p>
          <dl className="mt-4 grid gap-4 text-sm">
            <div className="rounded-2xl border border-stone-700 bg-white/[0.025] p-4">
              <dt className="text-xs uppercase tracking-[0.16em] text-stone-500">{t.hiddenLayers}</dt>
              <dd className="mt-2 text-lg font-semibold text-white">{hiddenLayers}</dd>
            </div>
            <div className="rounded-2xl border border-stone-700 bg-white/[0.025] p-4">
              <dt className="text-xs uppercase tracking-[0.16em] text-stone-500">{t.numericFeatures}</dt>
              <dd className="mt-2 leading-6 text-stone-300">{result.numericFeatures.join(", ")}</dd>
            </div>
            <div className="rounded-2xl border border-stone-700 bg-white/[0.025] p-4">
              <dt className="text-xs uppercase tracking-[0.16em] text-stone-500">{t.categoricalFeatures}</dt>
              <dd className="mt-2 leading-6 text-stone-300">{result.categoricalFeatures.join(", ")}</dd>
            </div>
          </dl>
        </article>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-3xl border border-stone-700 bg-black/25 p-5">
          <p className="text-sm font-semibold text-amber-100">{t.confusionTitle}</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.16em] text-stone-500">
                <tr>
                  <th className="px-4 py-3"></th>
                  <th className="px-4 py-3">{t.predictedNormal}</th>
                  <th className="px-4 py-3">{t.predictedAttention}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800">
                <MatrixRow label={t.actualNormal} values={result.confusionMatrix[0]} />
                <MatrixRow label={t.actualAttention} values={result.confusionMatrix[1]} />
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-3xl border border-stone-700 bg-black/25 p-5">
          <p className="text-sm font-semibold text-amber-100">{t.evidenceTitle}</p>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-stone-300">
            {t.evidence.map((item) => (
              <li key={item} className="rounded-2xl border border-stone-700 bg-white/[0.025] p-4">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-2xl border border-stone-700 bg-black/25 p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-stone-500">{label}</p>
      <p className="mt-2 text-base font-semibold leading-6 text-white">{value}</p>
    </article>
  );
}

function MatrixRow({ label, values }: { label: string; values: [number, number] }) {
  return (
    <tr>
      <th className="px-4 py-3 font-semibold text-white">{label}</th>
      {values.map((value, index) => (
        <td key={`${label}-${index}`} className="px-4 py-3 text-stone-300">
          {value.toLocaleString()}
        </td>
      ))}
    </tr>
  );
}
