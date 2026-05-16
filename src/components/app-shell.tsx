import { appCopy, growthStats, mlFoundationCards } from "@/lib/app-copy";

const plottedPoints = [
  "bottom-[2.25rem] left-[4rem] h-2 w-2",
  "bottom-[5rem] left-[7rem] h-3 w-3",
  "bottom-[8.5rem] left-[11rem] h-4 w-4",
  "bottom-[12rem] left-[16rem] h-5 w-5 shadow-lg shadow-amber-300/30",
  "bottom-[15rem] left-[21.5rem] h-4 w-4 bg-amber-100",
];

export function AppShell() {
  return (
    <main className="min-h-screen bg-[#090806] text-stone-100">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6">
        <header className="flex items-center justify-between gap-6 border-b border-amber-200/10 pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-300/70">
              {appCopy.eyebrow}
            </p>
            <h1 className="mt-2 text-xl font-semibold tracking-tight text-white">
              {appCopy.name}
            </h1>
          </div>

          <div className="rounded-full border border-amber-200/20 px-4 py-2 text-sm text-amber-100/80">
            {appCopy.version}
          </div>
        </header>

        <div className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr]">
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
                href="#growth-map"
                className="rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
              >
                {appCopy.primaryAction}
              </a>

              <a
                href="#ml-foundation"
                className="rounded-full border border-amber-200/20 px-6 py-3 text-sm font-semibold text-amber-100 transition hover:border-amber-200/40 hover:bg-amber-200/10"
              >
                {appCopy.secondaryAction}
              </a>
            </div>
          </section>

          <section
            id="growth-map"
            className="rounded-[2rem] border border-amber-200/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30"
          >
            <div className="rounded-[1.5rem] border border-amber-200/10 bg-black/30 p-5">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
                    Growth Coordinate Map
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    Dog as a point. Growth as a trajectory.
                  </h3>
                </div>
                <div
                  aria-hidden="true"
                  className="h-12 w-12 shrink-0 rounded-full border border-amber-300/30 bg-amber-300/10"
                />
              </div>

              <div className="relative h-80 overflow-hidden rounded-3xl border border-stone-700 bg-[#11100d] p-5">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-8 bottom-10 top-8 border-b border-l border-amber-200/25"
                />

                {["bottom-9", "bottom-20", "bottom-32", "bottom-44"].map(
                  (position) => (
                    <div
                      key={position}
                      aria-hidden="true"
                      className={`absolute left-10 right-10 h-px bg-stone-800 ${position}`}
                    />
                  ),
                )}

                <div
                  aria-hidden="true"
                  className="absolute bottom-10 left-12 right-10 h-24 rounded-full border border-amber-300/20 bg-amber-300/[0.03] blur-[1px]"
                />

                {plottedPoints.map((pointClassName, index) => (
                  <div
                    key={pointClassName}
                    aria-label={`Growth coordinate point ${index + 1}`}
                    className={`absolute rounded-full bg-amber-300 ${pointClassName}`}
                  />
                ))}

                <div className="absolute bottom-5 left-8 text-xs text-stone-500">
                  Age
                </div>
                <div className="absolute left-3 top-8 -rotate-90 text-xs text-stone-500">
                  Weight
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {growthStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                      {stat.label}
                    </p>
                    <p className="mt-2 font-semibold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section
          id="ml-foundation"
          className="mb-8 rounded-3xl border border-amber-200/10 bg-white/[0.03] p-6"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
            ML Foundation
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {mlFoundationCards.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-stone-700 bg-black/20 p-5"
              >
                <p className="font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-stone-400">
                  {item.description}
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
