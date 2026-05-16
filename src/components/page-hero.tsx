type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
};

export function PageHero({ eyebrow, title, description, badge }: PageHeroProps) {
  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20 md:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300/70">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {title}
          </h2>
          <p className="mt-5 text-base leading-8 text-stone-400 md:text-lg">
            {description}
          </p>
        </div>

        {badge ? (
          <div className="w-fit rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100">
            {badge}
          </div>
        ) : null}
      </div>
    </section>
  );
}
