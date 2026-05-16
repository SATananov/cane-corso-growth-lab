import type { GrowthPrediction } from "@/lib/growth-model";

type GrowthCoordinateMapProps = {
  prediction: GrowthPrediction;
};

function scale(value: number, min: number, max: number, outputMin: number, outputMax: number) {
  if (max === min) return outputMin;
  return outputMin + ((value - min) / (max - min)) * (outputMax - outputMin);
}

export function GrowthCoordinateMap({ prediction }: GrowthCoordinateMapProps) {
  const width = 620;
  const height = 360;
  const chart = {
    left: 58,
    right: 28,
    top: 30,
    bottom: 52,
  };

  const xMin = 2;
  const xMax = 24;
  const yMin = 0;
  const yMax = Math.max(70, prediction.estimatedAdultWeightKg + 10);

  const xForAge = (age: number) =>
    scale(age, xMin, xMax, chart.left, width - chart.right);
  const yForWeight = (weight: number) =>
    scale(weight, yMin, yMax, height - chart.bottom, chart.top);

  const curvePath = prediction.curve
    .map((point, index) => {
      const command = index === 0 ? "M" : "L";
      return `${command} ${xForAge(point.ageMonths)} ${yForWeight(point.expectedWeightKg)}`;
    })
    .join(" ");

  const dogX = xForAge(prediction.coordinate.xAgeMonths);
  const dogY = yForWeight(prediction.coordinate.yWeightKg);
  const expectedY = yForWeight(prediction.expectedWeightNowKg);

  const xTicks = [2, 6, 10, 14, 18, 22];
  const yTicks = [10, 25, 40, 55, 70];

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">
            Coordinate Growth Map
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            Dog as a point. Growth as a curve.
          </h3>
          <p className="mt-2 text-sm leading-6 text-stone-400">
            X-axis is age. Y-axis is weight. The highlighted point is the current
            dog profile compared to an educational reference curve.
          </p>
        </div>

        <div className="hidden rounded-full border border-amber-200/15 px-4 py-2 text-sm text-amber-100/80 sm:block">
          {prediction.growthProgressPercent}% growth progress
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-3xl border border-stone-700 bg-[#11100d] p-3">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Cane Corso growth coordinate map"
          className="h-auto w-full"
        >
          <defs>
            <linearGradient id="growth-zone" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="rgb(252 211 77 / 0.28)" />
              <stop offset="100%" stopColor="rgb(252 211 77 / 0.02)" />
            </linearGradient>
          </defs>

          <rect width={width} height={height} rx="26" fill="transparent" />

          {yTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={chart.left}
                x2={width - chart.right}
                y1={yForWeight(tick)}
                y2={yForWeight(tick)}
                stroke="rgb(68 64 60 / 0.55)"
                strokeWidth="1"
              />
              <text
                x={chart.left - 14}
                y={yForWeight(tick) + 4}
                textAnchor="end"
                fill="rgb(120 113 108)"
                fontSize="12"
              >
                {tick}
              </text>
            </g>
          ))}

          {xTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={xForAge(tick)}
                x2={xForAge(tick)}
                y1={chart.top}
                y2={height - chart.bottom}
                stroke="rgb(68 64 60 / 0.3)"
                strokeWidth="1"
              />
              <text
                x={xForAge(tick)}
                y={height - 22}
                textAnchor="middle"
                fill="rgb(120 113 108)"
                fontSize="12"
              >
                {tick}m
              </text>
            </g>
          ))}

          <line
            x1={chart.left}
            x2={width - chart.right}
            y1={height - chart.bottom}
            y2={height - chart.bottom}
            stroke="rgb(253 230 138 / 0.38)"
            strokeWidth="1.5"
          />
          <line
            x1={chart.left}
            x2={chart.left}
            y1={chart.top}
            y2={height - chart.bottom}
            stroke="rgb(253 230 138 / 0.38)"
            strokeWidth="1.5"
          />

          <path
            d={curvePath}
            fill="none"
            stroke="rgb(252 211 77)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d={`${curvePath} L ${xForAge(24)} ${yForWeight(Math.max(0, prediction.curve[prediction.curve.length - 1].expectedWeightKg - 8))} L ${xForAge(2)} ${yForWeight(Math.max(0, prediction.curve[0].expectedWeightKg - 8))} Z`}
            fill="url(#growth-zone)"
          />

          <line
            x1={dogX}
            x2={dogX}
            y1={dogY}
            y2={height - chart.bottom}
            stroke="rgb(245 245 244 / 0.22)"
            strokeDasharray="5 6"
          />
          <line
            x1={chart.left}
            x2={dogX}
            y1={dogY}
            y2={dogY}
            stroke="rgb(245 245 244 / 0.22)"
            strokeDasharray="5 6"
          />
          <line
            x1={dogX}
            x2={dogX}
            y1={expectedY}
            y2={dogY}
            stroke="rgb(251 191 36 / 0.55)"
            strokeWidth="2"
          />

          <circle cx={dogX} cy={dogY} r="12" fill="rgb(251 191 36)" />
          <circle
            cx={dogX}
            cy={dogY}
            r="21"
            fill="none"
            stroke="rgb(251 191 36 / 0.32)"
            strokeWidth="8"
          />

          <text x={chart.left} y={height - 8} fill="rgb(168 162 158)" fontSize="13">
            Age in months
          </text>
          <text
            x="18"
            y={chart.top + 10}
            fill="rgb(168 162 158)"
            fontSize="13"
            transform={`rotate(-90 18 ${chart.top + 10})`}
          >
            Weight kg
          </text>
        </svg>
      </div>
    </section>
  );
}
