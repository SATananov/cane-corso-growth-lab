"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { GrowthCoordinateMap } from "@/components/growth-coordinate-map";
import { DemoDogSelector } from "@/components/demo-dog-selector";
import { FeatureVectorPanel } from "@/components/feature-vector-panel";
import { GrowthClusterPanel } from "@/components/growth-cluster-panel";
import { GrowthFormulaPanel } from "@/components/growth-formula-panel";
import { GrowthIntelligenceReport } from "@/components/growth-intelligence-report";
import { ModelBridgePanel } from "@/components/model-bridge-panel";
import { PcaGrowthMap } from "@/components/pca-growth-map";
import { PredictionSummary } from "@/components/prediction-summary";
import {
  calculateGrowthPrediction,
  type DogGrowthInput,
  type DogSex,
} from "@/lib/growth-model";
import { demoDogProfiles, type DemoDogProfile } from "@/lib/demo-dogs";

const initialDemoDog = demoDogProfiles[0];

const initialInput: DogGrowthInput = { ...initialDemoDog.input };

const inputClass =
  "mt-2 w-full rounded-2xl border border-amber-200/15 bg-black/35 px-4 py-3 text-sm text-white outline-none transition placeholder:text-stone-600 focus:border-amber-300/55 focus:ring-2 focus:ring-amber-300/10";

export function DogGrowthCalculator() {
  const { dictionary } = useLanguage();
  const [input, setInput] = useState<DogGrowthInput>(initialInput);
  const [selectedDemoDogId, setSelectedDemoDogId] = useState(initialDemoDog.id);

  const prediction = useMemo(() => calculateGrowthPrediction(input), [input]);

  function loadDemoDog(demoDog: DemoDogProfile) {
    setInput({ ...demoDog.input });
    setSelectedDemoDogId(demoDog.id);
  }

  function updateField<Key extends keyof DogGrowthInput>(
    key: Key,
    value: DogGrowthInput[Key],
  ) {
    setSelectedDemoDogId("custom-input");
    setInput((current) => ({ ...current, [key]: value }));
  }

  function updateNumberField<Key extends keyof DogGrowthInput>(key: Key, value: string) {
    const numericValue = Number(value);
    updateField(
      key,
      Number.isFinite(numericValue)
        ? (numericValue as DogGrowthInput[Key])
        : (0 as DogGrowthInput[Key]),
    );
  }

  return (
    <section id="growth-calculator" className="py-10">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-300/70">
          {dictionary.calculator.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
          {dictionary.calculator.title}
        </h2>
        <p className="mt-4 text-base leading-7 text-stone-400">
          {dictionary.calculator.description}
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <form className="usg-lab-surface rounded-[2rem] p-5">
          <DemoDogSelector
            selectedDemoDogId={selectedDemoDogId}
            onSelectDemoDog={loadDemoDog}
          />

          <div className="relative z-10 rounded-[1.5rem] border border-amber-200/10 bg-black/25 p-5">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">
                  {dictionary.calculator.inputEyebrow}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  {dictionary.calculator.inputTitle}
                </h3>
              </div>
              <div className="usg-lab-chip rounded-full px-3 py-1 text-xs font-semibold">
                {dictionary.calculator.livePreview}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-stone-300 sm:col-span-2">
                {dictionary.calculator.labels.dogName}
                <input
                  className={inputClass}
                  value={input.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder={dictionary.calculator.placeholderName}
                />
              </label>

              <label className="block text-sm font-medium text-stone-300">
                {dictionary.calculator.labels.sex}
                <select
                  className={inputClass}
                  value={input.sex}
                  onChange={(event) => updateField("sex", event.target.value as DogSex)}
                >
                  <option value="male">{dictionary.calculator.labels.male}</option>
                  <option value="female">{dictionary.calculator.labels.female}</option>
                </select>
              </label>

              <label className="block text-sm font-medium text-stone-300">
                {dictionary.calculator.labels.ageMonths}
                <input
                  className={inputClass}
                  type="number"
                  min="1"
                  max="30"
                  value={input.ageMonths}
                  onChange={(event) => updateNumberField("ageMonths", event.target.value)}
                />
              </label>

              <label className="block text-sm font-medium text-stone-300">
                {dictionary.calculator.labels.currentWeightKg}
                <input
                  className={inputClass}
                  type="number"
                  min="1"
                  max="90"
                  value={input.weightKg}
                  onChange={(event) => updateNumberField("weightKg", event.target.value)}
                />
              </label>

              <label className="block text-sm font-medium text-stone-300">
                {dictionary.calculator.labels.heightCm}
                <input
                  className={inputClass}
                  type="number"
                  min="25"
                  max="90"
                  value={input.heightCm}
                  onChange={(event) => updateNumberField("heightCm", event.target.value)}
                />
              </label>

              <label className="block text-sm font-medium text-stone-300">
                {dictionary.calculator.labels.bodyConditionScore}
                <input
                  className={inputClass}
                  type="number"
                  min="1"
                  max="9"
                  value={input.bodyConditionScore}
                  onChange={(event) =>
                    updateNumberField("bodyConditionScore", event.target.value)
                  }
                />
                <span className="mt-2 block text-xs leading-5 text-stone-500">
                  {dictionary.calculator.bcsHint}
                </span>
              </label>

              <label className="block text-sm font-medium text-stone-300">
                {dictionary.calculator.labels.adultReferenceKg}
                <input
                  className={inputClass}
                  type="number"
                  min="30"
                  max="80"
                  value={input.adultReferenceWeightKg}
                  onChange={(event) =>
                    updateNumberField("adultReferenceWeightKg", event.target.value)
                  }
                />
              </label>
            </div>
          </div>
        </form>

        <div className="grid gap-5">
          <PredictionSummary prediction={prediction} />
          <GrowthFormulaPanel prediction={prediction} />
          <GrowthIntelligenceReport prediction={prediction} />
          <GrowthClusterPanel prediction={prediction} />
          <FeatureVectorPanel prediction={prediction} />
          <PcaGrowthMap prediction={prediction} />
          <ModelBridgePanel prediction={prediction} />
          <GrowthCoordinateMap prediction={prediction} />
        </div>
      </div>
    </section>
  );
}
