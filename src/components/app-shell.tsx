import { DogGrowthCalculator } from "@/components/dog-growth-calculator";
import { appCopy } from "@/lib/app-copy";

export function AppShell() {
  return (
    <main className="min-h-screen bg-[#090806] text-stone-100">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6">
        <header className="flex flex-col gap-4 border-b border-amber-200/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-300/70">
              {appCopy.eyebrow}
            </p>
            <h1 className="mt-2 text-xl font-semibold tracking-tight text-white">
              {appCopy.name}
            </h1>
          </div>

          <div className="w-fit rounded-full border border-amber-200/20 px-4 py-2 text-sm text-amber-100/80">
            v0.2 Interactive Lab
          </div>
        </header>

        <div className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr]">
          <section>
            <div className="mb-6 inline-flex rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm text-amber-100">
              Coordinate-based growth intelligence
            </div>

            <h2 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-white md:text-7xl">
              {appCopy.headline}
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
              {appCopy.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#growth-calculator"
                className="rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
              >
                Open Growth Calculator
              </a>

              <a
                href="#ml-foundation"
                className="rounded-full border border-amber-200/20 px-6 py-3 text-sm font-semibold text-amber-100 transition hover:border-amber-200/40 hover:bg-amber-200/10"
              >
                View ML Foundation
              </a>
            </div>
          </section>

          <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
            <div className="rounded-[1.5rem] border border-amber-200/10 bg-black/30 p-5">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
                    Growth Coordinate Concept
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    Every dog starts as a point.
                  </h3>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-full border border-amber-300/30 bg-amber-300/10 text-sm font-semibold text-amber-100">
                  ML
                </div>
              </div>

              <div className="relative h-80 overflow-hidden rounded-3xl border border-stone-700 bg-[#11100d] p-5">
                <div className="absolute inset-x-8 bottom-10 top-8 border-l border-b border-amber-200/25" />
                <div className="absolute bottom-9 left-10 right-10 h-px bg-stone-700" />
                <div className="absolute bottom-20 left-10 right-10 h-px bg-stone-800" />
                <div className="absolute bottom-32 left-10 right-10 h-px bg-stone-800" />
                <div className="absolute bottom-44 left-10 right-10 h-px bg-stone-800" />

                <svg
                  viewBox="0 0 420 260"
                  aria-hidden="true"
                  className="absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)]"
                >
                  <path
                    d="M 28 210 C 78 190, 98 155, 148 132 C 210 103, 245 80, 344 54"
                    fill="none"
                    stroke="rgb(252 211 77)"
                    strokeLinecap="round"
                    strokeWidth="5"
                  />
                  {[28, 92, 160, 240, 344].map((x, index) => {
                    const yValues = [210, 165, 128, 91, 54];
                    return (
                      <circle
                        key={x}
                        cx={x}
                        cy={yValues[index]}
                        r={index === 3 ? 11 : 7}
                        fill={index === 3 ? "rgb(251 191 36)" : "rgb(253 230 138)"}
                      />
                    );
                  })}
                </svg>

                <div className="absolute bottom-5 left-8 text-xs text-stone-500">
                  Age
                </div>
                <div className="absolute left-3 top-8 -rotate-90 text-xs text-stone-500">
                  Weight
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                    Point
                  </p>
                  <p className="mt-2 font-semibold text-white">Current dog</p>
                </div>

                <div className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                    Curve
                  </p>
                  <p className="mt-2 font-semibold text-white">Growth path</p>
                </div>

                <div className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                    Signal
                  </p>
                  <p className="mt-2 font-semibold text-white">Review zone</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <DogGrowthCalculator />

        <section
          id="ml-foundation"
          className="mb-8 rounded-3xl border border-amber-200/10 bg-white/[0.03] p-6"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
            ML Foundation
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {[
              "Linear Regression",
              "Polynomial Regression",
              "Classification Zones",
              "Future Clustering",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-stone-700 bg-black/20 p-5"
              >
                <p className="font-semibold text-white">{item}</p>
                <p className="mt-2 text-sm leading-6 text-stone-400">
                  Part of the experimental growth intelligence direction.
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t border-amber-200/10 pt-5 text-sm leading-6 text-stone-500">
          {appCopy.disclaimer}
        </footer>
      </section>
    </main>
  );
}
