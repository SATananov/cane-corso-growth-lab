import Image from "next/image";
import { researchFigures } from "@/lib/ml/research-gallery";

export function ResearchFigureGallery() {
  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
            Research Gallery
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Visual evidence for the ML idea.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">
            These figures turn the notebooks into something visible inside the app:
            points, lines, curves, boundaries and future profile groups.
          </p>
        </div>

        <div className="rounded-full border border-amber-200/15 bg-black/25 px-4 py-2 text-sm font-semibold text-amber-100/80">
          {researchFigures.length} visual concepts
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {researchFigures.map((figure, index) => (
          <article
            key={figure.title}
            className="overflow-hidden rounded-[1.75rem] border border-amber-200/10 bg-black/25"
          >
            <div className="relative aspect-[3/2] border-b border-amber-200/10 bg-[#11100d]">
              <Image
                src={figure.src}
                alt={figure.title}
                width={1440}
                height={960}
                priority={index === 0}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-stone-950">
                  {figure.category}
                </span>
                <span className="rounded-full border border-amber-200/15 px-3 py-1 text-xs font-semibold text-amber-100/80">
                  {figure.geometry}
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-semibold text-white">
                {figure.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-stone-400">
                {figure.description}
              </p>

              <div className="mt-5 rounded-2xl border border-stone-700 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                  App connection
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-300">
                  {figure.appConnection}
                </p>
              </div>

              <p className="mt-4 text-xs leading-5 text-stone-500">
                Source file: <span className="text-stone-400">{figure.sourcePath}</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
