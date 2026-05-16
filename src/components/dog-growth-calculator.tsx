"use client";

import { useMemo, useState } from "react";
import { GrowthCoordinateMap } from "@/components/growth-coordinate-map";
import { FeatureVectorPanel } from "@/components/feature-vector-panel";
import { GrowthClusterPanel } from "@/components/growth-cluster-panel";
import { GrowthIntelligenceReport } from "@/components/growth-intelligence-report";
import { ModelBridgePanel } from "@/components/model-bridge-panel";
import { PcaGrowthMap } from "@/components/pca-growth-map";
import { PredictionSummary } from "@/components/prediction-summary";
import {
  calculateGrowthPrediction,
  type DogGrowthInput,
  type DogSex,
} from "@/lib/growth-model";

const initialInput: DogGrowthInput = {
  name: "MARK I",
  sex: "male",
  ageMonths: 6,
  weightKg: 34,
  heightCm: 58,
  bodyConditionScore: 5,
  adultReferenceWeightKg: 50,
};

const inputClass =
  "mt-2 w-full rounded-2xl border border-stone-700 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-stone-600 focus:border-amber-300/50 focus:ring-2 focus:ring-amber-300/10";

export function DogGrowthCalculator() {
  const [input, setInput] = useState<DogGrowthInput>(initialInput);

  const prediction = useMemo(() => calculateGrowthPrediction(input), [input]);

  function updateField<Key extends keyof DogGrowthInput>(
    key: Key,
    value: DogGrowthInput[Key],
  ) {
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
          Interactive App Experiment
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
          Growth calculator with coordinate feedback.
        </h2>
        <p className="mt-4 text-base leading-7 text-stone-400">
          Enter a Cane Corso profile and the app places the dog as a point in a
          growth coordinate system. The result is an educational ML-style signal,
          not a medical conclusion.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <form className="rounded-[2rem] border border-amber-200/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
          <div className="rounded-[1.5rem] border border-amber-200/10 bg-black/25 p-5">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">
                  Dog Profile Input
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  Build the current growth point
                </h3>
              </div>
              <div className="rounded-full border border-amber-200/15 px-3 py-1 text-xs text-amber-100/75">
                Live preview
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-stone-300 sm:col-span-2">
                Dog name
                <input
                  className={inputClass}
                  value={input.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Example: MARK I"
                />
              </label>

              <label className="block text-sm font-medium text-stone-300">
                Sex
                <select
                  className={inputClass}
                  value={input.sex}
                  onChange={(event) => updateField("sex", event.target.value as DogSex)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>

              <label className="block text-sm font-medium text-stone-300">
                Age months
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
                Current weight kg
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
                Height cm
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
                Body condition score
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
                  Educational scale from 1 to 9. Middle values are calmer signals.
                </span>
              </label>

              <label className="block text-sm font-medium text-stone-300">
                Adult reference kg
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
